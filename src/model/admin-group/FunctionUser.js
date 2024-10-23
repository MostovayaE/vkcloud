import { useUserStore } from '@/store2/admingroup/user';
export default class FunctionUser {
    id;
    functionname;
    functiondefinition
    userid;

    constructor(functionUser) {
        this.id = functionUser?.id ?? null;
        this.functionname = functionUser?.functionname ?? null;
        this.functiondefinition = functionUser?.functiondefinition ?? null;
        this.userid = functionUser?.userid ?? null;
    }


    get username() {
        const userStore = useUserStore();
        const user = userStore.userMap[this.userid];
        return user ? user.username : null;
    }

}
