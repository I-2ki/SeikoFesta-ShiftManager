import { createSignal , children , createEffect, JSX, Accessor} from "solid-js";
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

	const resolved = children(() => props.children);
	const buttons :any = resolved();
	const firstButton = buttons[0];
	const endButton = buttons[buttons.length - 1];

  	firstButton.classList.add(firstButtonStyle);
  	endButton.classList.add(endButtonStyle);

  	buttons.forEach((radioButton :Element,index :number) => {
    	radioButton.addEventListener("click",() => {
     		setSelectedNumber(index);
   		});
  	});

	createEffect(() => {
    	props.setValue(selectedNumber());
    	for(let i = 0;i < buttons.length;i++){
      		if(i == selectedNumber()){
        		buttons[i].classList.add(checked);
      		}else{
        		buttons[i].classList.remove(checked);
      		}
    	}
  	});

  	return (
    	<div class = { container }>{resolved}</div>
  	);
}

type RadioButtonProps = {
	src :string
}

export function RadioButton(props :RadioButtonProps){
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
		<label class = {buttonStyle}>
			<SVGImage src = {props.src}/>
		</label>
	);
}