const startTime = 9;
const startMinute = 0;
const endTime = 17;
const endMinute = 0;
const interval = 10;
//ここを変更したときに実データをどう整形するかは未実装


type TimeAndMinute = {
    time: number,
    minute: number,
}

export function numOfCells(): number {
    const totalTime = (endTime - startTime) * 60 + (endMinute - startMinute);
    const numOfCell = Math.floor(totalTime / interval);

    return numOfCell;
}

export function labelTimes(): TimeAndMinute[] {
    const array: TimeAndMinute[] = [];

    for (let i = 0; i < numOfCells() + 1; i++) {
        const displayTime = startTime + Math.floor((startMinute + i * interval) / 60);
        const displayMinute = (startMinute + i * interval) % 60;
        array.push({ time: displayTime, minute: displayMinute })
    }
    return array;
}

export function isLabelEmphasize(time: TimeAndMinute): boolean {
    if(time.minute == 0){
        return true;
    }
    return false;
}