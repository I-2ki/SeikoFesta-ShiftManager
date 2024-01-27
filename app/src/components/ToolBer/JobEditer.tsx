import add from "../../assets/add.svg";
import remove from "../../assets/remove.svg";
import edit from "../../assets/edit.svg"

import { createEffect, createSignal } from "solid-js";
import IconButton from "../../ui/IconButton";
import ModalWindow from "../../ui/ModalWindow";
import Pulldown from "../../ui/Pulldown";
import { css } from "solid-styled-components";
import { deleteJobSafety, inputJobWithPrompt, operatingGroupJobNames, serachJobFromGroups} from "../../model/job";
import VerticalList from "../../ui/VerticalList";
import { operatingGroupName } from "./GroupSelector";

export default function JobEditer() {
    const [isOpenEditWindow, setIsOpenEditWindow] = createSignal<boolean>(false);
    const openEditWindow = () => {
        setIsOpenEditWindow(true);
    }

    const [selectingJobIndex,setSelectingJobIndex] = createSignal<number>(0);
    createEffect(() => {
        console.log(selectingJobIndex());
    });

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
                    <div><span>入力する仕事：</span><Pulldown values={operatingGroupJobNames()} /></div>
                    <div class={container2}>
                        <div class={editJob}>
                            <p>仕事を編集</p>
                            <VerticalList items={operatingGroupJobNames()} setValue={setSelectingJobIndex}/>
                            <div>
                                <IconButton src={add} onClick={inputJobWithPrompt} />
                                <IconButton src={remove} onClick={() => {
                                    const deletedJob = serachJobFromGroups(operatingGroupName())[selectingJobIndex()];
                                    deleteJobSafety(deletedJob);
                                }} />
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