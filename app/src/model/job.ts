import { operatingGroupName } from "../components/ToolBer/GroupSelector";
import { displayStudent } from "../firebase/db/displayStudent";
import { addJob, deleteJob, jobs } from "../firebase/db/jobOperateMethods";
import { Job } from "./type";

export async function inputJobWithPrompt() {
    const name = window.prompt("追加したい仕事の名前を入れてください。");
    if (name === null) return;
    await addJob(name, operatingGroupName(), "");
}

export function serachJobFromID(id: string): Job {
    for (let job of jobs()) {
        if (job.id == id) return job;
    }
    return { id: "", name: "", explain: "", group: "" };
}

export function serachJobFromGroups(jobName: string): Job[] {
    const output: Job[] = [];
    for (let job of jobs()) {
        if (job.group == jobName) output.push(job);
    }
    return output;
}

export function operatingGroupJobNames(): string[] {
    const names: string[] = [];
    for (let job of serachJobFromGroups(operatingGroupName())) {
        names.push(job.name);
    }
    return names;
}

export function deleteJobSafety(deletedJob: Job) {
    alert(`仕事：${deletedJob.name}を削除します。\nよろしいですか？`);
    //仕事が消えたときにシフト上の仕事も全部消す処理
    deleteJob(deletedJob.id);
}