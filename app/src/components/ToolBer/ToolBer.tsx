import print from "../../assets/print.svg";
import help from "../../assets/help.svg";

import { css } from "solid-styled-components";

import IconButton from "../../ui/IconButton";
import InputModeSelector from "./InputModeSelector";
import JobEditer from "./JobEditer";
import OperationModeSelector from "./OperationModeSelector";
import GroupSelector from "./GroupSelector";
import DaySelector from "./DaySelector";

function ToolBer() {
	const container = css`
		display: flex;
		gap: 1vw;
		align-items: center;
		padding-top: 20px;
		padding-bottom: 20px;
		@media print{
			display : none;
		}
	`;

	const emptyStyle = css`
		margin-left: auto;
	`;

	const textStyle = css`
		font-size:calc(clamp(50px,3vw,150px)/3);
		flex-shrink: 0;
	`;

	return (
		<div class={container}>
			<InputModeSelector />
			<JobEditer />
			<IconButton src={print} onClick={() => window.print()} />
			<IconButton src={help} onClick={() => console.log("ヘルプ画面を表示")} />
			<div class={emptyStyle}></div>
			<OperationModeSelector />
			<GroupSelector />
			<DaySelector />
			<div class={textStyle}>のシフト</div>
		</div>
	);
}

export default ToolBer;