import { useUserStore } from '@/store2/admingroup/user';
export default class TriggerUser {
    id;
    trigger_name;
    trigger_definition
    user_id;

    constructor(triggerUser) {
        this.id = triggerUser?.id ?? null;
        this.trigger_name = triggerUser?.trigger_name ?? null;
        this.trigger_definition = triggerUser?.trigger_definition ?? null;
        this.user_id = triggerUser?.user_id ?? null;
    }


    get username() {
        const userStore = useUserStore();
        const user = userStore.userMap[this.user_id];
        return user ? user.username : null;
    }

}
