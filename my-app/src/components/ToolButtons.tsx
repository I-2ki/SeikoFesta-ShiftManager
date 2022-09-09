import { children , createSignal , createEffect, For, Show} from "solid-js";
import { css } from "solid-styled-components";
import SVGImage from "./SVGImage";

export function ToolButton(props: any){
  const buttonStyle = css`
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
      <button class = {buttonStyle} onClick = {props.onClick}>
        <SVGImage src = {props.src}/>
      </button>
    );
}

