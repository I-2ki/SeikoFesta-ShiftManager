import { createEffect, For , JSX, Show } from "solid-js";
import { css } from "solid-styled-components";
import { CellProps, EditingGroupCell, EmptyCell } from "../Atoms/Cell";
import NameCard from "../Atoms/NameCard";

import { Student } from "../../type";
import { ToolBerState } from "../Organisms/ToolBer";

export type JobTimes = {
	jobName : string,
	times : number,
}

function convertConnectedNameToTimes(jobNames : Array<string>):Array<JobTimes>{
	if (jobNames.length == 0) return [];
	const converted :Array<JobTimes> = [];

	let connectingJobName :string = jobNames[0];
	let connectedCount :number = 0;
	for(let jobName of jobNames){
		if(jobName == connectingJobName){
			connectedCount++;
			continue;
		}
		converted.push({
			jobName : connectingJobName,
			times : connectedCount,
		});
		connectingJobName = jobName;
		connectedCount = 1;
	}
	converted.push({
		jobName : connectingJobName,
		times : connectedCount,
	});

	return converted;
}

type TimeLineProps = {
    student : Student,
	toolBerState : ToolBerState
}

function TimeLine(props: TimeLineProps){
	const shifts :Array<JobTimes> = convertConnectedNameToTimes(props.student.shifts);
	const maxIndex :number = props.student.shifts.length - 1;

	return(
		<tr>
			<NameCard number = {props.student.number} name = {props.student.name}/>{() => {
				let index = 0;
				return <For each = {shifts}>{(shift) => {
					if(shift.jobName == ""){
						return(
							<For each = {new Array(shift.times)}>{() =>{
								const cell = <EmptyCell index = {index} times = {1} maxIndex = {maxIndex} jobName = "" toolBerState = {props.toolBerState} studentNumber = {props.student.number}/>;
								index++;
								return cell;
							}}</For>
						);
					}else{
						const cell = <EditingGroupCell index = {index} maxIndex = {maxIndex} times = {shift.times} jobName = {shift.jobName} toolBerState = {props.toolBerState} studentNumber = {props.student.number}/>;
						index += shift.times;
						return cell;
					}
				}}</For>
			}}
		</tr>
  );
}

export default TimeLine;