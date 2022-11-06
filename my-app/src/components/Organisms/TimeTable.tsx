import { css } from "solid-styled-components";
import TimeLabel from "../Molecules/TimeLabel";
import TimeLine from "../Molecules/TimeLine";

import Firebase from "../../Firebase";
import { addDoc , collection} from "firebase/firestore";

function TimeTable(){
  const db = Firebase.db;
  addDoc();

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
          <TimeLine number = "114514" name = "邪神ちゃんですの" jobData = {["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""]}/>
        </tbody>
      </table>
    </div>
  );
}

export default TimeTable;