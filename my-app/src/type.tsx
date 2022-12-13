import { JSX, Setter } from "solid-js"

//データ関係
export type StudentRole = "visitor" | "editor" | "admin";

export type Student = {
    number : number,
    name : string,
    groups : Array<string>,
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
