import { createSignal } from "solid-js";
import { css } from "solid-styled-components";
import TimeLabel from "../Atoms/TimeLabel";
import TimeLine, { TimeLineProps } from "../Molecules/TimeLine";
import Firebase from "../../Firebase";

import { collection, doc, Firestore, getDoc, onSnapshot, query, setDoc, updateDoc, where, writeBatch } from "firebase/firestore";
import { Student } from "../../type";

import { toolBerState } from "./ToolBer";

export class UsingStudent{
	private static student :Student;
	private constructor(){
	}
	static async get() :Promise<Student>{
		if(!UsingStudent.student){
			UsingStudent.student = await fetchStudent();
		}
		return UsingStudent.student;
	}
}

async function fetchStudent() :Promise<Student>{
	fetch("https://sheets.googleapis.com/v4/spreadsheets/1HYUUZHExbeG4qwOR_lTlGTZu5vtmWVnnXo4LDquNub8/values:batchGet?key=AIzaSyAdgIThHio85YhMTtLTJuJUbTnu1UzbVwM"
	+"&ranges=生徒リスト!A2:D802"
	+"&ranges=仕事リスト!A2:C3"
	+"&ranges=1日目!A2:AU802"
	+"&ranges=2日目!A2:AU802",{
		method : "GET",
		mode : "cors",
		headers : {
			"Content-Type":"application/json",
		}

	}).then((response) => {
		return response.json();
	}).then((data) => {
		for(const student of data.valueRanges[0].values){
			if(){

			}
		}

	});
}

async function fetchShifts(){

}

const [students,setStudents] = createSignal<Student[]>([],{equals: false});

/*
async function fetchStudents(){
	fetch("https://sheets.googleapis.com/v4/spreadsheets/1HYUUZHExbeG4qwOR_lTlGTZu5vtmWVnnXo4LDquNub8/values/生徒リスト?key=AIzaSyAdgIThHio85YhMTtLTJuJUbTnu1UzbVwM&range=A2:AX802&majorDimension=ROWS",{
		method : "GET",
		mode : "cors",
		headers : {
			"Content-Type":"application/json",
		}

	}).then((response) => {
		return response.json();
	}).then((data :string[]) => {
		const array :Student[] = []
		for(let studentString of data){
			const student :string[] = studentString.split(",");
			array.push({
				number : parseInt(student[0]),
				name : student[1],
				groups : student[2].split(","),
				editableGroups : student[3].split(","),
				shifts : student.slice(4,student.length),
			});
		}
		setStudents(array);
	});
}*/

console.log(await fetchStudent());
async function fetchJobs(){
	const studentGroups = (await UsingStudent.get()).groups;
}

function getStudentNumberFromIndex(index :number) :number{
	return students()[index].number;
}

type cellAddress = {
	index : number,
	timeLineIndex : number,
}

export const [pressedCellAddress,setPressedCellAddress] = createSignal<cellAddress | null>(null);
export const [releasedCellAddress,setReleasedCellAddress] = createSignal<cellAddress | null>(null);

function TimeTable(){
	addEventListener("mouseup",async () => {
		if((pressedCellAddress() == null) || (releasedCellAddress() == null)){
			setPressedCellAddress(null);
			setReleasedCellAddress(null);
			return;
		}

		const topLeftXIndex = Math.min(pressedCellAddress()!.index,releasedCellAddress()!.index);
		const topLeftYIndex = Math.min(pressedCellAddress()!.timeLineIndex,releasedCellAddress()!.timeLineIndex);

		const bottomRightXIndex = Math.max(pressedCellAddress()!.index,releasedCellAddress()!.index);
		const bottomRightYIndex = Math.max(pressedCellAddress()!.timeLineIndex,releasedCellAddress()!.timeLineIndex);

		for(let yIndex = topLeftYIndex;yIndex <= bottomRightYIndex;yIndex++){
			const shifts = students()[yIndex].shifts;
			const studentNumber = getStudentNumberFromIndex(yIndex);

			for(let xIndex = topLeftXIndex;xIndex <= bottomRightXIndex;xIndex++){
				const inputJob = (toolBerState().inputMode == "remove")?"":toolBerState().inputJob;
				if(toolBerState().day == 0){
					shifts.first[xIndex] = inputJob;
				}else{
					shifts.second[xIndex] = inputJob;
				}
			}
			const studentsRef = doc(Firebase.db,"users",studentNumber.toString());
			await updateDoc(studentsRef,{
				shifts:shifts,
			});
		}

		setPressedCellAddress(null);
		setReleasedCellAddress(null);
	});

	const container = css`
		margin : auto;
		width: max(200px,98vw);
		height: max(200px,89vh);
		margin-bottom: 2vh;
		overflow: scroll;
	`;

	const table = css`
		position: relative;
		left: 100px;
		min-width: 100%;
		table-layout: fixed;
		border-spacing: 0px 50px;
		-webkit-overflow-scrolling: touch;	
	`;

	return(
		<div class = {container}>
			<table class = {table}>
				<thead>
					<TimeLabel/>
				</thead>
				<tbody>
					{
						students().map((student,index) => {
							const timeLineProps :TimeLineProps = {
								timeLineIndex : index,
								studentName : student.name,
								studentNumber : student.number,
								displayShifts : (toolBerState().day == 0)?student.shifts.first:student.shifts.second,
							};
							return <TimeLine {...timeLineProps}/>
						})
					}
				</tbody>
			</table>
		</div>
	);
}
export default TimeTable;