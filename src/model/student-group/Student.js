import Formatter from '@/utils/Formatter';
import { useGroupStore } from '@/store2/studentgroup/group';
export default class Student {
    student_id;
    date_of_birth;
    enrolled_date;

    group_id;
    is_budget;
    INN;
    SNILS;
    place_of_birth;
    email;
    student_login;
    enrollment_order;
    phone_number;
    phone_number_rod;
    zachetka_number;
    first_name;
    last_name;
    patronymic;
    gender;
    subgroup;
    passport_series_and_number;
    deleted_at;

    constructor(student) {
        this.student_id = student?.student_id ?? null;
        this.date_of_birth = student?.date_of_birth ?? null;
        this.enrolled_date = student?.enrolled_date ?? null;

        this.group_id = student?.group_id ?? null;
        this.is_budget = student?.is_budget ?? null;
        this.INN = student?.INN ?? null;
        this.SNILS = student?.SNILS ?? null;
        this.place_of_birth = student?.place_of_birth ?? null;
        this.email = student?.email ?? null;
        this.student_login = student?.student_login ?? null;
        this.enrollment_order = student?.enrollment_order ?? null;
        this.phone_number = student?.phone_number ?? null;
        this.phone_number_rod = student?.phone_number_rod ?? null;
        this.zachetka_number = student?.zachetka_number ?? null;
        this.first_name = student?.first_name ?? null;
        this.last_name = student?.last_name ?? null;
        this.patronymic = student?.patronymic ?? null;
        this.gender = student?.gender ?? null;
        this.subgroup = student?.subgroup ?? null;
        this.passport_series_and_number = student?.passport_series_and_number ?? null;
        this.deleted_at = student?.deleted_at ?? null;
    }

    get group_number() {
        const groupStore = useGroupStore();
        const group = groupStore.groupMap[this.group_id];
        console.log(group);
        return group ? group.group_number : null; // Return the group number if it exists, otherwise return null or a default value
    }



    get full_name() {
        // Initialize an array to hold name parts
        const nameParts = [];

        // Add non-null and non-undefined parts to the array
        if (this.last_name) nameParts.push(this.last_name);
        if (this.first_name) nameParts.push(this.first_name);
        if (this.patronymic) nameParts.push(this.patronymic);

        // Join the parts with a space and return the full name
        return nameParts.join(' ');
    }
}