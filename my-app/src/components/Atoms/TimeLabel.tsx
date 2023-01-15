import { For } from "solid-js";
import { css } from "solid-styled-components";
import { tableCSS } from "../../css/view_profile";

function TimeLabel(){
    function generateSerialNumber(firstNumber :number, endNumber :number):Array<number> {
    	return [...Array(endNumber - firstNumber + 1).keys()].map(i => i + firstNumber);
    }
  
    const label = css`
    	min-width : ${tableCSS.cellWidth};
    	position : relative;
    	right: calc(${tableCSS.cellWidth}/2);
		border-bottom : 1px black solid;
    `;
  
    const timeStyle = css`
    	font-size: max(2vw,30px);
		font-weight: 300;
    `;
  
    const minuteStyle = css`
    	font-size: max(1.5vw,30px);
		font-weight: 100;
    `;
  
    const labelLine = css`
    	background-color: white;
      	vertical-align: baseline;
		position : sticky;
		top : 0;
    `;
  
    return (
      	<tr class = {labelLine}>
        	<th class = {label}></th>
        	<For each = {generateSerialNumber(9,17)}>{(time) => {
          	return (
            	<>
              		<th class = {`${label} ${timeStyle}`}>{time}:00</th>
              		<For each = {generateSerialNumber(1,5).map(i => i * 10)}>{(minute) => {
                		return <th class = {`${label} ${minuteStyle}`}>{minute}</th>;
              		}}</For>
            	</>
          	);
        	}}</For>
      	</tr>
    );
}

export default TimeLabel;