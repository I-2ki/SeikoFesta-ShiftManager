import { createSignal , children , createEffect, JSX} from "solid-js";
import { css } from "solid-styled-components";
import { RadioButtonContainerProps } from "../../type";
import SVGImage from "../Atoms/SVGImage";

export function RadioButtonContainer(props :RadioButtonContainerProps){
	const [selectedNumber, setSelectedNumber] = createSignal<number>(0);

	const firstButtonStyle = css`
    	border-top-left-radius: 25%;
    	border-bottom-left-radius: 25%;
    	div{
      		border-top-left-radius: 25%;
      		border-bottom-left-radius: 25%;
    	}
  	`;
  	const endButtonStyle = css`
    	border-top-right-radius: 25%;
    	border-bottom-right-radius: 25%;
    	div{
      		border-top-right-radius: 25%;
      		border-bottom-right-radius: 25%;
    	}
  	`;

  	const checked = css`
    	div {
      		background-color: #4150BF;
    	}
    	div > span{
      		background-color: white;
    	}
  	`;

  	const container = css`
    	display: flex;
    	align-items: center;
  	`;

  	const child :any = children(() => props.children);
  	child()[0].classList.add(firstButtonStyle);
  	child()[child().length - 1].classList.add(endButtonStyle);

  	child().forEach((radioButton :Element,index :number) => {
    	radioButton.addEventListener("click",() => {
     	 setSelectedNumber(index);
   		});
  	});

	createEffect(() => {
    	props.setValue(selectedNumber());
    	for(let i = 0;i < child().length;i++){
      		if(i == selectedNumber()){
        		child()[i].classList.add(checked);
      		}else{
        		child()[i].classList.remove(checked);
      		}
    	}
  	});

  	return (
    	<div class = { container }>{child}</div>
  	);
}
  
export function RadioButton(props :any){
  	const buttonStyle = css`
		div {
			--size : clamp(50px,3vw,150px);
			width: var(--size);
			height: var(--size);
			box-sizing: border-box;
			border: #4150BF 2px solid;
		}
		&:hover > div{
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