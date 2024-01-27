import print from "../../assets/print.svg";
import help from "../../assets/help.svg";

import { css } from "solid-styled-components";

import IconButton from "../../ui/IconButton";
import JobEditer from "./JobEditer";
import OperationMode from "./OperationMode";
import CurrentGroup from "./OperatedGroup";
import OperatedDay from "./OperatedDay";
import InputMode from "./InputMode";

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
			<InputMode.Selector />
			<JobEditer />
			<IconButton src={print} onClick={() => window.print()} />
			<IconButton src={help} onClick={() => console.log("ヘルプ画面を表示")} />
			<div class={emptyStyle}></div>
			<OperationMode.Selector/>
			<CurrentGroup.Selector/>
			<OperatedDay.Selector />
			<div class={textStyle}>のシフト</div>
		</div>
	);
}

export default ToolBer;