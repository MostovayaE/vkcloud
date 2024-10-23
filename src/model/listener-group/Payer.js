import Formatter from "@/utils/Formatter";

export default class Payer {
  id;
  name;
  surname;
  lastname;
  snils;
  passport;
  issued_by;
  issue_date;
  department_code;
  registration_address;
  phone_number;
  email;
  deleted_at;

  constructor(payer) {
    this.id = payer?.id ?? null;
    this.name = payer?.name ?? null;
    this.surname = payer?.surname ?? null;
    this.lastname = payer?.lastname ?? null;
    this.snils = payer?.snils ?? null;
    this.passport = payer?.passport ?? null;
    this.issued_by = payer?.issued_by ?? null;
    this.issue_date = payer?.issue_date ?? null;
    this.department_code = payer?.department_code ?? null;
    this.registration_address = payer?.registration_address ?? null;
    this.phone_number = payer?.phone_number ?? null;
    this.email = payer?.email ?? null;
    this.deleted_at = payer?.deleted_at ?? null;
  }

  get full_name() {
    const nameParts = [];
  
    if (this.name) nameParts.push(this.name);
    if (this.surname) nameParts.push(this.surname);
    if (this.lastname) nameParts.push(this.lastname);
  
    return nameParts.join(' ');
  }
}
