import { createSignal } from "solid-js";
import Pulldown from "../../ui/Pulldown";

const [mode, setMode] = createSignal<number>(0);

namespace OperationMode {
    export type type = "view" | "edit";

    export const value = (): type => {
        return (mode() == 0) ? "view" : "edit";
    }

    export const Selector = () => {
        const operations = ["閲覧中", "編集中"];
        return (
            <Pulldown setIndex={setMode} values={operations}></Pulldown>
        );
    }
}

export default OperationMode;