import Formatter from "@/utils/Formatter";

export default class PayGraph {
  id;
  contract_id;
  expiration_date;
  deposited_amount;
  all_sum;
  left_to_pay;
  date_40;
  bank;
  deleted_at;

  constructor(payGraph) {
    this.id = payGraph?.id ?? null;
    this.contract_id = payGraph?.contract_id ?? null;
    this.expiration_date = payGraph?.expiration_date ?? null;
    this.deposited_amount = payGraph?.deposited_amount ?? null;
    this.all_sum = payGraph?.all_sum ?? null;
    this.left_to_pay = payGraph?.left_to_pay ?? null;
    this.date_40 = payGraph?.date_40 ?? null;
    this.bank = payGraph?.bank ?? null;
    this.deleted_at = payGraph?.deleted_at ?? null;
  }
}
