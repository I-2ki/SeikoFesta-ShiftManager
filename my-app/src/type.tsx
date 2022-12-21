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
    shifts : Shifts,
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
