import { createSignal, For, Setter } from 'solid-js';
import { css } from 'solid-styled-components';

type VerticalListProps = {
    items: string[],
    setValue : Setter<number>,
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
    const [selected, setSelected] = createSignal<number>(0);

    return (
        <div class={listContainerStyle}>
            {
                props.items.map((item,index) => {
                    return (
                        <div class={listItemStyle} onClick={() => {
                            setSelected(index); 
                            props.setValue(index);
                        }}>
                            <input type="radio" checked={selected() === index} />
                            <label>{item}</label>
                        </div>
                    );
                })
            }
        </div>
    );
}