import Formatter from "@/utils/Formatter";

export default class Contract {
  id;
  listener_id;
  payer_id;
  program_id;
  cert_date;
  listened_hours;
  date_enroll;
  date_kick;
  group_to_move;
  contr_number;
  deleted_at;

  constructor(contract) {
    this.id = contract?.id ?? null;
    this.listener_id = contract?.listener_id ?? null;
    this.payer_id = contract?.payer_id ?? null;
    this.program_id = contract?.program_id ?? null;
    this.cert_date = contract?.cert_date ?? null;
    this.listened_hours = contract?.listened_hours ?? null;
    this.date_enroll = contract?.date_enroll ?? null;
    this.date_kick = contract?.date_kick ?? null;
    this.group_to_move = contract?.group_to_move ?? null;
    this.contr_number = contract?.contr_number ?? null;
    this.deleted_at = contract?.deleted_at ?? null;
  }
}
