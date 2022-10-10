import { Component, createSignal, Switch , Match, For, createEffect} from "solid-js";

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth , signInWithRedirect , GoogleAuthProvider ,onAuthStateChanged ,signOut} from "firebase/auth";

import Loading from "./components/Pages/Loading";
import Top from "./components/Pages/Top";
import Editer from "./components/Pages/Editer";

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