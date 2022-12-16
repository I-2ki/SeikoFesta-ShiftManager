import { createEffect, createMemo, createSignal, For, onMount, Show } from "solid-js";
import { css } from "solid-styled-components";
import TimeLabel from "../Molecules/TimeLabel";
import TimeLine from "../Molecules/TimeLine";
import Firebase from "../../Firebase";

import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { Student, StudentRole } from "../../type";
import { Auth, User } from "firebase/auth";

import { ToolBerState } from "./ToolBer";

export type TimeTableProps = {
    toolBerState : ToolBerState,
}
function TimeTable(props :TimeTableProps){
	const [existCellsUpdate,setExistCellsUpdate] = createSignal<Array<boolean>>([],{equals:false});

	const [isMouseDown,setIsMouseDown] = createSignal(false);

    addEventListener("mouseup",async () => {
        if(existCellsUpdate().length <= 0) return;
		const studentID = Firebase.auth.currentUser!.email!.toString().slice(0,5);
		const docRef = doc(Firebase.db,"users",studentID);
		const docSnap = await getDoc(docRef);
		const shifts = docSnap.data()!.shifts as Array<string>;
		for(let i = 0;i < existCellsUpdate().length;i++){
			if(existCellsUpdate()[i]){
				if(){
					shifts[i] = props.toolBerState.inputJob;
				}else{
					
				}
			}
		}
		await setDoc(docRef,{
			shifts : shifts
		},{
			merge : true
		});
		setExistCellsUpdate([]);
    });

	createEffect(() => {
		/*
		console.log(existCellsUpdate());
		console.log(isMouseDown());
		*/
	});
	const [students,setStudents] = createSignal<Array<Student>>(new Array<Student>,{equals: false});

	const auth :Auth = Firebase.auth;
	const db = Firebase.db;


	/*const studentNumber :string = auth.currentUser!.email!.slice(0,5);
	const studentRef = doc(db,"users",studentNumber);
	const docSnap = await getDoc(studentRef);
	const studentGroups :Array<string> = docSnap.data()!.groups;*/

	//表示更新
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
						return <TimeLine student = {student} toolBerState = {props.toolBerState} existCellsUpdate = {existCellsUpdate} setExistCellsUpdate = {setExistCellsUpdate}/>
					}}</For>
				</tbody>
			</table>
		</div>
	);
}
export default TimeTable;