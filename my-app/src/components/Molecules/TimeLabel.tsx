import { For } from "solid-js";
import { css } from "solid-styled-components";

function TimeLabel(){
    function sequenceArray(firstNumber :number, endNumber :number):Array<number> {
      return [...Array(endNumber - firstNumber + 1).keys()].map(i => i + firstNumber);
    }
  
    const size = 100;
    const label = css`
      min-width : ${size}px;
      width: ${size};
      position : relative;
      left: ${size/2*-1}px;
    `;
  
    const timeStyle = css`
      font-size: 45px;
      font-weight: 100;
    `;
  
    const minuteStyle = css`
      font-size: 30px;
      font-weight: 300;
    `;
  
    const labelLine = css`
    background-color: white;
      vertical-align: baseline;
    `;
  
    return (
      <tr class = {labelLine}>
        <th></th>
        <For each = {sequenceArray(9,17)}>{(time) => {
          return (
            <>
              <th class = {`${label} ${timeStyle}`}>{time}:00</th>
              <For each = {sequenceArray(1,5).map(i => i * 10)}>{(minute) => {
                return <th class = {`${label} ${minuteStyle}`}>{minute}</th>;
              }}</For>
            </>
          );
        }}</For>
      </tr>
    );
}

export default TimeLabel;