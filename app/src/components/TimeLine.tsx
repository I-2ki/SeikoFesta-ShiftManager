import { For } from "solid-js";
import { CellProps, Cell } from "./Cell";

export type TimeLineProps = {
	timeLineIndex : number,
	shifts : string[]
}

function TimeLine(props: TimeLineProps){
	return(
		<For each = {props.shifts}>{(shift,index) => {
			const isTableFirst :boolean = (index() == 0);
			const isTableEnd :boolean = (index() == props.shifts.length - 1);
			const isShiftFirst :boolean = (props.shifts[index() - 1] != shift);
			const isShiftEnd :boolean = (props.shifts[index() + 1] != shift);
			const jobName :string = props.shifts[index()];

			const cellProps :CellProps = {
				index : index(),
				timeLineIndex : props.timeLineIndex,
				isTableFirst : isTableFirst,
				isTableEnd : isTableEnd,
				isShiftFirst : isShiftFirst,
				isShiftEnd : isShiftEnd,
				jobName : jobName,
			}

			return <Cell {...cellProps}/>
		}}</For>
  );
}

export default TimeLine;