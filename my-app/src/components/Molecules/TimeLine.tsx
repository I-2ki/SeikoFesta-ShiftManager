import { For } from "solid-js";
import { css } from "solid-styled-components";
import { Job, TimeLineProps } from "../../type";
import Cell from "../Atoms/Cell";
import NameCard from "../Atoms/NameCard";

function TimeLine(props: TimeLineProps){
  return(
    <tr>
      <NameCard number = {props.user.studentNumber} name = {props.user.name}/>
      <For each = {props.user.shiftData}>{(job :Job) => {
        return <Cell/>
      }}</For>
    </tr>
  );
}

export default TimeLine;