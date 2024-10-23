import { useDirectionStore } from '@/store2/studentgroup/direction';

export default class Profile {
    prof_id;
    prof_dir_id;
    prof_name;
    deleted_at;

    constructor(profile) {
        this.prof_id = profile?.prof_id ?? null;
        this.prof_dir_id = profile?.prof_dir_id ?? null;
        this.prof_name = profile?.prof_name ?? null;
        this.deleted_at = profile?.deleted_at ?? null;
    }


    // Метод для получения направления по его ID
    get direction() {
        const directionStore = useDirectionStore();
        const direction = directionStore.directionMap[this.prof_dir_id];
        return direction || null; // Возвращает направление, если оно существует, иначе null
    }

    // Метод для получения имени направления
    get dir_name() {
        const direction = this.direction;
        return direction ? direction.dir_name : null; // Возвращает имя направления, если оно существует, иначе null
    }

    // Метод для получения кода направления
    get dir_code() {
        const direction = this.direction;
        return direction ? direction.dir_code : null; // Возвращает код направления, если он существует, иначе null
    }
}
