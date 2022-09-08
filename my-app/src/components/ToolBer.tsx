import { css } from "solid-styled-components";
import { ToolButton , RadioButton , RadioButtonContainer} from "./ToolButton";

function ToolBer(){
  const toolBerStyle = css`
    display: flex;
    gap: 1vw;
  `;
  return (
    <div class = {toolBerStyle}>
      <RadioButtonContainer>
        <RadioButton src = "src/assets/add.svg" />
        <RadioButton src = "src/assets/remove.svg"/>
      </RadioButtonContainer>
      <ToolButton src = "src/assets/print.svg" onClick = {() => {window.print();}}/>
    </div>
  );
}

export default ToolBer;