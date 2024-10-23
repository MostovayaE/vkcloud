import { useUserStore } from '@/store2/admingroup/user';
export default class ProcedureUser {
    id;
    procedure_name;
    procedure_definition
    user_id;

    constructor(procedureUser) {
        this.id = procedureUser?.id ?? null;
        this.procedure_name = procedureUser?.procedure_name ?? null;
        this.procedure_definition = procedureUser?.procedure_definition ?? null;
        this.user_id = procedureUser?.user_id ?? null;
    }


    get username() {
        const userStore = useUserStore();
        const user = userStore.userMap[this.user_id];
        return user ? user.username : null;
    }

}
