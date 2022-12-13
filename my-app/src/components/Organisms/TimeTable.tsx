import { css } from "solid-styled-components";
import TimeLabel from "../Molecules/TimeLabel";
import TimeLine from "../Molecules/TimeLine";
import Firebase from "../../Firebase";

import { doc, getDoc } from "firebase/firestore";
import { Student } from "../../type";
import { Auth, User } from "firebase/auth";

export type TimeTableProps = {
    toolBerState : ToolBerState,
}

function TimeTable(props :TimeTableProps){
	let student :Student;
	const auth :Auth = Firebase.auth;
	const db = Firebase.db;

	//ログイン時しかこのコンポーネントは使わないのでnullは無視する
	const studentNumber :string = auth.currentUser!.email!.slice(0,5);
	const docRef = doc(db , "users" , studentNumber);
	getDoc(docRef).then((response) => {
		console.log(response.data());
	});

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
					<TimeLine student = {{name : "伊藤 秀平", number : 62019, shifts : new Array(53).fill("")}}/>
				</tbody>
			</table>
		</div>
	);
}

export default TimeTable;