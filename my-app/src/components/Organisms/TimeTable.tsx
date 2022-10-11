import { css } from "solid-styled-components";
import TimeLabel from "../Atoms/TimeLabel";
import TimeLine from "../Molecules/TimeLine";

function TimeTable(){
  const container = css`
    margin : auto;
    width: max(200px,98vw);
    height: max(200px,89vh);
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

export default TimeTable;