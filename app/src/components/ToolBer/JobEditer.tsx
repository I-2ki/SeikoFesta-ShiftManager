import add from "../../assets/add.svg";
import remove from "../../assets/remove.svg";
import edit from "../../assets/edit.svg"

import { createSignal } from "solid-js";
import IconButton from "../../ui/IconButton";
import ModalWindow from "../../ui/ModalWindow";
import Pulldown from "../../ui/Pulldown";
import { css } from "solid-styled-components";
import { inputJobWithPrompt } from "../../model/job";
import VerticalList from "../../ui/VerticalList";

//後で仕事内容のsignal追加する

export default function JobEditer() {
    const [isOpenEditWindow, setIsOpenEditWindow] = createSignal<boolean>(false);
    const openEditWindow = () => {
        setIsOpenEditWindow(true);
    }

    const container1 = css`
        display: flex;
        flex-direction: column;
    `;

    const container2 = css`
        display  : flex;
    `;

    const editJob = css`
        display  : flex;
        flex-direction: column;
        gap : 20px;
        p {
            font-size:20px;
        }
    `;

    const emptyStyle = css`
        margin-left: auto;
    `;

    const explain = css`
        display: flex;
        flex-direction: column;
        gap :20px;
        p {
            font-size: 20px;
        }
    `;

    const explainInput = css`
        width: 50vw;
        height: 49.5vh;
        resize: none;
    `;

    return (
        <>
            <IconButton src={edit} onClick={openEditWindow} />
            <ModalWindow title="仕事の編集" isOpen={isOpenEditWindow} setIsOpen={setIsOpenEditWindow}>
                <div class={container1}>
                    <div><span>入力する仕事：</span><Pulldown values={[""]} /></div>
                    <div class={container2}>
                        <div class={editJob}>
                            <p>仕事を編集</p>
                            <VerticalList items={["メケ", "メケ", "メケ", "メケ", "メケ", "メケ", "メケ", "メケ", "メケ", "メケ", "メケ", "メケ", "メケ", "メケ", "メケ", "メケ", "メケ", "メケ", "メケ", "メケ", "メケ", "メケ", "メケ"]} />
                            <div>
                                <IconButton src={add} onClick={inputJobWithPrompt} />
                                <IconButton src={remove} onClick={() => console.log("お前を・・・殺す！（デデッ！")} />
                            </div>
                        </div>
                        <span class={emptyStyle}></span>
                        <div class={explain}>
                            <p>「仕事内容」の説明</p>
                            <div>
                                <textarea class={explainInput} />
                            </div>
                        </div>
                    </div>
                </div>
            </ModalWindow>
        </>
    );
}