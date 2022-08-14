import { Component, createSignal, Switch , Match} from "solid-js";

import { initializeApp } from "firebase/app";
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
  measurementId: "G-XYH9KL989Q"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();

function Top(props:any){
  const titleText = css`
    font-size: 8vh;
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
  return(
    <>
      <h1>統一シフト</h1>
      <button onClick = {logout}>ログアウト</button>
      <ToolBer/>
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