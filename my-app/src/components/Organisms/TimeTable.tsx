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
					<TimeLine user = {{name : "伊藤 秀平", studentNumber : 62019, shiftData : ["焼きそばを食べる","焼きそばを食べる","焼きそばを食べる","焼きそばを食べる","焼きそばを食べる","焼きそばを食べる","焼きそばを食べる","焼きそばを食べる"]}}/>
					<TimeLine user = {{name : "伊藤 秀平", studentNumber : 62019, shiftData : ["","コンピュータ部","コンピュータ部","HP局"]}}/>
					<TimeLine user = {{name : "伊藤 秀平", studentNumber : 62019, shiftData : ["",""]}}/>
					<TimeLine user = {{name : "伊藤 秀平", studentNumber : 62019, shiftData : ["",""]}}/>
				</tbody>
			</table>
		</div>
	);
}

export default TimeTable;