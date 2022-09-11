import { createSignal , children , createEffect} from "solid-js";
import { css } from "solid-styled-components";
import SVGImage from "./SVGImage";

export function RadioButtonContainer(props: any){
    const [selectedNumber, setSelectedNumber] = createSignal(0);
  
    const firstButtonStyle = css`
      border-top-left-radius: 25%;
      border-bottom-left-radius: 25%;
      div{
        border-top-left-radius: 15%;
        border-bottom-left-radius: 15%;
      }
    `;
    const endButtonStyle = css`
      border-top-right-radius: 25%;
      border-bottom-right-radius: 25%;
      div{
        border-top-right-radius: 15%;
        border-bottom-right-radius: 15%;
      }
    `;
  
    const checked = css`
      div{
        background-color: #4150BF;
      }
      div > span{
        background-color: white;
      }
    `;
  
    const child :any = children(() => props.children);
    child()[0].classList.add(firstButtonStyle);
    child()[child().length - 1].classList.add(endButtonStyle);
  
    child().forEach((radioButton :any,index :number) => {
      radioButton.addEventListener("click",() => {
        setSelectedNumber(index);
      });
    });
  
    createEffect(() => {
      for(let i = 0;i < child().length;i++){
        if(i == selectedNumber()){
          console.log(child()[i]);
          child()[i].classList.add(checked);
        }else{
          console.log(child()[i]);
          child()[i].classList.remove(checked);
        }
      }
    });
  
    return (
      <span style="vertical-align: center;">
        {child}
      </span>
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
  
    return (
      <label class = {buttonStyle} data-value = {props.value}>
        <SVGImage src = {props.src}/>
      </label>
    );
  }