import { css } from "solid-styled-components";

import ToolBer from "../concern/Tool/ToolBer";
import TimeTable from "../concern/ShiftTable/component/TimeTable/TimeTable";

import { signOut } from "../concern/Auth/auth";

function Editer(){
	const header = css`
		width: 100%;
		display : flex;
		align-items: center;
	`;

	const title = css`
		font-size : max(50px,3vw);
		font-weight: 300;
		flex-shrink: 0;
	`;

	const logoutButton = css`
		background-color: white;
		--width-padding:clamp(50px,3vw,150px);
		--height-padding:calc(var(--width-padding) / 3);
		padding-left: var(--width-padding);
		padding-right: var(--width-padding);
		padding-top: var(--height-padding);
		padding-bottom: var(--height-padding);
		margin-left: auto;
		font-size: var(--height-padding);
		border: #4150BF 2px solid;
		border-radius: 1rem;
		flex-shrink: 0;
		color : black;
		&:hover{
			cursor: pointer;
		}
	`;

	return(
		<>
			<header class = {header}>
				<h1 class = {title}>統一シフト</h1>
				<button class = {logoutButton} onClick = {() => signOut()}>ログアウト</button>
			</header>
			<ToolBer/>
			<TimeTable/>
		</>
	);
}

export default Editer;