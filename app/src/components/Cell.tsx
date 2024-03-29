import { Show, createEffect, createSignal } from "solid-js";
import { css } from "solid-styled-components";
import { tableCSS } from "../css/view_profile";
import { themeColor } from "../css/view_profile";
import AllJobs from "../firebase/db/AllJobs";
import OperatedGroup from "./ToolBer/OperatedGroup";
import DisplayUsers from "../firebase/db/DisplayUsers";

export type CellProps = {
    index: number,
    timeLineIndex: number,
    isTableFirst: boolean,
    isTableEnd: boolean,
    isShiftFirst: boolean,
    isShiftEnd: boolean,
    jobID: string,
}

type cellType = "empty" | "owned" | "users";

type indexPair = {
    vertical: number,
    horizontal: number,
}

const [first, setFirst] = createSignal<indexPair | null>(null);
const [pointer, setPointer] = createSignal<indexPair | null>(null);
const [end, setEnd] = createSignal<indexPair | null>(null);

addEventListener("mouseup", () => {
    setFirst(null);
    setPointer(null);
    setEnd(null);
})

export function Cell(props: CellProps) {
    const onMouseDown = () => {
        setFirst({
            vertical: props.timeLineIndex,
            horizontal: props.index,
        });
        setPointer({
            vertical: props.timeLineIndex,
            horizontal: props.index,
        });
    }

    const onMouseEnter = () => {
        setPointer({
            vertical: props.timeLineIndex,
            horizontal: props.index,
        });
    }

    const onMouseUp = () => {
        setEnd({
            vertical: props.timeLineIndex,
            horizontal: props.index,
        })

        const verticalMin = Math.min(first()!.vertical,end()!.vertical);
        const verticalMax = Math.max(first()!.vertical,end()!.vertical)
        const horizontalMin = Math.min(first()!.horizontal,end()!.horizontal);
        const horizontalMax = Math.max(first()!.horizontal,end()!.horizontal);
        for(let i = verticalMin;i < verticalMax;i++){
            for(let j = horizontalMin;j < horizontalMax;j++){
                
            }
        }
        //処理
        setFirst(null);
        setPointer(null);
        setEnd(null);
    }

    const willFilled = (): boolean => {
        //pointerとfirstに挟まれているかどうかを判定する
        if (first() == null) return false;
        if (pointer() == null) return false;
        if ((first()!.horizontal < props.index) && (pointer()!.horizontal < props.index)) return false;
        if ((props.index < first()!.horizontal) && (props.index < pointer()!.horizontal)) return false;
        if ((first()!.vertical < props.timeLineIndex) && (pointer()!.vertical < props.timeLineIndex)) return false;
        if ((props.timeLineIndex < first()!.vertical) && (props.timeLineIndex < pointer()!.vertical)) return false;
        return true;
    }

    const cellType = (): cellType => {
        const job = AllJobs.serachOf(props.jobID);
        if (job.id == "") return "empty";
        if (job.group == OperatedGroup.name()) return "users";
        return "owned";
    }

    const baseCellstyle = css`
        min-width: ${tableCSS.cellWidth};
        max-width: 0;
        height: ${tableCSS.cellHeight};
        white-space: nowrap;
        &:hover{
            cursor: pointer;
        }
    `;

    const textStyle = css`
        color: white;
        font-size : max(1vw,20px);
        margin-left: max(1vw,5px);
        user-select: none;
        overflow: hidden;
        text-overflow: ellipsis;
    `;

    const firstStyle = css`
        border-left: ${(props.isTableFirst) ? 2 : 1}px black solid;
    `;
    const endStyle = css`
        border-right: ${(props.isTableEnd) ? 2 : 1}px black solid;  
    `;
    const actualFirstStyle = (props.isShiftFirst || cellType() == "empty") ? firstStyle : "";
    const actualEndEdgeStyle = (props.isShiftEnd || cellType() == "empty") ? endStyle : "";

    const ownedCellStyle = css`
        background-color: black;
    `;
    const emptyCellStyle = css`
        background-color: #D1D1D1;
    `;
    const usersCellStyle = css`
        background-color: ${themeColor.mainColor};
    `;
    const uniqueStyle = (): string => {
        if (cellType() == "owned") return ownedCellStyle;
        if (cellType() == "users" || willFilled()) return usersCellStyle;
        return emptyCellStyle;
    }

    return (
        <td onmousedown={onMouseDown} onmouseup={onMouseUp} onmouseenter={onMouseEnter} class={`${baseCellstyle} ${actualFirstStyle} ${actualEndEdgeStyle} ${uniqueStyle()}`}>
            <Show when={props.isShiftFirst}>
                <p class={textStyle}>{AllJobs.serachOf(props.jobID).group}</p>
                <p class={textStyle}>{AllJobs.serachOf(props.jobID).name}</p>
            </Show>
        </td>
    );
}
