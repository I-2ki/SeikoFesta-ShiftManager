import { Component, createSignal, Switch , Match, For, createEffect} from "solid-js";

import { onAuthStateChanged } from "firebase/auth";

import Loading from "../templates/Loading";
import Top from "../templates/Top";
import Editer from "../templates/Editer";

import Firebase from "../../Firebase";

type loginState = "loading" | "noLogin" | "logined";

const App: Component = () => {
	const [loginStatus , setLoginStatus] = createSignal<loginState>("loading");

	onAuthStateChanged(Firebase.auth,(user) => {
		if(user){
			setLoginStatus("logined");
		}else{
			setLoginStatus("noLogin");
		}
	});

	return(
		<Switch fallback = {<Loading/>}>
			<Match when = {loginStatus() == "noLogin"}>
				<Top/>
			</Match>
			<Match when = {loginStatus() == "logined"}>
				<Editer/>
			</Match>
		</Switch>
	);
};

export default App;