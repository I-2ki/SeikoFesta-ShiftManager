import { Component, createSignal, Switch , Match} from "solid-js";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , signInWithRedirect , GoogleAuthProvider ,onAuthStateChanged ,signOut} from "firebase/auth";

import styles from './css/App.module.css';

import googleIcon from "./assets/google.svg";
import { style } from "solid-js/web";

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

function NowLoading(){
  return (
    <div class = {styles.loadingContainer}>
      <div class = {styles.loadingAnimation}></div>
      <p class = {styles.loadingText}>NowLoading</p>
    </div>
  );
}

function WhenNoLogin(props:any) {
  return (
    <div>
      <h1 class = {styles.titleText}>
        聖光祭<br/>
        統一シフト<br/>
        ログイン
      </h1>
      <p>
        統一シフトの使用にはログインが必要です。<br/>
        ※聖光学院のメールアドレス限定
      </p>
      <LoginButton/>
    </div>
  );
}

function LoginButton(porps :any){
  const login = () => signInWithRedirect(auth,provider);
  return (
    <div>
      <button class = {styles.loginButton} onClick = {login}>
        <div class = {styles.loginButtonContainer}>
          <img src = {googleIcon} alt = "Googleのアイコン"/>
          <p>Googleでログイン</p>
        </div>
      </button>
    </div>
  );
}

function WhenLogin(){
  const logout = () => signOut(auth);
  return(
    <>
      <h1>統一シフト</h1>
      {/*<button onClick = {logout}>ログアウト</button>*/}
      <ToolBer/>
    </>
  );
}

function ToolBer(){
  return (
    <>
      <ToolButton image = {"./assets/print.svg"}/>
    </>
  );
}

function ToolButton(props:any){
  return (
    <div>
      <span class = {styles.toolButtonImage}></span>
    </div>
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
    <Switch fallback = {<NowLoading/>}>
      <Match when = {loginStatus() == "nonLogined"}>
        <WhenNoLogin/>
      </Match>
      <Match when = {loginStatus() == "logined"}>
        <WhenLogin/>
      </Match>
    </Switch>
    /*<NowLoading/>*/
  );
};

export default App;
