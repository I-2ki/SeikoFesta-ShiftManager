//データ関係
export type StudentRole = "reader" | "editor" | "admin";

export type Shifts = {
    first : string[],
    second : string[],
}

export type Student = {
    number : number,
    name : string,
    groups : Array<string>,
    editableGroups : Array<string>,
    shifts : Shifts,
}

export type Job = {
    id :string,
    name :string,
    explain :string,
}

//ツールバー
export type day = "first" | "second";
