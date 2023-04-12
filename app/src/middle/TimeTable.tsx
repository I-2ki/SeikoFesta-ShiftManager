import { createSignal } from "solid-js";
import { css } from "solid-styled-components";
import TimeLabel from "./TimeLabel";
import TimeLine from "./TimeLine";

import { toolBerState } from "./ToolBer";
import { addJob, addUser, getUser } from "../concern/db";
import NameCard from "./NameCard";
import { child, get, getDatabase, onValue, ref } from "firebase/database";
import { getUserId } from "../concern/auth";

const [displayShifts,setDisplayShift] = createSignal<string[][]>([]);
//const [students,setStudents] = createSignal<Student[]>([],{equals: false});

type cellAddress = {
	index : number,
	timeLineIndex : number,
}


export const [pressedCellAddress,setPressedCellAddress] = createSignal<cellAddress | null>(null);
export const [releasedCellAddress,setReleasedCellAddress] = createSignal<cellAddress | null>(null);
/*
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
	}

	setPressedCellAddress(null);
	setReleasedCellAddress(null);
}
*/

function TimeTable(){
	getUser(getUserId()!).then(() => {
		console.log(user);
	});
    const dbRef = ref(getDatabase());
    get(child(dbRef,`${toolBerState().day}Shifts/${62019}/shift`)).then((snapshot) => {
        if (snapshot.exists()) {
            setDisplayShift(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
	//addEventListener("mouseup",updateShift);

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
						displayShifts().map((jobId,index) => {
							return (
								<tr>
									<NameCard number = {62019} name = {"伊藤 秀平"}/>
									<TimeLine timeLineIndex = {index} shifts = {displayShifts()[index]}/>
								</tr>
							);
						})
					}
				</tbody>
			</table>
		</div>
	);
}
export default TimeTable;