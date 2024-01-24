import edit from "../../assets/edit.svg"
import { createSignal } from "solid-js";
import IconButton from "../../ui/IconButton";
import ModalWindow from "../../ui/ModalWindow";
import Pulldown from "../../ui/Pulldown";

//後で仕事内容のsignal追加する

export default function JobEditer() {
    const [isOpenEditWindow, setIsOpenEditWindow] = createSignal<boolean>(false);
    const openEditWindow = () => {
        setIsOpenEditWindow(true);
    }

    return (
        <>
            <IconButton src={edit} onClick={openEditWindow} />
            <ModalWindow title="仕事の編集" isOpen={isOpenEditWindow} setIsOpen={setIsOpenEditWindow}>
                <span>入力する仕事：</span><Pulldown values={[""]} />
                <div>
                    
                </div>
            </ModalWindow>
        </>
    );
}