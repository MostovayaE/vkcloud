import Formatter from '@/utils/Formatter';


export default class Departament {
    dep_id;
    dep_name;
    dep_abb;

    constructor(departament) {
        this.dep_id = departament?.dep_id ?? null;
        this.dep_name = departament?.dep_name ?? null;
        this.dep_abb = departament?.dep_abb ?? null;
    }

}

