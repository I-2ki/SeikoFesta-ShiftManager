import { css } from "solid-styled-components";
import SVGImage from "./SVGImage";

function ToolButton(prpos: any){
    const button = css`
      --size : clamp(50px,3vw,150px);
      width: var(--size);
      height: var(--size);
      background-color: white;
      border: #4150BF 2px solid;
      box-sizing: border-box;
      border-radius: 25%;
      &:hover{
        background-color: #4150BF;
        cursor: pointer;
      }
      &:hover > div > span{
        background-color: white;
      }
    `;
    return (
      <button class = {button} onClick = {prpos.onClick}>
        <SVGImage src = {prpos.src}/>
      </button>
    );
}

export default ToolButton;