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
  const logout = () => signOut(auth);
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
    padding-left: 4vw;
    padding-right: 4vw;
    padding-top: 1vw;
    padding-bottom: 1vw;
    margin-left: auto;
    margin-right: 5%;
    font-size: 2vw;
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
        <button class = {logoutButton} onClick = {logout}>ログアウト</button>
      </header>
      <ToolBer/>
      <TimeTable/>
    </>
  );
}

function TimeTable(){
  const container = css`
    width: max(200px,90vw);
    height: max(200px,90vh);
    overflow: scroll;
    border: black 1px solid;
  `;
  const table = css`
    width: 100%;
    border-collapse:collapse;
    table-layout: fixed;
  `;
  return(
    <div class = {container}>
      <table class = {table}>
        <thead>
          <tr>
            <th>9:00</th>
          </tr>
        </thead>
        <tbody>
          <TimeLine/>
        </tbody>
      </table>
    </div>
  );
}

function TimeLine(){
  const container = css`
    margin-top: 20px;
    margin-bottom: 20px;
  `;
  return(
    <tr class = {container}>
      <For each = {["","","","","","","","社畜","","","","","","","","","","","",]}>{(job) => {
        return <Cell/>
      }}</For>
    </tr>
  );
}

function Cell(){
  const cell = css`
    background-color: #D1D1D1;
    width: 100px;
    height: 200px;
    border-left: black 1px solid;
    border-right: black 1px solid;
    &:hover{
      cursor: pointer;
    }
  `;

  return(
    <td class = {cell} onClick = {() => console.log("OK")}>
    </td>
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