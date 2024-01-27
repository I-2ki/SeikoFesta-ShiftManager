import { createEffect, createSignal } from "solid-js";
import NowUser from "../../firebase/db/NowUser";
import Pulldown from "../../ui/Pulldown";
import OperationMode from "./OperationMode";

const [groups, setGroups] = createSignal<string[]>([""]);
const [explaingGroupIndex, setExplaingGroupIndex] = createSignal<number>(0);

namespace OperatedGroup {
    export function Selector() {
        createEffect(() => {
            setExplaingGroupIndex(0);
            setGroups((OperationMode.value() == "view") ? NowUser.get().readableGroups : NowUser.get().editableGroups);
        });
        return (
            <Pulldown setIndex={setExplaingGroupIndex} values={groups()}></Pulldown>
        );
    }
    export function name(): string {
        return groups()[explaingGroupIndex()];
    }
}

export default OperatedGroup;