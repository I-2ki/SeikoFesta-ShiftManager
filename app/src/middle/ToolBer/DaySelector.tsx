import { createSignal } from "solid-js";
import Pulldown from "../../ui/Pulldown"
import { Day } from "../../logic/type";

const [day, setDay] = createSignal<number>(0);
export const explaingDay = () :Day => {
    return (day() == 0)?"first":"second";
}

export default function DaySelector(){
    const days = ["1日目", "2日目"];
    return <Pulldown setIndex={setDay} values={days}></Pulldown>
}