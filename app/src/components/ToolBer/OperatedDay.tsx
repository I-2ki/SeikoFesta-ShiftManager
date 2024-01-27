import { createSignal } from "solid-js";

import Pulldown from "../../ui/Pulldown"

const [day, setDay] = createSignal<number>(0);

namespace OperatedDay {
    export type type = "first" | "second";

    export const value = (): type => {
        return (day() == 0) ? "first" : "second";
    }

    export const Selector = () => {
        const days = ["1日目", "2日目"];
        return <Pulldown setIndex={setDay} values={days}></Pulldown>
    }
}

export default OperatedDay;