import { createSignal, onMount , For, Switch, Match } from "solid-js";
import { css } from "solid-styled-components";
import { tableCSS } from "../../css/view_profile";
import { themeColor } from "../../css/view_profile";

export type EmptyCellProps = {
    maxIndex :number,
    index : number,
}

export function EmptyCell(props :EmptyCellProps){
    const style = css`
        background-color: #D1D1D1;
        min-width: ${tableCSS.cellWidth};
        max-width: 0;
        height: ${tableCSS.cellHeight};
        border-right: black ${(props.index == props.maxIndex)?2:1}px solid;
        border-left: black ${(props.index == 0)?2:1}px solid;
        white-space: nowrap;
        &:hover{
            cursor: pointer;
        }
    `;
    let Cell:HTMLTableCellElement;

    onMount(() => {
        Cell.addEventListener("mouseover",()=> {
        });
    });

    return (
        <td ref = {Cell} class = {style}>
        </td>
    );
}

export type FilledCellProps = {
    index : number,
    times : number,
    maxIndex :number,
    jobName :string,
}

export function EditingGroupCell(props :FilledCellProps){
    let Cell :HTMLTableCellElement;
    const style = css`
        background-color: ${themeColor.mainColor};
        min-width: ${tableCSS.cellWidth};
        max-width: 0;
        height: ${tableCSS.cellHeight};
        white-space: nowrap;
        &:hover{
            cursor: pointer;
        }
    `;
    const firstStyle = css`
        border-left: ${(props.index == 0)?2:1}px black solid;
        border-right: ${(props.times == 1)?((props.index == props.maxIndex)?2:1):0}px black solid;
    `;
    const endStyle = css`
        border-right: ${(props.index == props.maxIndex - props.times + 1)?2:1}px black solid;  
    `;
    const textStyle = css`
        color: white;
        font-size : max(1vw,20px);
        margin-left: max(1vw,5px);
        user-select: none;
    `;

    return(
        <For each = {new Array(props.times)}>{(item,index) => {
            return (
                <Switch fallback = {<td ref = {Cell} class = {style}></td>}>
                    <Match when = {index() == 0}>
                        <td ref = {Cell} class = {`${style} ${firstStyle}`}>
                            <p class = {textStyle}>{props.jobName}</p>
                        </td>
                    </Match>
                    <Match when = {index() == props.times - 1}>
                        <td ref = {Cell} class = {`${style} ${endStyle}`}></td>
                    </Match>
                </Switch>
            );
        }}</For>
    );
}

export function OtherGroupCell(){

}