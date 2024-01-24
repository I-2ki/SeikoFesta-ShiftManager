import { css } from "solid-styled-components";
import TimeLabel from "./TimeLabel";
import TimeLine from "./TimeLine";
import NameCard from "./NameCard";

import { displayStudent } from "../firebase/db/displayStudent";
import { explaingDay } from "./ToolBer/DaySelector";

function TimeTable() {
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

	return (
		<div class={container}>
			<table class={table}>
				<thead>
					<TimeLabel />
				</thead>
				<tbody>
					{
						displayStudent().map((student, index) => {
							const shift = (explaingDay() == "first") ? student.firstShift : student.secondShift;
							return (
								<tr>
									<NameCard number={student.id} name={student.name} />
									<TimeLine timeLineIndex={index} shifts={shift} />
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