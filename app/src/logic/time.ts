//もうめんどいから10分刻み固定で
const START_TIME: number = 8;
const START_MINUTE: number = 30;

const TIMES: number = 53;
const INTERVAL: number = 10;

type labelTime = {
    time: number,
    minute: number,
}

export function labelTimes(): labelTime[] {
    const array = [];
    for (let i = 0; i < TIMES + 1; i++) {
        //1時間=60分より
        const displayTime = START_TIME + Math.floor((START_MINUTE + i * INTERVAL) / 60);
        const displayMinute = (START_MINUTE + i * INTERVAL) % 60;
        array.push({ time: displayTime, minute: displayMinute })
    }
    return array;
}