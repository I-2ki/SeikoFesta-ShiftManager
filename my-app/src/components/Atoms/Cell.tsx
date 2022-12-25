import { createSignal, onMount , For, Switch, Match, createEffect, Setter, Accessor } from "solid-js";
import { css } from "solid-styled-components";
import { tableCSS } from "../../css/view_profile";
import { themeColor } from "../../css/view_profile";
import { ToolBerState } from "../Organisms/ToolBer";

export type CellProps = {
    index : number,
    isTableFirst : boolean,
    isTableEnd : boolean,
    isShiftFirst : boolean,
    isShiftEnd : boolean,
    studentNumber : number,
    jobName :string,
    getExistCellsUpdate : Accessor<boolean[]>,
    setExistCellsUpdate : Setter<boolean[]>,
}

export function Cell(props :CellProps){
    const [isMouseDown,setIsMouseDown] = createSignal(false);
    addEventListener("mousedown",() => {
        setIsMouseDown(true);
    });
    addEventListener("mouseup",() => {
        setIsMouseDown(false);
    });

    const [explainText,setExplainText] = createSignal<string>();
    if(props.isShiftFirst){
        setExplainText(props.jobName);
    }else{
        setExplainText("");
    }

    let Cell:HTMLTableCellElement;
    function onClick(){
        const array = props.getExistCellsUpdate();
        array[props.index] = true;
        props.setExistCellsUpdate(array);
    }

    onMount(() => {
        Cell.addEventListener("mousedown",() => {
            onClick();
        });
        Cell.addEventListener("mouseenter",() => {
            if(isMouseDown()){
                onClick();
            }
        });
    });

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
    `;

    const isEmptyCell = props.jobName === "";

    return (
        <td ref = {Cell} class = {`${baseCellstyle} ${(props.isShiftFirst || isEmptyCell)?firstStyle:""} ${(props.isShiftEnd || isEmptyCell)?endStyle:""} ${(isEmptyCell)?emptyGroupStyle:editingGroupsStyle}`}>
            <p class = {textStyle}>{explainText()}</p>
        </td>
    );
}