import { For } from "solid-js";
import { css } from "solid-styled-components";

function Cell(){
    const cell = css`
      background-color: #D1D1D1;
      min-width: 100px;
      width: 100px;
      max-width: 100px;
      height: 200px;
      border-left: black 0.5px solid;
      border-right: black 0.5px solid;
      &:hover{
        cursor: pointer;
      }
    `;
  
    return(
      <td class = {cell} onClick = {() => console.log("OK")}></td>
    );
}

function TimeLine(props: any){
    const container = css`
    `;
    return(
      <tr class = {container}>
        <For each = {props.jobData}>{(job) => {
          return <Cell />
        }}</For>
      </tr>
    );
}

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
    border-bottom: black 0.5px solid;
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

export function TimeTable(){

  const container = css`
    margin : auto;
    width: max(200px,90vw);
    height: max(200px,90vh);
    margin-bottom: 2vh;
    border: black 1px solid;
    overflow: scroll;
  `;

  const table = css`
    position: relative;
    left: 100px;
    min-width: 100%;
    table-layout: fixed;
    border-spacing: 0px 50px;
    overflow: scroll;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  `;

  const label = css`
    position : sticky;
    top : 0;
  `;
  
  return(
    <div class = {container}>
      <table class = {table}>
        <thead class = {label}>
          <TimeLabel/>
        </thead>
        <tbody>
          <TimeLine jobData = {["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""]}/>
        </tbody>
      </table>
    </div>
  );
}