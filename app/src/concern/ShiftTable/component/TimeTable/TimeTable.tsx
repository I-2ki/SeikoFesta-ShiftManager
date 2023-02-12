import { createSignal } from "solid-js";
import { css } from "solid-styled-components";
import TimeLabel from "../Atoms/TimeLabel";
import TimeLine, { TimeLineProps } from "../Molecules/TimeLine";
import Firebase from "../../Firebase";

import { doc, updateDoc } from "firebase/firestore";
import { Student } from "../../type";

import { toolBerState } from "./ToolBer";
import { onAuthStateChanged } from "firebase/auth";
import { GoogleApis } from "googleapis";

function isDuplicate(arr1 :unknown[], arr2:unknown[]) {
	return [...arr1, ...arr2].filter(item => arr1.includes(item) && arr2.includes(item)).length > 0;
}

const [students,setStudents] = createSignal<Student[]>([],{equals: false});

function getStudentNumberFromIndex(index :number) :number{
	return students()[index].number;
}

type cellAddress = {
	index : number,
	timeLineIndex : number,
}



export const [pressedCellAddress,setPressedCellAddress] = createSignal<cellAddress | null>(null);
export const [releasedCellAddress,setReleasedCellAddress] = createSignal<cellAddress | null>(null);
async function updateShift() {
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
}

function TimeTable(){
	addEventListener("mouseup",updateShift);

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