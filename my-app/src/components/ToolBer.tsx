import { css } from "solid-styled-components";
import { ToolButton } from "./ToolButtons";
import { RadioButtonContainer , RadioButton } from "./RadioButton";
import { Pulldown } from "./Pulldown";

function ToolBer(){

  const toolBerStyle = css`
    display: flex;
    gap: 1vw;
    align-items: center;
  `;

  const textStyle = css`
    font-size:calc(clamp(50px,3vw,150px)/3);
  `;

  return (
    <div class = {toolBerStyle}>
      <RadioButtonContainer>
        <RadioButton src = "src/assets/add.svg" />
        <RadioButton src = "src/assets/remove.svg"/>
      </RadioButtonContainer>
      <ToolButton src = "src/assets/print.svg" onClick = {() => {window.print();}}/>
      <div class = {textStyle}>閲覧中：</div>
      <Pulldown></Pulldown>
      <div class = {textStyle}>のシフト</div>
    </div>
  );
}

export default ToolBer;