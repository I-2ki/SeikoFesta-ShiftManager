import { css } from "solid-styled-components";
import TimeLabel from "../Molecules/TimeLabel";
import TimeLine from "../Molecules/TimeLine";
import Firebase from "../../Firebase";

import { doc, getDoc } from "firebase/firestore";
import { TimeTableProps } from "../../type";

const db = Firebase.db;
const docRef = doc(db , "cities" , "SF");
const docSnap = await getDoc(docRef);

//console.log(docSnap.data());

function TimeTable(props :TimeTableProps){
  	const container = css`
		margin : auto;
		width: max(200px,98vw);
		height: max(200px,89vh);
		margin-bottom: 2vh;
		border: black 1px solid;
		overflow: scroll;
  	`;

  	const table = css`
    	position: relative;
    	left: 100px;
		min-width: 100%;
		table-layout: fixed;
		border-spacing: 0px 50px;
		overflow: scroll;
		white-space: nowrap;
		-webkit-overflow-scrolling: touch;
  	`;

  	const label = css`
		position : sticky;
		top : 0;
  	`;

	return(
		<div class = {container}>
			<table class = {table}>
				<thead class = {label}>
					<TimeLabel/>
				</thead>
				<tbody>
					<TimeLine user = {{name : "伊藤 秀平", studentNumber : 62019, shiftData : ["社畜","社畜","社畜","社畜","豪遊","豪遊","","","","","豪遊","","","","ティーダ","ティーダ","ティーダ","ワッカ","ワッカ","","","","","","","","","","","","","","","","","","","",""]}}/>
					<TimeLine user = {{name : "伊藤 秀平", studentNumber : 62019, shiftData : ["","豪遊",""]}}/>
					<TimeLine user = {{name : "伊藤 秀平", studentNumber : 62019, shiftData : ["",""]}}/>
					<TimeLine user = {{name : "伊藤 秀平", studentNumber : 62019, shiftData : ["",""]}}/>
				</tbody>
			</table>
		</div>
	);
}

export default TimeTable;