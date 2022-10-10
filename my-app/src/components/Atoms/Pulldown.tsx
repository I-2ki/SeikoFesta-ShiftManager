import { createSignal, For } from "solid-js";
import { css } from "solid-styled-components";

function Pulldown(){
    const [values,setValues] = createSignal(["コンピュータ部",""]);

    const pulldownStyle = css`
        appearance: none;
        --size : clamp(50px,3vw,150px);
        height: var(--size);
        background-color: white;
        border: #4150BF 2px solid;
        box-sizing: border-box;
        border-radius: 1rem;
        font-size: calc(var(--size)/3);
        padding-left: 1vw;
        padding-right: 1vw;
        &:hover{
            cursor: pointer;
        }
    `;

    return(
        <select class = {pulldownStyle}>
            <For each = {values()}>{(value :string) => {
                return <option>{value}</option>
            }}</For>
        </select>
    );
}

export default Pulldown;