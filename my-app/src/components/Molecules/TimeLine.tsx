import { createEffect, createSignal, For } from "solid-js";
import { CellProps, Cell } from "../Atoms/Cell";
import NameCard from "../Atoms/NameCard";

import { Student } from "../../type";
import { ToolBerState } from "../Organisms/ToolBer";

type TimeLineProps = {
    student : Student,
	toolBerState : ToolBerState
}

function TimeLine(props: TimeLineProps){
	const [existCellsUpdate,setExistCellsUpdate] = createSignal<Array<boolean>>([],{equals:false});

	const shifts :Array<string> = props.student.shifts;
	const number :number = props.student.number;
	const name :string = props.student.name;
	const toolBerState :ToolBerState = props.toolBerState;

	createEffect(() => {
		console.log(existCellsUpdate());
	});


	return(
		<tr>
			<NameCard number = {number} name = {name}/>
			<For each = {shifts}>{(shift,index) => {
				const isTableFirst :boolean = (index() == 0);
				const isTableEnd :boolean = (index() == shifts.length - 1);
				const isShiftFirst :boolean = (shifts[index() - 1] != shift);
				const isShiftEnd :boolean = (shifts[index() + 1] != shift);
				const jobName :string = props.student.shifts[index()];

				const cellProps :CellProps = {
					index : index(),
					isTableFirst : isTableFirst,
					isTableEnd : isTableEnd,
					isShiftFirst : isShiftFirst,
					isShiftEnd : isShiftEnd,
					jobName : jobName,
					studentNumber : number,
					toolBerState : toolBerState,
					getExisitCellsUpdate : existCellsUpdate,
					setExisitCellsUpdate : setExistCellsUpdate,
				}

				return <Cell {...cellProps}/>
			}}</For>
		</tr>
  );
}

export default TimeLine;