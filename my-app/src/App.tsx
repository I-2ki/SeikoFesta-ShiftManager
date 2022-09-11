import { Component, createSignal, Switch , Match, For, createEffect} from "solid-js";

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth , signInWithRedirect , GoogleAuthProvider ,onAuthStateChanged ,signOut} from "firebase/auth";

import { css , keyframes } from "solid-styled-components";

import LoginButton from "./components/LoginButton";
import Loading from "./components/Loading";
import ToolBer from "./components/ToolBer";

const firebaseConfig = {
  apiKey: "AIzaSyBi7mIihd_MmBn-l63RnjYtjDlOjdLmeBQ",
  authDomain: "seiko-shift-tool.firebaseapp.com",
  projectId: "seiko-shift-tool",
  storageBucket: "seiko-shift-tool.appspot.com",
  messagingSenderId: "568500639529",
  appId: "1:568500639529:web:421467d993063107c14938",
  measurementId: "G-XYH9KL989Q",
  databaseURL:"https://seiko-shift-tool-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const database = getDatabase(app);

function Top(props:any){
  const titleText = css`
    font-size: 8vh;
    font-weight: 300;
  `;
  return (
    <div>
      <h1 class = {titleText}>
        聖光祭<br/>
        統一シフト<br/>
        ログイン
      </h1>
      <p>
        統一シフトの使用にはログインが必要です。<br/>
        ※聖光学院のメールアドレス限定
      </p>
      <LoginButton loginMethod = {() => signInWithRedirect(auth,provider)}/>
    </div>
  );
}

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
        <button class = {logoutButton} onClick = {() => signOut(auth)}>ログアウト</button>
      </header>
      <ToolBer/>
      <TimeTable/>
    </>
  );
}

function TimeTable(){
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
          <TimeLine jobData = {["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""]}/>
          <TimeLine jobData = {["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""]}/>
          <TimeLine jobData = {["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""]}/>
          <TimeLine jobData = {["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""]}/>
          <TimeLine jobData = {["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""]}/>
        </tbody>
      </table>
    </div>
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

function Cell(){
  const [state,setState] = createSignal();
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

const App: Component = () => {
  const [loginStatus , setLoginStatus] = createSignal("loading");

  onAuthStateChanged(auth,(user) => {
    console.log(user);
    if(user){
      setLoginStatus("logined");
    }else{
      setLoginStatus("nonLogined");
    }
  });

  return(
    <>
      <Switch fallback = {<Loading/>}>
        <Match when = {loginStatus() == "nonLogined"}>
          <Top/>
        </Match>
        <Match when = {loginStatus() == "logined"}>
          <Editer/>
        </Match>
      </Switch>
    </>
  );
};

export default App;