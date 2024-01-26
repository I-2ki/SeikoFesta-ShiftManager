import { operatingGroupName } from "../components/ToolBer/GroupSelector";
import { addJob } from "../firebase/db/jobOperateMethods";

export async function inputJobWithPrompt(){
    const name = window.prompt("追加したい仕事の名前を入れてください。");
    if (name === null) return;
    await addJob(name,operatingGroupName(),"");
}