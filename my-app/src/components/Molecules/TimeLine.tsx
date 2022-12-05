import { Accessor, For , JSX, Show } from "solid-js";
import { css } from "solid-styled-components";
import { TimeLineProps } from "../../type";
import { EmptyCell , FilledCell } from "../Atoms/Cell";
import NameCard from "../Atoms/NameCard";

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

function TimeLine(props: TimeLineProps){
	const shifts :Array<JobTimes> = convertConnectedNameToTimes(props.user.shiftData);
	const maxIndex :number = props.user.shiftData.length - 1;

	return(
		<tr>
			<NameCard number = {props.user.studentNumber} name = {props.user.name}/>
			<For each = {shifts}>{(shift , index) => {
				return <EmptyCell index = {index()} maxIndex = {maxIndex}></EmptyCell>;
			}
			}</For>
		</tr>
  );
}

export default TimeLine;