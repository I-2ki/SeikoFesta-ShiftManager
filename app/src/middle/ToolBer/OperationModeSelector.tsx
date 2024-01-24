import { createSignal } from "solid-js";
import Pulldown from "../../ui/Pulldown";
import { OperationMode } from "../../logic/type";

const [mode, setMode] = createSignal<number>(0);
export const operationMode = () :OperationMode => {
    return (mode() == 0)?"view":"edit";
}

export default function OperationModeSelector(){
    const operations = ["閲覧中", "編集中"];
    return(
        <Pulldown setIndex={setMode} values={operations}></Pulldown>
    );
}