import add from "../../assets/add.svg";
import remove from "../../assets/remove.svg";

import { createSignal } from "solid-js";
import { RadioButton, RadioButtonContainer } from "../../ui/RadioButton";

export const [inputMode, setInputMode] = createSignal<number>(0);

export default function InputModeSelector() {
    return (
        <RadioButtonContainer setValue={setInputMode}>
            <RadioButton src={add} />
            <RadioButton src={remove} />
        </RadioButtonContainer>
    );
}