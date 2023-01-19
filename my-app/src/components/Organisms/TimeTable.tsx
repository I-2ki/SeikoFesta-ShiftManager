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
	const studentNumber :string = Firebase.auth.currentUser!.email!.slice(0,5);
	const studentRef = doc(Firebase.db,"users",studentNumber);
	const docSnap = await getDoc(studentRef);
	const student :Student = docSnap.data() as Student; 
	return student;
}

const [students,setStudents] = createSignal<Student[]>([],{equals: false});
async function fetchStudents(){
	const studentGroups = (await UsingStudent.get()).groups;

	const studentsRef = collection(Firebase.db,"users");
	const groupQuery = query(studentsRef,where("groups","array-contains-any",[studentGroups[toolBerState().groupIndex]]));

	const array :Student[] = [];
	onSnapshot(groupQuery,(querySnapshot) => {
		array.splice(0);
		querySnapshot.docs.forEach((doc) => {
			array.push(doc.data() as Student);
		});
		setStudents(array);
	});	
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
	fetchStudents();
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
	
		const studetNumberList :number[] = [];
		for(let yIndex = topLeftYIndex;yIndex <= bottomRightYIndex;yIndex++){
			const studentNumber :number = getStudentNumberFromIndex(yIndex);
			studetNumberList.push(studentNumber);
		}

		const batch = writeBatch(Firebase.db);

		const studentsRef = collection(Firebase.db,"users");
		const Query = query(studentsRef,where("number","in",studetNumberList));

		for(let yIndex = topLeftYIndex;yIndex <= bottomRightYIndex;yIndex++){
			const shifts = students()[yIndex].shifts;
			for(let xIndex = topLeftXIndex;xIndex <= bottomRightXIndex;xIndex++){
				const inputJob = (toolBerState().inputJob == "remove")?"":toolBerState().inputJob;
				if(toolBerState().day == 0){
					shifts.first[xIndex] = inputJob;
				}else{
					shifts.second[xIndex] = inputJob;
				}
			}
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
								displayShifts : (toolBerState().day)?student.shifts.first:student.shifts.second,
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