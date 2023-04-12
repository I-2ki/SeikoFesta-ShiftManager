import { Component, Switch , Match } from "solid-js";
import { loginState } from "./concern/auth";

import Loading from "./page/Loading";
import Top from "./page/Top";
import Editer from "./page/Editer";

const App: Component = () => {
	return(
		<Switch fallback = {<Loading/>}>
			<Match when = {loginState() == false}>
				<Top/>
			</Match>
			<Match when = {loginState() == true}>
				<Editer/>
			</Match>
		</Switch>
	);
};

export default App;