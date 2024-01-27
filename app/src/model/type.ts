export type Student = {
    id : number,
    name : string,
    readableGroups : Array<string>,
    editableGroups : Array<string>,
    firstShift : string[],
    secondShift : string[],
}

export type Job = {
    id:string
    name :string,
    group :string,
    explain :string,
}

export type OperationMode = "view" | "edit";
export type InputMode = "add" | "remove";
export type Day = "first" | "second";

export type ToolBerState = {
	operationMode: OperationMode,
	inputMode: InputMode,
	groupName: string,
	day: Day,
	inputJob: string,
}