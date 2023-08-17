import { createSignal } from "solid-js";
import { css } from "solid-styled-components";
import { tableCSS } from "../css/view_profile";
import { themeColor } from "../css/view_profile";

export type CellProps = {
    index : number,
    timeLineIndex : number,
    isTableFirst : boolean,
    isTableEnd : boolean,
    isShiftFirst : boolean,
    isShiftEnd : boolean,
    jobName :string,
}

export function Cell(props :CellProps){
    const [explainText,setExplainText] = createSignal<string>();
    if(props.isShiftFirst){
        setExplainText(props.jobName);
    }else{
        setExplainText("");
    }

    let cell:HTMLTableCellElement;

    const baseCellstyle = css`
        min-width: ${tableCSS.cellWidth};
        max-width: 0;
        height: ${tableCSS.cellHeight};
        white-space: nowrap;
        &:hover{
            cursor: pointer;
        }
    `;

    const emptyGroupStyle = css`
        background-color: #D1D1D1;
    `;

    const editingGroupsStyle = css`
        background-color: ${themeColor.mainColor};
    `;
    
    const firstStyle = css`
        border-left: ${(props.isTableFirst)?2:1}px black solid;
    `;

    const endStyle = css`
        border-right: ${(props.isTableEnd)?2:1}px black solid;  
    `;

    const textStyle = css`
        color: white;
        font-size : max(1vw,20px);
        margin-left: max(1vw,5px);
        user-select: none;
        overflow: hidden;
        text-overflow: ellipsis;
    `;

    const isEmptyCell = props.jobName === "";

    return (
        <td ref = {cell} class = {`${baseCellstyle} ${(props.isShiftFirst || isEmptyCell)?firstStyle:""} ${(props.isShiftEnd || isEmptyCell)?endStyle:""} ${(isEmptyCell)?emptyGroupStyle:editingGroupsStyle}`}>
            <p class = {textStyle}>{explainText()}</p><br/>
            <p class = {textStyle}>{explainText()}</p>
        </td>
    );
}