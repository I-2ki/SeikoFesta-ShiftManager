import OperatedDay from "../components/ToolBer/OperatedDay";

namespace User {
    export type type = {
        id: string | null,
        number: number | null,
        name: string,
        readableGroups: string[],
        editableGroups: string[],
        firstShift: string[],
        secondShift: string[],
    }
    export const empty: type = {
        id: "",
        number: null,
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