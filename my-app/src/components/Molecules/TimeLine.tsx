import { Accessor, For , Show } from "solid-js";
import { css } from "solid-styled-components";
import { TimeLineProps } from "../../type";
import { EmptyCell , FilledCell, FilledCellPosition } from "../Atoms/Cell";
import NameCard from "../Atoms/NameCard";

export type JobTimes = {
  jobName : string,
  times : number,
}

function whereIsCell(shifts :Array<string>,index :number) :FilledCellPosition{
  if (index == 0) return "left";
  if (index == shifts.length) return "right"; 
  const before = shifts[index] == shifts[index - 1];
  const after = shifts[index] == shifts[index + 1];
  if(before&&after) return "center";
  if(before) return "right";
  if(after) return "left";
  return "alone";
}

function TimeLine(props: TimeLineProps){
  return(
    <tr>
      <NameCard number = {props.user.studentNumber} name = {props.user.name}/>
      <For each = {props.user.shiftData}>{(jobName :string,index :Accessor<number>) => {
        if(jobName == ""){
          return <EmptyCell maxIndex = {props.user.shiftData.length - 1} index = {index()}/>
        }
        return <FilledCell jobName = {jobName} maxIndex = {props.user.shiftData.length - 1} index = {index()} position = {whereIsCell(props.user.shiftData,index())}></FilledCell>;
      }}</For>
    </tr>
  );
}

export default TimeLine;