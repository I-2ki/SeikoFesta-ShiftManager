import { JSX, Setter } from "solid-js"

//データ関係
export type User = {
    studentNumber : number,
    name : string,
    shiftData : Array<Job>
}

export type Job = {

}

export type Group = {
    name : string,
}

//Atoms Props
export type PulldownProps = {
    setValue : Setter<string>,
    values : Array<string>
}

export type RadioButtonContainerProps = {
    setValue : Setter<number>
    children : JSX.Element
}

//Molecules Props
export type TimeLineProps = {
    user : User,
}

export type InputMode = "add" | "remove";
//Organisms
export type ToolBerState = {
    inputMode :InputMode,
    group :Group,
}
