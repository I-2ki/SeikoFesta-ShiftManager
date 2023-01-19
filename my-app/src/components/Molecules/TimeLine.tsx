import { For } from "solid-js";
import { CellProps, Cell } from "../Atoms/Cell";
import NameCard from "../Atoms/NameCard";

export type TimeLineProps = {
	timeLineIndex : number,
    studentNumber : number,
	studentName : string,
	displayShifts : string[]
}

function TimeLine(props: TimeLineProps){
	const shifts = props.displayShifts;
	const number :number = props.studentNumber;
	const name :string = props.studentName;

	return(
		<tr>
			<NameCard number = {number} name = {name}/>
			<For each = {shifts}>{(shift,index) => {
				const isTableFirst :boolean = (index() == 0);
				const isTableEnd :boolean = (index() == shifts.length - 1);
				const isShiftFirst :boolean = (shifts[index() - 1] != shift);
				const isShiftEnd :boolean = (shifts[index() + 1] != shift);
				const jobName :string = shifts[index()];

				const cellProps :CellProps = {
					index : index(),
					timeLineIndex : props.timeLineIndex,
					isTableFirst : isTableFirst,
					isTableEnd : isTableEnd,
					isShiftFirst : isShiftFirst,
					isShiftEnd : isShiftEnd,
					jobName : jobName,
					studentNumber : number,
				}

				return <Cell {...cellProps}/>
			}}</For>
		</tr>
  );
}

export default TimeLine;