import { For } from "solid-js";
import { css } from "solid-styled-components";
import { tableCSS } from "../css/view_profile";
import { labelTimes } from "../logic/time";

const label = css`
	min-width : ${tableCSS.cellWidth};
	position : relative;
	right: calc(${tableCSS.cellWidth}/2);
	border-bottom : 1px black solid;
	z-index: 1;
`;

function Minute(props: { minute: number }) {
	const style = css`
		font-size: max(1.5vw,30px);
		font-weight: 100;
	`;
	return <th class={`${label} ${style}`}>{props.minute}</th>
}

function Time(props: { time: number }) {
	const style = css`
		font-size: max(2vw,30px);
		font-weight: 300;
	`;
	return <th class={`${label} ${style}`}>{`${props.time}:00`}</th>
}

function TimeLineLabel() {
	const labelLine = css`
    	background-color: white;
      	vertical-align: baseline;
		position : sticky;
		top: 0;
		z-index: 1;
    `;

	return (
		<tr class={labelLine}>
			<th class={label}></th>

			<For each = {labelTimes()}>{(label,index) => {
				if(label.minute == 0){
					return <Time time = {label.time}/>
				}else{
					return <Minute minute = {label.minute}/>
				}
			}}</For>
		</tr>
	);
}

export default TimeLineLabel;