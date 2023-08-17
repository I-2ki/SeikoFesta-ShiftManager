import { createResource } from "solid-js";
import { fetchTimeSetting } from "../firebase/db/setting";

const [timeSettings] = createResource(fetchTimeSetting);

type labelTime = {
    time: number,
    minute: number,
}

export function labelTimes(): labelTime[] {
    if (timeSettings.loading || timeSettings.error) {
        return [];
    }
    //VSCodeで開くとエラーが出るが、VSCodeがポンコツなだけで上のバリデーション処理によりtimeSettings()はundefinedにならない
    const interval = timeSettings().interval;

    function convertIllegalTime(value: number) {
        const int = Math.floor(value);
        return int;
    }

    function convertIllegalMinute(value: number) {
        const int = Math.floor(value);
        return int - (int % interval);
    }

    const startTime = convertIllegalTime(timeSettings().start_time);
    const startMinute = convertIllegalMinute(timeSettings().start_minute);
    const endTime = convertIllegalTime(timeSettings().end_time);
    const endMinute = convertIllegalMinute(timeSettings().end_minute);

    const totalTime = (endTime - startTime) * 60 + (endMinute - startMinute);
    const cellTimes = Math.floor(totalTime / interval) + 1;

    const array: labelTime[] = [];

    for (let i = 0; i < cellTimes; i++) {
        const displayTime = startTime + Math.floor((startMinute + i * interval) / 60);
        const displayMinute = (startMinute + i * interval) % 60;
        array.push({ time: displayTime, minute: displayMinute })
    }
    return array;
};