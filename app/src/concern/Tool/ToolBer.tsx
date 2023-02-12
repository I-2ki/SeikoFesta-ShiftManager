import add from "../../assets/add.svg";
import remove from "../../assets/remove.svg";
import edit from "../../assets/edit.svg"
import print from "../../assets/print.svg";
import help from "../../assets/help.svg";

import { createEffect, createSignal} from "solid-js";
import { css } from "solid-styled-components";

import IconButton from "../../ui/IconButton/IconButton";
import ModalWindow from "../../ui/ModalWindow/ModalWindow";
import Pulldown from "../../ui/Pulldown/Pulldown";
import { RadioButtonContainer , RadioButton } from "../../ui/RadioButton/RadioButton";

type InputMode = "add" | "remove";
type OperationMode = "view" | "edit";

export type ToolBerState = {
	operationMode : OperationMode,
    inputMode :InputMode,
    groupIndex :number,
    day :number,
	inputJob : string,
}

export const [toolBerState,setToolBerState] = createSignal<ToolBerState>({
	inputMode : "add",
	operationMode : "view",
	groupIndex : 0,
	day : 0,
	inputJob : "001",
},{equals : false}); 

function ToolBer(){
	const [getInputMode, setInputMode] = createSignal<number>(0);

	const [isOpenEditWindow , setIsOpenEditWindow] = createSignal<boolean>(false);
	const openEditWindow = () => {
		setIsOpenEditWindow(true);
	}

	const operations = ["閲覧中","編集中"];
	const [getOperationMode,setOperationMode] = createSignal<number>(0);

	const groups = ["コンピュータ部"];
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
		setToolBerState({
			inputMode : (getInputMode() == 0)?"add":"remove",
			operationMode : (getOperationMode() == 0)?"view":"edit",
			groupIndex : getExplaingGroup(),
			day : getExplaingDay(),
			inputJob : "こちら葛飾区亀有公園まえ派出所",
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

				<IconButton src = {edit} onClick = {openEditWindow}/>
				<ModalWindow title = "仕事の編集" isOpen = {isOpenEditWindow} setIsOpen = {setIsOpenEditWindow}>
					<span class = {textStyle}>入力する仕事：</span><Pulldown values = {["講堂楽器運び"]}/>
					<div>
						
					</div>
				</ModalWindow>

				<IconButton src = {print} onClick = {printShift}/>

				<IconButton src = {help} onClick = {displayHelp}/>

				<div class = {emptyStyle}></div>

				<Pulldown setIndex = {setOperationMode} values = {operations}></Pulldown>

				<Pulldown setIndex = {setExplaingGroup} values = {groups}></Pulldown>

				<Pulldown setIndex = {setExplaingDay} values = {days}></Pulldown>
				
				<div class = {textStyle}>のシフト</div>
			</div>
		</>
	);
}

export default ToolBer;