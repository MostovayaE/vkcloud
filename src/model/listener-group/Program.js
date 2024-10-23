import Formatter from "@/utils/Formatter";

export default class Program {
  id;
  required_amount;
  program_name;
  hours;
  start_date;
  end_date;
  deleted_at;

  constructor(program) {
    this.id = program?.id ?? null;
    this.required_amount = program?.required_amount ?? null;
    this.program_name = program?.program_name ?? null;
    this.hours = program?.hours ?? null;
    this.start_date = program?.start_date ?? null;
    this.end_date = program?.end_date ?? null;
    this.deleted_at = program?.deleted_at ?? null;
  }
}
