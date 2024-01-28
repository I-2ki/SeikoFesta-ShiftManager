import { Show, createEffect } from "solid-js";
import { css } from "solid-styled-components";
import { tableCSS } from "../css/view_profile";
import { themeColor } from "../css/view_profile";
import NowUser from "../firebase/db/NowUser";
import AllJobs from "../firebase/db/AllJobs";

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



export function Cell(props: CellProps) {
    let cell :HTMLTableCellElement;
    createEffect(() => {
        cell.addEventListener("mouseup",()=> {

        });
    });

    const cellType = (): cellType => {
        const job = AllJobs.serachOf(props.jobID);
        if (job.id == "") return "empty";
        const hasRelationWithGroup = (): boolean => {
            return NowUser.get().readableGroups.includes(job.group) || NowUser.get().editableGroups.includes(job.group) || false;
        }
        if (hasRelationWithGroup()) return "users";
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
        if (cellType() == "empty") return emptyCellStyle;
        if (cellType() == "users") return usersCellStyle;
        return ownedCellStyle;
    }

    return (
        <td ref = {cell} class={`${baseCellstyle} ${actualFirstStyle} ${actualEndEdgeStyle} ${uniqueStyle()}`}>
            <Show when={props.isShiftFirst}>
                <p class={textStyle}>{AllJobs.serachOf(props.jobID).group}</p><br />
                <p class={textStyle}>{AllJobs.serachOf(props.jobID).name}</p>
            </Show>
        </td>
    );
}
