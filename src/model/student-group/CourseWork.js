import { useStudentStore } from '@/store2/studentgroup/student';
import { useTeacherStore } from '@/store2/teachergroup/teacher';
import { useDepartamentStore } from '@/store2/teachergroup/departament';
export default class CourseWork {
    course_work_id;
    course_work_teacher_id;
    course_work_theme;
    course_work_student_id;
    course_work_kafedra;
    course_work_ocenka;
    course_work_year;
    course_work_vipysk;
    deleted_at;

    constructor(courseWork) {
        this.course_work_id = courseWork?.course_work_id ?? null;
        this.course_work_teacher_id = courseWork?.course_work_teacher_id ?? null;
        this.course_work_theme = courseWork?.course_work_theme ?? null;
        this.course_work_student_id = courseWork?.course_work_student_id ?? null;
        this.course_work_kafedra = courseWork?.course_work_kafedra ?? null;
        this.course_work_ocenka = courseWork?.course_work_ocenka ?? null;
        this.course_work_year = courseWork?.course_work_year ?? null;
        this.course_work_vipysk = courseWork?.course_work_vipysk ?? null;
        this.deleted_at = courseWork?.deleted_at ?? null;
    }

    get teacher_name() {
        // Assuming we have access to a TeacherStore similar to the original Student model's group
        const teacherStore = useTeacherStore();
        const teacher = teacherStore.teacherMap[this.course_work_teacher_id];
        return teacher ? `${teacher.last_name} ${teacher.first_name} ${teacher.patronymic}` : null;
    }

    get student_name() {
        // Assuming we have access to a StudentStore to get student details by ID
        const studentStore = useStudentStore();

        const student = studentStore.studentMap[this.course_work_student_id];
        return student ? student.full_name : null;
    }

    get dep_name() {
        // Assuming we have a KafedraStore to get the department (kafedra) details by ID
        const departamentStore = useDepartamentStore();
        const departament = departamentStore.departamentMap[this.course_work_kafedra];
        return departament ? departament.dep_name : null;
    }



    get final_grade() {
        return this.course_work_ocenka ?? 'No grade assigned';
    }

    get is_vipysk() {
        return this.course_work_vipysk ? 'Yes' : 'No';
    }

    get full_coursework_info() {
        return {
            'Teacher': this.teacher_name,
            'Student': this.student_name,
            'Theme': this.course_work_theme,
            'Kafedra': this.kafedra_name,
            'Year': this.year_formatted,
            'Grade': this.final_grade,
            'Is Vipysk': this.is_vipysk
        };
    }
}
