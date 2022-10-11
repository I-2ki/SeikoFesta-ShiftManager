import { css } from "solid-styled-components";
import ToolButton from "../Molecules/ToolButtons";
import { RadioButtonContainer , RadioButton } from "../Molecules/RadioButton";
import Pulldown from "../Atoms/Pulldown";

import add from "../../assets/add.svg";
import remove from "../../assets/remove.svg";
import print from "../../assets/print.svg";

function ToolBer(){

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
      <RadioButtonContainer>
        <RadioButton src = {add} />
        <RadioButton src = {remove}/>
      </RadioButtonContainer>
      <ToolButton src = {print} onClick = {() => {window.print();}}/>
      <div class = {textStyle}>閲覧中：</div>
      <Pulldown></Pulldown>
      <div class = {textStyle}>のシフト</div>
    </div>
  );
}

export default ToolBer;