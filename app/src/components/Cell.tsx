import { css } from "solid-styled-components";
import { tableCSS } from "../css/view_profile";
import { themeColor } from "../css/view_profile";
import { jobs } from "../firebase/db/jobOperateMethods";
import { currentOperatingStudent } from "../firebase/db/currentOperatingStudent";

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
    const cellType = (): cellType => {
        const job = jobs().get(props.jobID);
        if (!job) return "empty";
        const hasRerationToGroup = () :boolean => {
            return currentOperatingStudent()?.readableGroups.includes(job.group) || currentOperatingStudent()?.editableGroups.includes(job.group) || false;
        }
        if (hasRerationToGroup()) return "users";
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
    const uniqueStyle = ():string => {
        if(cellType() == "empty") return emptyCellStyle;
        if(cellType() == "users") return usersCellStyle;
        return ownedCellStyle;
    }

    return (
        <td class={`${baseCellstyle} ${actualFirstStyle} ${actualEndEdgeStyle} ${uniqueStyle()}`}>
            <p class={textStyle}>{jobs().get(props.jobID)?.group}</p><br />
            <p class={textStyle}>{jobs().get(props.jobID)?.name}</p>
        </td>
    );
}
