import OperatedDay from "../components/ToolBer/OperatedDay";

namespace User {
    export type type = {
        id: string,
        name: string,
        readableGroups: string[],
        editableGroups: string[],
        firstShift: string[],
        secondShift: string[],
    }
    export const empty = {
        id: "",
        name: "",
        readableGroups: [],
        editableGroups: [],
        firstShift: [],
        secondShift: [],
    }
    export const getShiftIn = (day: OperatedDay.type, user: User.type): string[] => {
        if (day == "first") return user.firstShift;
        return user.secondShift;
    }
}

export default User;