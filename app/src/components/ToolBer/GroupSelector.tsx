import { createEffect, createSignal } from "solid-js";
import Pulldown from "../../ui/Pulldown";
import { currentOperatingStudent } from "../../firebase/db/currentOperatingStudent";
import { operationMode } from "./OperationModeSelector";

const [groups,setGroups] = createSignal<string[]>([" "]);
const [explaingGroupIndex, setExplaingGroupIndex] = createSignal<number>(0);

export const explaingGroupName = () :string => {
    return groups()[explaingGroupIndex()];
}

export default function GroupSelector(){
    createEffect(() => {
        setExplaingGroupIndex(0);
        if(currentOperatingStudent() === undefined) return;
        setGroups((operationMode() == "view") ? currentOperatingStudent().readableGroups : currentOperatingStudent().editableGroups);
    });
    return (
        <Pulldown setIndex={setExplaingGroupIndex} values={groups()}></Pulldown>
    );
}