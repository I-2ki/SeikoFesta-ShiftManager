import { css } from "solid-styled-components";
import { tableCSS } from "../css/view_profile";

type NameCard = {
    number: number | null,
    name: string,
}

function NameCard(props: NameCard) {
    const cellStyle = css`
        position: sticky;
        left: 0;
    `;

    const cardStyle = css`
        position: relative;
        border: 1px black solid;
        background-color: white;
        margin-right: 150px;
        padding-left: 1vw;
        padding-right: 1vw;
        min-width: max(1vw,150px);
        height: ${tableCSS.cellHeight};
    `;

    const textPosition = css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
    `;

    const textStyle = css`
        font-size: max(1vw,20px);
        text-align: center;
        user-select: none;
        white-space: nowrap;
    `;

    return (
        <td class={cellStyle}>
            <div class={cardStyle}>
                <div class={textPosition}>
                    <div class={textStyle}>{(props.number === null)?"":props.number}</div>
                    <div class={textStyle}>{props.name}</div>
                </div>
            </div>
        </td>
    );
}

export default NameCard;