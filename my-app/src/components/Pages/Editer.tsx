import { css } from "solid-styled-components";
import { signOut } from "firebase/auth";

import ToolBer from "../Organisms/ToolBer";
import TimeTable from "../Organisms/TimeTable";

import Firebase from "../../Firebase";
import { doc , getDoc} from "firebase/firestore";
import { Student, ToolBerState } from "../../type";
import { createSignal } from "solid-js";

const auth = Firebase.auth;
const db = Firebase.db;
//const studentNumber :string = auth.currentUser!.email!.slice(0,5);
const studentNumber = "62001";
const docRef = doc(db , "users" , studentNumber);

const docSnap = await getDoc(docRef);

function Editer(){

	const [getToolBerState,setToolBerState] = createSignal<ToolBerState>();
	const header = css`
		width: 100%;
		display : flex;
		align-items: center;
	`;

	const title = css`
		font-size : max(50px,3vw);
		font-weight: 300;
		flex-shrink: 0;
	`;

	const logoutButton = css`
		background-color: white;
		--width-padding:clamp(50px,3vw,150px);
		--height-padding:calc(var(--width-padding) / 3);
		padding-left: var(--width-padding);
		padding-right: var(--width-padding);
		padding-top: var(--height-padding);
		padding-bottom: var(--height-padding);
		margin-left: auto;
		font-size: var(--height-padding);
		border: #4150BF 2px solid;
		border-radius: 1rem;
		flex-shrink: 0;
		color : black;
		&:hover{
			cursor: pointer;
		}
	`;

	return(
		<>
			<header class = {header}>
				<h1 class = {title}>統一シフト</h1>
				<button class = {logoutButton} onClick = {() => signOut(Firebase.auth)}>ログアウト</button>
			</header>
			<ToolBer setValue = {setToolBerState}/>
			<TimeTable toolBerState = {getToolBerState()}/>
		</>
	);
}

export default Editer;