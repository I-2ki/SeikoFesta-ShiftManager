import { Component, createSignal, Switch , Match, For, createEffect} from "solid-js";

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth , signInWithRedirect , GoogleAuthProvider ,onAuthStateChanged ,signOut} from "firebase/auth";

import { css , keyframes } from "solid-styled-components";

import LoginButton from "./components/LoginButton";
import Loading from "./components/Loading";
import ToolBer from "./components/ToolBer";
import { TimeTable } from "./components/TimeTable";

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


const App: Component = () => {
  const [loginStatus , setLoginStatus] = createSignal("loading");

  onAuthStateChanged(auth,(user) => {
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