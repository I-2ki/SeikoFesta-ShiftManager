import { createEffect, createSignal, For, onMount, Show } from "solid-js";
import { css } from "solid-styled-components";
import TimeLabel from "../Molecules/TimeLabel";
import TimeLine from "../Molecules/TimeLine";
import Firebase from "../../Firebase";

import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { Student, StudentRole } from "../../type";
import { Auth, User } from "firebase/auth";

import { ToolBerState } from "./ToolBer";
import Loading from "../templates/Loading";

export type TimeTableProps = {
    toolBerState : ToolBerState,
}
function TimeTable(props :TimeTableProps){
	const [students,setStudents] = createSignal<Array<Student>>();

	const auth :Auth = Firebase.auth;
	const db = Firebase.db;

	/*const studentNumber :string = auth.currentUser!.email!.slice(0,5);
	const studentRef = doc(db,"users",studentNumber);
	const docSnap = await getDoc(studentRef);
	const studentGroups :Array<string> = docSnap.data()!.groups;
	*/

	const studentsRef = collection(db,"users");
	const groupQuery = query(studentsRef,where("groups","array-contains-any",["computer_club"]));
	
	let array :Array<Student> = [];
	onSnapshot(groupQuery,(querySnapshot) => {
		array.splice(0);
		querySnapshot.docs.forEach((doc) => {
			array.push(doc.data() as Student);
		});
		setStudents(array);
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
					<For each = {students()}>{(student) => {
						console.log(student);
						return <TimeLine student = {student} toolBerState = {props.toolBerState}/>
					}}</For>
				</tbody>
			</table>
		</div>
	);
}

export default TimeTable;