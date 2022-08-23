import { children } from "solid-js";
import { css } from "solid-styled-components";
import SVGImage from "./SVGImage";

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

export function ToolButton(prpos: any){
    return (
      <button class = {buttonStyle} onClick = {prpos.onClick}>
        <SVGImage src = {prpos.src}/>
      </button>
    );
}

export function RadioButtonContainer(props: any){
  const child = children(() => props.children);
  return (
    <>
      {child}
    </>
  );
}

export function RadioButton(props :any){
  const radioButtonStyle = css`
    display :none;
  `;
  const container = css`
    display :block;
  `;
  return (
    <label class = {`${buttonStyle}`}>
      <SVGImage src = {props.src}/>
      <input class = {`${buttonStyle} ${radioButtonStyle}`} type = "radio" />
    </label>
  );
}