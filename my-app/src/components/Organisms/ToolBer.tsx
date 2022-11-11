import { createEffect, createSignal } from "solid-js";

import { css } from "solid-styled-components";
import ToolButton from "../Molecules/ToolButtons";
import { RadioButtonContainer , RadioButton } from "../Molecules/RadioButton";
import Pulldown from "../Atoms/Pulldown";

import add from "../../assets/add.svg";
import remove from "../../assets/remove.svg";
import print from "../../assets/print.svg";

import { InputMode } from "../../type";

function ToolBer(){
  const groups = ["コンピュータ部","ぶいえいす","総合技術研究所"];
  const [inputMode , setInputMode] = createSignal<number>();
  const [whatShift , setWhatShift] = createSignal<string>(groups[0]);

  createEffect(() => {
    console.log(inputMode());
  });

  const toolBerStyle = css`
    display: flex;
    gap: 1vw;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
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
      <ToolButton src = {print} onClick = {() => {window.print();}}/>
      <div class = {textStyle}>閲覧中：</div>
      <Pulldown setValue = {setWhatShift} values = {groups}></Pulldown>
      <div class = {textStyle}>のシフト</div>
    </div>
  );
}

export default ToolBer;