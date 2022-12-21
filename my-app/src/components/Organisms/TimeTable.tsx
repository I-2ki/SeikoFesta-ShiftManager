import { createEffect, createMemo, createSignal, For, onMount, Show } from "solid-js";
import { css } from "solid-styled-components";
import TimeLabel from "../Atoms/TimeLabel";
import TimeLine from "../Molecules/TimeLine";
import Firebase from "../../Firebase";

import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { Student } from "../../type";

import { ToolBerState } from "./ToolBer";

export type TimeTableProps = {
    toolBerState : ToolBerState,
}
function TimeTable(props :TimeTableProps){
	const [students,setStudents] = createSignal<Array<Student>>(new Array<Student>,{equals: false});

	const [existCellsUpdate,setExistCellsUpdate] = createSignal<boolean[]>([]);
	const [inputingStudentNumber,setInputingStudentNumber] = createSignal<number>();

	async function getStudentGroups(){
		const studentNumber :string = Firebase.auth.currentUser!.email!.slice(0,5);
		const studentRef = doc(Firebase.db,"users",studentNumber);
		const docSnap = await getDoc(studentRef);
		const studentGroups :string[] = docSnap.data()!.groups;

		return studentGroups;
	}


	//表示更新
	const studentsRef = collection(Firebase.db,"users");
	const groupQuery = query(studentsRef,where("groups","array-contains-any",["computer_club"]));

	let array :Student[] = [];
	onSnapshot(groupQuery,(querySnapshot) => {
		array.splice(0);
		querySnapshot.docs.forEach((doc) => {
			array.push(doc.data() as Student);
		});
		setStudents(array);
	});

	//書き込み更新


    addEventListener("mouseup",async () => {
        if(existCellsUpdate().length <= 0) return;
		const studentID = inputingStudentNumber()?.toString();
		if(studentID == null) return;
		const docRef = doc(Firebase.db,"users",studentID);
		const docSnap = await getDoc(docRef);
		const shifts = docSnap.data()!.shifts as Array<string>;
		for(let i = 0;i < existCellsUpdate().length;i++){
			if(existCellsUpdate()[i]){
				if(props.toolBerState.inputMode == "add"){
					shifts[i] = props.toolBerState.inputJob;
				}else{
					shifts[i] = "";
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

	return(
		<div class = {css`
			margin : auto;
			width: max(200px,98vw);
			height: max(200px,89vh);
			margin-bottom: 2vh;
			overflow: scroll;
		`}>
			<table class = {css`
				position: relative;
				left: 100px;
				min-width: 100%;
				table-layout: fixed;
				border-spacing: 0px 50px;
				-webkit-overflow-scrolling: touch;	
			`}>
				<thead>
					<TimeLabel/>
				</thead>
				<tbody>
					<For each = {students()}>{(student,index) => {
						return <TimeLine student = {student} toolBerState = {props.toolBerState} setExistCellsUpdate = {setExistCellsUpdate} setInputingStudentNumber = {setInputingStudentNumber}/>
					}}</For>
				</tbody>
			</table>
		</div>
	);
}
export default TimeTable;