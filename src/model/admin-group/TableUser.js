import { useUserStore } from '@/store2/admingroup/user';
export default class TableUser {
    id;
    table_name;
    table_definition
    user_id;

    constructor(tableUser) {
        this.id = tableUser?.id ?? null;
        this.table_name = tableUser?.table_name ?? null;
        this.table_definition = tableUser?.table_definition ?? null;
        this.user_id = tableUser?.user_id ?? null;
    }


    get username() {
        const userStore = useUserStore();
        const user = userStore.userMap[this.user_id];
        return user ? user.username : null;
    }

}
