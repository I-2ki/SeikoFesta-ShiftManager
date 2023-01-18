import { createEffect, createSignal, For } from "solid-js";
import { css } from "solid-styled-components";
import TimeLabel from "../Atoms/TimeLabel";
import TimeLine, { TimeLineProps } from "../Molecules/TimeLine";
import Firebase from "../../Firebase";

import { collection, doc, getDoc, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { Shifts, Student } from "../../type";

import { toolBerState } from "./ToolBer";

class UsingStudent{
	private static student :Student;
	private constructor(){
	}
	static async get() :Promise<Student>{
		if(!UsingStudent.student){
			UsingStudent.student = await fetchStudent();
		}
		return UsingStudent.student;
	}
}

async function fetchStudent() :Promise<Student>{
	const studentNumber :string = Firebase.auth.currentUser!.email!.slice(0,5);
	const studentRef = doc(Firebase.db,"users",studentNumber);
	const docSnap = await getDoc(studentRef);
	const student :Student = docSnap.data() as Student; 
	return student;
}

const [students,setStudents] = createSignal<Student[]>([],{equals: false});
async function fetchStudents(){
	const studentGroups = (await UsingStudent.get()).groups;

	const studentsRef = collection(Firebase.db,"users");
	const groupQuery = query(studentsRef,where("groups","array-contains-any",studentGroups));

	let array :Student[] = [];
	onSnapshot(groupQuery,(querySnapshot) => {
		array.splice(0);
		querySnapshot.docs.forEach((doc) => {
			array.push(doc.data() as Student);
		});
		setStudents(array);
	});
}

function TimeTable(){
	const [existCellsUpdate,setExistCellsUpdate] = createSignal<boolean[]>([]);
	const [inputedStudentNumber,setInputedStudentNumber] = createSignal<number>();

	function getDisplayShifts(shifts :Shifts) :string[]{
		if(toolBerState().day == 0){
			return shifts.first;
		}
		return shifts.second;
	}
	
	async function updateShifts(){
		if(existCellsUpdate().length <= 0) return;
		const studentID = inputedStudentNumber()?.toString();
		if(studentID == null) return;

		const docRef = doc(Firebase.db,"users",studentID);
		const docSnap = await getDoc(docRef);
		const shifts = docSnap.data()!.shifts as Shifts;
		for(let i = 0;i < existCellsUpdate().length;i++){
			if(existCellsUpdate()[i] === false){
				continue;
			}
			if(toolBerState().inputMode == "add"){
				getDisplayShifts(shifts)[i] = toolBerState().inputJob;
			}else{
				getDisplayShifts(shifts)[i] = "";
			}
		}
		await setDoc(docRef,{
			shifts : shifts
		},{
			merge : true
		});
		setExistCellsUpdate([]);
	}

	fetchStudents();
    addEventListener("mouseup",updateShifts);

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
					{
						students().map((student) => {
							const timeLineProps :TimeLineProps = {
								studentName : student.name,
								studentNumber : student.number,
								displayShifts : (toolBerState().day)?student.shifts.first:student.shifts.second,
								setExistCellsUpdate : setExistCellsUpdate,
								setInputingStudentNumber : setInputedStudentNumber,
							};
							return <TimeLine {...timeLineProps}/>
						})
					}
				</tbody>
			</table>
		</div>
	);
}
export default TimeTable;