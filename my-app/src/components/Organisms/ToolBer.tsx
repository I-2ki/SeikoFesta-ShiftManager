import { createEffect, createSignal, Setter } from "solid-js";

import { css } from "solid-styled-components";
import ToolButton from "../Molecules/ToolButtons";
import { RadioButtonContainer , RadioButton } from "../Molecules/RadioButton";
import Pulldown from "../Atoms/Pulldown";

import add from "../../assets/add.svg";
import remove from "../../assets/remove.svg";
import edit from "../../assets/edit.svg"
import print from "../../assets/print.svg";
import help from "../../assets/help.svg";
import { Portal } from "solid-js/web";
import ModalWindow from "../Atoms/ModalWindow";

export type ToolBerProps = {
    setValue : Setter<ToolBerState>
}

export type InputMode = "add" | "remove";

export type ToolBerState = {
    inputMode :InputMode,
    groupIndex :number,
    day :number,
	inputJob : string,
}

function ToolBer(props :ToolBerProps){
	const [getInputMode , setInputMode] = createSignal<number>(0);

	const [isOpenEditWindow , setIsOpenEditWindow] = createSignal<boolean>(false);
	const openEditWindow = () => {
		setIsOpenEditWindow(true);
	}

	const actions = ["閲覧中","編集中"];
	const [getAction,setAction] = createSignal<string>(actions[0]);

	const groups = ["コンピュータ部","ぶいえいす","総合技術研究所"];
	const [getExplaingGroup , setExplaingGroup] = createSignal<number>(0);

	const days = ["1日目","2日目"];
	const [getExplaingDay , setExplaingDay] = createSignal<number>(0);

	const printShift = () => {
		window.print();
	}

	const displayHelp = () => {
		console.log("ヘルプ画面が表示されたよ");
	}

	createEffect(() => {
		props.setValue({
			inputMode : (getInputMode() == 0)?"add":"remove",
			groupIndex : getExplaingGroup(),
			day : getExplaingDay(),
			inputJob : "001",
		});
	});

	const emptyStyle = css`
		margin-left: auto;
	`;

	const textStyle = css`
		font-size:calc(clamp(50px,3vw,150px)/3);
		flex-shrink: 0;
	`;

	return (
		<>
			<div class = {css`
				display: flex;
				gap: 1vw;
				align-items: center;
				padding-top: 20px;
				padding-bottom: 20px;
				@media print{
					display : none;
				}
			`}>
				<RadioButtonContainer setValue = {setInputMode}>
					<RadioButton src = {add}/>
					<RadioButton src = {remove}/>
				</RadioButtonContainer>

				<ToolButton src = {edit} onClick = {openEditWindow}/>
				<ModalWindow title = "仕事の編集" isOpen = {isOpenEditWindow} setIsOpen = {setIsOpenEditWindow}/>

				<ToolButton src = {print} onClick = {printShift}/>

				<ToolButton src = {help} onClick = {displayHelp}/>

				<div class = {emptyStyle}></div>

				<Pulldown setValue = {setAction} values = {actions}></Pulldown>

				<Pulldown setIndex = {setExplaingGroup} values = {groups}></Pulldown>

				<Pulldown setIndex = {setExplaingDay} values = {days}></Pulldown>
				
				<div class = {textStyle}>のシフト</div>
			</div>
		</>
	);
}

export default ToolBer;