import { createSignal , For } from 'solid-js';
import { css } from 'solid-styled-components';

export type VerticalListProps = {
    items: string[];
}

const listItemStyle = css`
    height: 20%;
    width: 50%;

    input[type="radio"] {
        display: none;
    }

    label {
        flex-grow: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    input[type="radio"]:checked + label {
        color: white;
        background-color: #4150BF;
    }
`;

const listContainerStyle = css`
    border: 1px solid #000;
    display: flex;
    flex-direction: column;
    max-height: 40%;
    overflow-y: auto;
`;

export default function VerticalList(props: VerticalListProps) {
    const { items } = props;
    const [selected, setSelected] = createSignal('');

    return (
        <div class={listContainerStyle}>
            <For each={items} children={item => (
                <div class={listItemStyle} onClick={() => { setSelected(item); }}>
                    <input type="radio" name="verticalList" checked={selected() === item} />
                    <label>{item}</label>
                </div>
            )} />
        </div>
    );
}