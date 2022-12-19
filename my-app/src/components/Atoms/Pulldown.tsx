import { createEffect, createSignal, For, onMount ,Setter} from "solid-js";
import { css } from "solid-styled-components";

export type PulldownProps = {
    setValue? : Setter<string>,
    setIndex? : Setter<number>,
    values : Array<string>
}

function Pulldown(props :PulldownProps){
    let select :HTMLSelectElement;
    const values :string[] = props.values;

    const [nowValue,setNowValue] = createSignal<string>(values[0]);
    const [nowIndex,setNowIndex] = createSignal<number>(0);

    const pulldownStyle = css`
        appearance: none;
        --size : clamp(50px,3vw,150px);
        height: var(--size);
        background-color: white;
        color :black;
        border: #4150BF 2px solid;
        box-sizing: border-box;
        border-radius: 1rem;
        font-size: calc(var(--size)/3);
        padding-left: 1vw;
        padding-right: 1vw;
        text-align: center;
        &:hover{
            cursor: pointer;
        }
    `;

    createEffect(() => {
        if(props.setValue) props.setValue(nowValue());
        if(props.setIndex) props.setIndex(nowIndex);
    });

    onMount(() => {
        select.addEventListener("change",() => {
            setNowValue(select.value);
            setNowIndex(select.selectedIndex);
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