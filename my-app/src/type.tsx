import { JSX, Setter } from "solid-js"

//データ関係
export type StudentRole = "visitor" | "editor" | "admin";

export type Student = {
    number : number,
    name : string,
    shifts : Array<string>,
    editableGroups : Array<string>,
    role : StudentRole,
}

export type Job = {
    id :string,
    name :string,
    explain :string,
}

export type Group = {
    id : string,
    name : string,
    members : Array<number>,
    jobs : Array<string>
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
export type InputMode = "add" | "remove";

//Organisms
export type ToolBerProps = {
    setValue : Setter<ToolBerState>
}

export type ToolBerState = {
    inputMode :InputMode,
    group :string,
    day :string,
}

export type TimeTableProps = {
    toolBerState : ToolBerState,
}
