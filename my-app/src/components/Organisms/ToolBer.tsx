import { createEffect, createSignal, onMount } from "solid-js";

import { css } from "solid-styled-components";
import ToolButton from "../Molecules/ToolButtons";
import { RadioButtonContainer , RadioButton } from "../Molecules/RadioButton";
import Pulldown from "../Atoms/Pulldown";

import add from "../../assets/add.svg";
import remove from "../../assets/remove.svg";
import edit from "../../assets/edit.svg"
import print from "../../assets/print.svg";

import { InputMode, ToolBerProps, ToolBerState } from "../../type";

function ToolBer(props :ToolBerProps){
  const [getInputMode , setInputMode] = createSignal<number>(0);

  const openEditWindow = () => {
    console.log("編集中なのだ");
  }

  const actions = ["閲覧中","編集中"];
  const [getAction,setAction] = createSignal<string>(actions[0]);

  const groups = ["コンピュータ部","ぶいえいす","総合技術研究所"];
  const [getExplaingGroup , setExplaingGroup] = createSignal<string>(groups[0]);

  const days = ["1日目","2日目"];
  const [getExplaingDay , setExplaingDay] = createSignal<string>(days[0]);

  const printShift = () => {
    window.print();
  }

  createEffect(() => {
    const toolBerState : ToolBerState = {
      inputMode : (getInputMode() == 0) ? "add" : "remove",
      group : getExplaingGroup(),
      day : getExplaingDay(),
    }
    props.setValue(toolBerState);
  });

  const toolBerStyle = css`
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
  `;

  return (
    <div class = {toolBerStyle}>
        <RadioButtonContainer setValue = {setInputMode}>
          <RadioButton src = {add}/>
          <RadioButton src = {remove}/>
        </RadioButtonContainer>
        <ToolButton src = {edit} onClick = {openEditWindow}/>
        <ToolButton src = {print} onClick = {printShift}/>
        <div class = {emptyStyle}></div>
        <Pulldown setValue = {setAction} values = {actions}></Pulldown>
        <Pulldown setValue = {setExplaingGroup} values = {groups}></Pulldown>
        <Pulldown setValue = {setExplaingDay} values = {days}></Pulldown>
        <div class = {textStyle}>のシフト</div>
    </div>
  );
}

export default ToolBer;