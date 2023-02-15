import { Component, createSignal, Switch , Match, For, createEffect} from "solid-js";
import { loginState } from "./concern/Auth/init";

import Loading from "./page/Loading";
import Top from "./page/Top/Top";
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