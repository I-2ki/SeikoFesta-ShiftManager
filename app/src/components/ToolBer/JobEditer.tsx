import add from "../../assets/add.svg";
import remove from "../../assets/remove.svg";
import edit from "../../assets/edit.svg"

import { createSignal } from "solid-js";
import { css } from "solid-styled-components";

import IconButton from "../../ui/IconButton";
import ModalWindow from "../../ui/ModalWindow";
import Pulldown from "../../ui/Pulldown";
import VerticalList from "../../ui/VerticalList";

import CurrentGroup from "./OperatedGroup";
import JobDBOperation from "../../firebase/db/JobDBOperation";
import AllJobs from "../../firebase/db/AllJobs";
import Job from "../../model/Job";

export default function JobEditer() {
    const [isOpenEditWindow, setIsOpenEditWindow] = createSignal<boolean>(false);
    const openEditWindow = () => {
        setIsOpenEditWindow(true);
    }

    const [selectingJobIndex, setSelectingJobIndex] = createSignal<number>(0);

    async function inputJobWithPrompt() {
        const name = window.prompt("追加したい仕事の名前を入れてください。");
        if (name === null) return;
        await JobDBOperation.add(name, CurrentGroup.name(), "");
    }

    function deleteJobSafety(deletedJob: Job.type) {
        alert(`仕事：${deletedJob.name}を削除します。\nよろしいですか？`);
        //仕事が消えたときにシフト上の仕事も全部消す処理
        JobDBOperation.remove(deletedJob.id);
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
                    <div><span>入力する仕事：</span><Pulldown values={AllJobs.operatingGroupJobNames()} /></div>
                    <div class={container2}>
                        <div class={editJob}>
                            <p>仕事を編集</p>
                            <VerticalList items={AllJobs.operatingGroupJobNames()} setValue={setSelectingJobIndex} />
                            <div>
                                <IconButton src={add} onClick={inputJobWithPrompt} />
                                <IconButton src={remove} onClick={() => {
                                    const jobs = AllJobs.serachBy(CurrentGroup.name())
                                    const deletedJob = jobs[selectingJobIndex()];
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