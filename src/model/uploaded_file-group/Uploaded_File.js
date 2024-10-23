import Formatter from "@/utils/Formatter";

export default class Uploaded_File {
  id;
  direction_code;
  direction_name;
  qualification;
  academic_year;
  department;
  faculty;
  duration_of_study;
  start_year;
  specialization;
  kurs;
  semester;
  disciple_name;
  index_code;
  control_hours;
  total_hours;
  contact_hours;
  lecture_hours;
  lab_hours;
  practice_hours;
  ksr_hours;
  ikr_hours;
  sr_hours;
  control_type;
  z_e;
  weeks;
  deleted_at;

  constructor(uploaded_file) {
    this.id = uploaded_file?.id ?? null;
    this.direction_code = uploaded_file?.direction_code ?? null;
    this.direction_name = uploaded_file?.direction_name ?? null;
    this.qualification = uploaded_file?.qualification ?? null;
    this.academic_year = uploaded_file?.academic_year ?? null;
    this.department = uploaded_file?.department ?? null;
    this.faculty = uploaded_file?.faculty ?? null;
    this.duration_of_study = uploaded_file?.duration_of_study ?? null;
    this.start_year = uploaded_file?.start_year ?? null;
    this.specialization = uploaded_file?.specialization ?? null;
    this.kurs = uploaded_file?.kurs ?? null;
    this.semester = uploaded_file?.semester ?? null;
    this.disciple_name = uploaded_file?.disciple_name ?? null;
    this.index_code = uploaded_file?.index_code ?? null;
    this.control_hours = uploaded_file?.control_hours ?? 0;
    this.total_hours = uploaded_file?.total_hours ?? 0;
    this.contact_hours = uploaded_file?.contact_hours ?? 0;
    this.lecture_hours = uploaded_file?.lecture_hours ?? 0;
    this.lab_hours = uploaded_file?.lab_hours ?? 0;
    this.practice_hours = uploaded_file?.practice_hours ?? 0;
    this.ksr_hours = uploaded_file?.ksr_hours ?? 0;
    this.ikr_hours = uploaded_file?.ikr_hours ?? 0;
    this.sr_hours = uploaded_file?.sr_hours ?? 0;
    this.control_type = uploaded_file?.control_type ?? null;
    this.z_e = uploaded_file?.z_e ?? null;
    this.weeks = uploaded_file?.weeks ?? null;
    this.deleted_at = uploaded_file?.deleted_at ?? null;
  }
}
