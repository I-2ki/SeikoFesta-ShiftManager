import { createSignal, onMount } from "solid-js";
import { css } from "solid-styled-components";

export type EmptyCellProps = {
    maxIndex :number,
    index : number,

}

export function EmptyCell(props :EmptyCellProps){
    const style = css`
        background-color: #D1D1D1;
        min-width: 100px;
        height: 200px;
        border-right: black ${(props.index == props.maxIndex)?2:1}px solid;
        border-left: black ${(props.index == 0)?2:1}px solid;
        &:hover{
            cursor: pointer;
        }
    `;
    let Cell :HTMLTableCellElement;

    onMount(() => {
        Cell.addEventListener("mouseover",()=> {
        });
    });

    return <td ref = {Cell} class = {style}></td>;
}

export type FilledCellPosition = "left" | "center" | "right" | "alone";

export type FilledCell = {
    index : number,
    maxIndex : number,
    position : FilledCellPosition,
    jobName :string,
}

export function FilledCell(props :FilledCell){
    function right(){
        let scale = 1;
        if (props.index == props.maxIndex) scale = 2;
        return scale*((props.position == "right" || props.position == "alone")?1:0);
    }
    function left(){
        let scale = 1;
        if (props.index == 0) scale = 2;
        return scale*((props.position == "left" || props.position == "alone")?1:0);
    }
    const style = css`
        background-color: #4150BF;
        min-width: 100px;
        height: 200px;
        &:hover{
            cursor: pointer;
        }
        border-right: black ${right()}px solid;
        border-left: black ${left()}px solid;
    `;

    return <td class = {style}>{props.jobName}</td>
}