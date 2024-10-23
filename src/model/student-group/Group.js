import { useDirectionStore } from '@/store2/studentgroup/direction';
import { useProfileStore } from '@/store2/studentgroup/profile';

export default class Group {
    group_id;
    group_dir_id;
    group_prof_id;
    group_number;
    course;
    deleted_at;

    constructor(group) {
        this.group_id = group?.group_id ?? null;
        this.group_dir_id = group?.group_dir_id ?? null;
        this.group_prof_id = group?.group_prof_id ?? null;
        this.group_number = group?.group_number ?? null;
        this.course = group?.course ?? null;
        this.deleted_at = group?.deleted_at ?? null;
    }


    // Получение названия направления через связанное поле group_dir_id
    get dir_name() {
        const directionStore = useDirectionStore();
        const direction = directionStore.directionMap[this.group_dir_id];
        return direction ? direction.dir_name : null; // Возвращает название направления, если оно существует, иначе null
    }

    // Получение кода направления через связанное поле group_dir_id
    get dir_code() {
        const directionStore = useDirectionStore();
        const direction = directionStore.directionMap[this.group_dir_id];
        return direction ? direction.dir_code : null; // Возвращает код направления, если он существует, иначе null
    }

    // Получение названия профиля через связанное поле group_prof_id
    get prof_name() {
        const profileStore = useProfileStore();
        const profile = profileStore.profileMap[this.group_prof_id];
        return profile ? profile.prof_name : null; // Возвращает название профиля, если он существует, иначе null
    }
}
