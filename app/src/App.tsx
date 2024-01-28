import { Component, Switch , Match } from "solid-js";
import Auth from "./firebase/auth";

import Loading from "./page/Loading";
import Top from "./page/Top";
import Editer from "./page/Editer";

const App: Component = () => {
	return(
		<Switch fallback = {<Loading/>}>
			<Match when = {Auth.isLogin() == false}>
				<Top/>
			</Match>
			<Match when = {Auth.isLogin() == true}>
				<Editer/>
			</Match>
		</Switch>
	);
};

export default App;