import { createSignal, For } from 'solid-js';
import { css } from 'solid-styled-components';

export type VerticalListProps = {
    items: string[];
}

const listContainerStyle = css`
    width: max(15vw,200px);
    height: 50vh;
    border: 1px solid #000;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const listItemStyle = css`
    display: flex;

    input[type="radio"] {
        display: none;
    }

    label {
        flex-grow: 1;
        font-size: max(1vw,20px);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    input[type="radio"]:checked + label {
        color: white;
        background-color: #4150BF;
    }
`;

export default function VerticalList(props: VerticalListProps) {
    const { items } = props;
    const [selected, setSelected] = createSignal<number>(0);

    return (
        <div class={listContainerStyle}>
            <For each={items} children={(item,index) => (
                <div class={listItemStyle} onClick={() => { setSelected(index()); }}>
                    <input type="radio" checked={selected() === index()} />
                    <label>{item}</label>
                </div>
            )} />
        </div>
    );
}