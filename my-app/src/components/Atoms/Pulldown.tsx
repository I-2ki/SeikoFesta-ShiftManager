import { createEffect, createSignal, For, onMount } from "solid-js";
import { css } from "solid-styled-components";
import { PulldownProps } from "../../type";

function Pulldown(props :PulldownProps){
    let select :HTMLSelectElement;
    const values :Array<string> = props.values;
    const [nowValue,setNowValue] = createSignal<string>(values[0]);

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

    createEffect(() => {
        props.setValue(nowValue());
    });

    onMount(() => {
        select.addEventListener("change",() => {
            setNowValue(select.value);
        });
    });

    return(
        <select ref = {select} class = {pulldownStyle}>
            <For each = {values}>{(value :string) => {
                return <option>{value}</option>
            }}</For>
        </select>
    );
}

export default Pulldown;