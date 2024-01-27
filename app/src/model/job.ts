namespace Job {
    export type type = {
        id: string
        name: string,
        group: string,
        explain: string,
    }
    export const empty: type = {
        id: "",
        name: "",
        group: "",
        explain: "",
    }
}

export default Job;