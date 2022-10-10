import { For } from "solid-js";
import { css } from "solid-styled-components";
import Cell from "../Atoms/Cell";

function TimeLine(props: any){
    const container = css`
    `;
    return(
      <tr class = {container}>
        <For each = {props.jobData}>{(job) => {
          return <Cell/>
        }}</For>
      </tr>
    );
}

export default TimeLine;