import { createEffect, For, onMount } from "solid-js";
import { css } from "solid-styled-components";
import TimeLabel from "../Molecules/TimeLabel";
import TimeLine from "../Molecules/TimeLine";
import Firebase from "../../Firebase";

import { doc, getDoc } from "firebase/firestore";
import { Student } from "../../type";
import { Auth, User } from "firebase/auth";

import { ToolBerState } from "./ToolBer";

export type TimeTableProps = {
    toolBerState : ToolBerState,
}

function TimeTable(props :TimeTableProps){
	const auth :Auth = Firebase.auth;
	const db = Firebase.db;

	//ログイン時しかこのコンポーネントは使わないのでnullは無視する
	async function getStudent() :Array<Student>{
		const studentNumber :string = auth.currentUser!.email!.slice(0,5);
		const studentRef = doc(db , "users" , studentNumber);
		const studentDocSnap = await getDoc(studentRef);
		const studentGroups = studentDocSnap.data()!.gruop;

		const groupRef = doc(db,"groups",studentGroups);
		const groupDocSnap = await getDoc(groupRef);

		return docSnap.data();
	}

  	const container = css`
		margin : auto;
		width: max(200px,98vw);
		height: max(200px,89vh);
		margin-bottom: 2vh;
		overflow: scroll;
  	`;

  	const table = css`
    	position: relative;
    	left: 100px;
		min-width: 100%;
		table-layout: fixed;
		border-spacing: 0px 50px;
		-webkit-overflow-scrolling: touch;
  	`;

	return(
		<div class = {container}>
			<table class = {table}>
				<thead>
					<TimeLabel/>
				</thead>
				<tbody>
					<For each = {getStudent()}>{(student) => {
						return <TimeLine student = {student} toolBerState = {props.toolBerState}/>
					}}</For>
				</tbody>
			</table>
		</div>
	);
}

export default TimeTable;