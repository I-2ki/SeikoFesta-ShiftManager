import add from "../../assets/add.svg";
import remove from "../../assets/remove.svg";

import { createSignal } from "solid-js";
import { RadioButton, RadioButtonContainer } from "../../ui/RadioButton";

const [inputMode, setInputMode] = createSignal<number>(0);

namespace InputMode {
    export type type = "add" | "remove";
    
    export const state = (): type => {
        return (inputMode() == 0) ? "add" : "remove";
    }
    
    export const Selector = () => {
        return (
            <RadioButtonContainer setValue={setInputMode}>
                <RadioButton src={add} />
                <RadioButton src={remove} />
            </RadioButtonContainer>
        );
    }

}
export default InputMode;