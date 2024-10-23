import Formatter from '@/utils/Formatter';


export default class Teacher {
    teacher_id;
    first_name;
    last_name;
    patronymic;

    constructor(teacher) {
        this.teacher_id = teacher?.teacher_id ?? null;
        this.first_name = teacher?.first_name ?? null;
        this.last_name = teacher?.last_name ?? null;
        this.patronymic = teacher?.patronymic ?? null;
    }

    get full_name() {

        const nameParts = [];


        if (this.last_name) nameParts.push(this.last_name);
        if (this.first_name) nameParts.push(this.first_name);
        if (this.patronymic) nameParts.push(this.patronymic);


        return nameParts.join(' ');
    }


}
