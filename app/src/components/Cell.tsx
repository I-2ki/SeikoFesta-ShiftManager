import { createSignal, createEffect, children, Match, Switch } from "solid-js";
import { css } from "solid-styled-components";
import { tableCSS } from "../css/view_profile";
import { themeColor } from "../css/view_profile";

export type CellProps = {
    index: number,
    timeLineIndex: number,
    isTableFirst: boolean,
    isTableEnd: boolean,
    isShiftFirst: boolean,
    isShiftEnd: boolean,
    jobName: string,
}

type cellType = "empty" | "owned" | "users";

export function Cell(props: CellProps) {
    let cell: HTMLTableCellElement;

    createEffect(() => {
        cell.addEventListener("mousedown", () => {
            console.log(props.index);
        })
        cell.addEventListener("mouseup", () => {
            console.log(props.index);
        });
    });

    const [explainText, setExplainText] = createSignal<string>();
    if (props.isShiftFirst) {
        setExplainText(props.jobName);
    } else {
        setExplainText("");
    }

    const cellType = (): cellType => {
        if (props.jobName === "") return "empty";
        if (props.jobName === "自分の団体の名前") return "users";
        return "owned";
    }

    const firstStyle = css`
        border-left: ${(props.isTableFirst) ? 2 : 1}px black solid;
    `;
    const endStyle = css`
        border-right: ${(props.isTableEnd) ? 2 : 1}px black solid;  
    `;
    const firstEdgeStyle = (props.isShiftFirst || cellType() == "empty") ? firstStyle : "";
    const endEdgeStyle = (props.isShiftEnd || cellType() == "empty") ? endStyle : "";

    const childProps :ChildCellsProps = {
        firstEdgeStyle : firstEdgeStyle,
        endEdgeStyle : endEdgeStyle,
    }

    return (
        <Switch fallback={<EmptyCell {...childProps}/>}>
            <Match when={cellType() == "owned"}>
                <OwnedCell {...childProps}/>
            </Match>
            <Match when={cellType() == "users"}>
                <UsersCell {...childProps}/>
            </Match>
        </Switch>
    );
}

type ChildCellsProps = {
    firstEdgeStyle: string,
    endEdgeStyle: string,

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

function EmptyCell(props: ChildCellsProps) {
    const uniqueStyle = css`
        background-color: #D1D1D1;
    `;

    return <td class={`${baseCellstyle} ${props.firstEdgeStyle} ${props.endEdgeStyle} ${uniqueStyle}`} />;
}

function UsersCell(props: ChildCellsProps) {
    const uniqueStyle = css`
        background-color: ${themeColor.mainColor};
    `;

    return (
        <td class={`${baseCellstyle} ${props.firstEdgeStyle} ${props.endEdgeStyle} ${uniqueStyle}`}>
            <p class={textStyle}>部門名</p><br />
            <p class={textStyle}>仕事名</p>
        </td>
    );
}

function OwnedCell(props: ChildCellsProps) {
    const uniqueStyle = css`
        background-color: black;
    `;

    return (
        <td class={`${baseCellstyle} ${props.firstEdgeStyle} ${props.endEdgeStyle} ${uniqueStyle}`}>
            <p class={textStyle}>部門名</p><br />
            <p class={textStyle}>仕事名</p>
        </td>
    );
}