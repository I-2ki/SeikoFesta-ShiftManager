import { For } from "solid-js";
import { css } from "solid-styled-components";
import Cell from "../Atoms/Cell";
import NameCard from "../Atoms/NameCard";

function TimeLine(props: any){
  return(
    <tr>
      <NameCard number = {props.number} name = {props.name}/>
      <For each = {props.jobData}>{(job) => {
        return <Cell/>
      }}</For>
    </tr>
  );
}

export default TimeLine;