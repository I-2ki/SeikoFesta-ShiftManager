import { createSignal, onMount , For , Ref} from "solid-js";
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
    let Cell:HTMLTableCellElement;

    onMount(() => {
        Cell.addEventListener("mouseover",()=> {
        });
    });

    return <td ref = {Cell} class = {style}></td>;
}

export type FilledCell = {
    index : number,
    times : number,
    jobName :string,
}

export function FilledCell(props :FilledCell){
    const aloneStyle = css`
        background-color: #4150BF;
        min-width: 100px;
        height: 200px;
        &:hover{
            cursor: pointer;
        }
        border-left: black 1px solid;
        border-right: black 1px solid; 
    `;

    const rightStyle = css`
        background-color: #4150BF;
        min-width: 100px;
        height: 200px;
        &:hover{
            cursor: pointer;
        }
        border-right: black 1px solid; 
    `;

    const leftStyle = css`
        background-color: #4150BF;
        min-width: 100px;
        height: 200px;
        &:hover{
            cursor: pointer;
        }
        border-left: black 1px solid; 
    `;

    const middleStyle = css`
        background-color: #4150BF;
        min-width: 100px;
        height: 200px;
        &:hover{
            cursor: pointer;
        }
    `;

    return (
        <For each = {new Array(props.times)}>{(dammy,index) => {
            return <td class = {rightStyle} data-index = {props.index + index()}>{props.index + index()}</td> 
        }
        }</For>
    );
}