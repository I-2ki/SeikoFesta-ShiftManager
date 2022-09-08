import { children , createSignal , createEffect, For} from "solid-js";
import { css } from "solid-styled-components";
import SVGImage from "./SVGImage";

export function ToolButton(prpos: any){
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
      <button class = {buttonStyle} onClick = {prpos.onClick}>
        <SVGImage src = {prpos.src}/>
      </button>
    );
}

export function RadioButtonContainer(props: any){
  const [selectedNumber, setSelectedNumber] = createSignal(0);

  const firstButtonStyle = css`
    border-top-left-radius: 25%;
    border-bottom-left-radius: 25%;
  `;
  const endButtonStyle = css`
    border-top-right-radius: 25%;
    border-bottom-right-radius: 25%;
  `;

  const checked = css`
    display:none;
  `;

  const c :any = children(() => props.children);
  c()[0].classList.add(firstButtonStyle);
  c()[c().length - 1].classList.add(endButtonStyle);

  c().forEach((radioButton :any,index :number) => {
    radioButton.addEventListener("click",() => {
      setSelectedNumber(index);
    });
  });

  return (
    <div>
      {c}
    </div>
  );
}

export function RadioButton(props :any){
  const buttonStyle = css`
    display: inline-block;
    --size : clamp(50px,3vw,150px);
    width: var(--size);
    height: var(--size);
    background-color: white;
    border: #4150BF 2px solid;
    box-sizing: border-box;
    &:hover{
      background-color: #4150BF;
      cursor: pointer;
    }
    &:hover > div > span{
      background-color: white;
    }
  `;

  const radioButtonStyle = css`
    display :none;
  `;

  return (
    <label class = {buttonStyle} data-value = {props.value}>
      <SVGImage src = {props.src}/>
      <input class = {radioButtonStyle} type = "radio" />
    </label>
  );
}