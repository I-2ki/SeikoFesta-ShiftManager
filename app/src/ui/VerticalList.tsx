import { createSignal , For } from 'solid-js';
import { css } from 'solid-styled-components';

export type VerticalListProps = {
    items: string[];
    onClicked: (item: string) => void;
}

const listItemStyle = css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 70px;
    width: 150px;

    input[type="radio"] {
        display: none;
    }

    label {
        flex-grow: 1;
        height: 100%;
        padding-left: 20px;
    }

    input[type="radio"]:checked + label {
        color: white;
        background-color: #4150BF;
    }
`;

const listContainerStyle = css`
    border: 1px solid #000;
`;

export default function VerticalList(props: VerticalListProps) {
    const { items, onClicked } = props;
    const [selected, setSelected] = createSignal('');

    return (
        <div class={listContainerStyle}>
            <For each={items} children={item => (
                <div class={listItemStyle} onClick={() => { setSelected(item); onClicked(item); }}>
                    <input type="radio" name="verticalList" checked={selected() === item} />
                    <label>{item}</label>
                </div>
            )} />
        </div>
    );
}