import { Component, createSignal, Switch , Match, For, createEffect} from "solid-js";

import { initializeApp } from "firebase/app";
import { onAuthStateChanged } from "firebase/auth";

import Loading from "./components/Pages/Loading";
import Top from "./components/Pages/Top";
import Editer from "./components/Pages/Editer";

import Firebase from "./Firebase";

const App: Component = () => {

  const [loginStatus , setLoginStatus] = createSignal("loading");

  onAuthStateChanged(Firebase.auth,(user) => {
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