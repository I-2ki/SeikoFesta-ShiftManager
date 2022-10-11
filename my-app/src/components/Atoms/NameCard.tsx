import { css } from "solid-styled-components";

function NameCard(props :any){
    const cellStyle = css`
        position: sticky;
        left: 0;
    `;

    const cardStyle = css`
        position: relative;
        border: 1px black solid;
        background-color: white;
        margin-right: 150px;
        padding: 10px;
        width: 150px;
        height: 200px;
    `;

    const textPosition = css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
    `;

    const textStyle = css`
        font-size: 25px;
        text-align: center;
    `;

    return (
        <td class = {cellStyle}>
            <div class = {cardStyle}>
                <div class = {textPosition}>
                    <div class = {textStyle}>{props.number}</div>
                    <div class = {textStyle}>{props.name}</div>
                </div>
            </div>
        </td>
    );
}

export default NameCard;