import { css } from "solid-styled-components";
import { signOut } from "firebase/auth";

import ToolBer from "../Organisms/ToolBer";
import TimeTable from "../Organisms/TimeTable";

import Firebase from "../../Firebase";
import { ToolBerState } from "../../type";

function Editer(){
  const header = css`
    width: 100%;
    display : flex;
    align-items: center;
  `;

  const title = css`
    font-size : max(50px,3vw);
    font-weight: 300;
  `;

  const logoutButton = css`
    background-color: white;
    --width-padding:clamp(30px,4vw,300px);
    padding-left: var(--width-padding);
    padding-right: var(--width-padding);
    padding-top: 1vw;
    padding-bottom: 1vw;
    margin-left: auto;
    margin-right: 5%;
    font-size: clamp(10px,1vw,40px);
    border: #4150BF 2px solid;
    border-radius: 10px;
    &:hover{
      cursor: pointer;
    }
  `;

  return(
    <>
      <header class = {header}>
        <h1 class = {title}>統一シフト</h1>
        <button class = {logoutButton} onClick = {() => signOut(Firebase.auth)}>ログアウト</button>
      </header>
      <ToolBer/>
      <TimeTable/>
    </>
  );
}

export default Editer;