import axios from 'axios';
import authHeader from './auth-header';
const { Client } = require('pg');

const API = 'https://ncatbird.ru/server/api';
const client = new Client({
  host: '91.219.227.195',
  port: 5432,
  user: 'user',
  password: '.L6L3A325k790HSPL',
  database: 'PostgreSQL-9265',
});

async function connectToDatabase() {
  try {

    await client.connect();

  } catch (err) {
    console.error('Ошибка подключения или выполнения запроса:', err);
  }
}


connectToDatabase();
class UserService {
  getPublicContent() {
    return axios.client.get(API_URL + '"SuperHeroes"', { headers: authHeader() });
  }
  /*
    getUserBoard() {
      return axios.client.get(API_URL + 'user', { headers: authHeader() });
    }
  
    getModeratorBoard() {
      return axios.client.get(API_URL + 'mod', { headers: authHeader() });
    }
  
    getAdminBoard() {
      return axios.client.get(API_URL + 'admin', { headers: authHeader() });
    }
  */
  getAllStudents() {

    return axios.client.get(API_URL + "students", { headers: authHeader() });
  }
  deleteStudentById(student_id) {
    const query = {
      query: `DELETE FROM students where "student_id" = '${student_id}'`,
    };

    return axios.client.post(API_URL, query, { headers: authHeader() });
  }

  getAllFormattedStudents() {
    const query = {
      query: `SELECT 
      s.student_id,
      CONCAT_WS(' ', s.last_name, s.first_name, s.patronymic) AS full_name,
      CONCAT_WS('/', g.group_number, NULLIF(s.subgroup, '')) AS group_name,
      TO_CHAR(s.enrolled_date, 'DD/MM/YYYY') AS formatted_enrolled_date,
      s.enrollment_order,
      TO_CHAR(s.date_of_birth, 'DD/MM/YYYY') AS formatted_date_of_birth,
      s.course
  FROM 
      students s
  JOIN 
      groups g ON s.group_id = g.group_id
  ORDER BY 
      full_name ASC;`,
    };

    return axios.client.post(API_URL, query, { headers: authHeader() });
  }

  getStudentById(studentId) {
    const query = {
      query: `SELECT
      *,
      TO_CHAR(date_of_birth, 'YYYY-MM-DD') AS date_of_birth,
      TO_CHAR(enrolled_date, 'YYYY-MM-DD') AS enrolled_date
  FROM
      students
  WHERE
      student_id = ${studentId};`,
    };

    return axios.client.post(API_URL, query, { headers: authHeader() });
  }

  updateStudentById(studentId, first_name, last_name, patronymic, gender, date_of_birth, passport_series_and_number, INN, SNILS, place_of_birth, email, student_login, enrollment_order, enrolled_date, course, group_id, subgroup) {
    const query = {
      query: `"first_name" = '${first_name}',
      "last_name" = '${last_name}',
      "patronymic" = '${patronymic}',
      "gender" = '${gender}',
      "date_of_birth" = '${date_of_birth}',
      "passport_series_and_number" = '${passport_series_and_number}',
      "INN" = '${INN}',
      "SNILS" = '${SNILS}',
      "place_of_birth" = '${place_of_birth}',
      "email" = '${email}',
      "student_login" = '${student_login}',
      "enrollment_order" = '${enrollment_order}',
      "enrolled_date" = '${enrolled_date}',
      "course" = '${course}',
      "group_id" = '${group_id}',
      "subgroup" = '${subgroup}'
  WHERE
      "student_id" = '${studentId}';`,
    };

    return axios.client.put(API_URL + "students", query, { headers: authHeader() });
  }

  addStudent(first_name, last_name, patronymic, gender, date_of_birth, passport_series_and_number, INN, SNILS, place_of_birth, email, student_login, enrollment_order, enrolled_date, course, group_id, subgroup) {
    const query = {
      query: `INSERT INTO "students" (
        "first_name",
        "last_name",
        "patronymic",
        "gender",
        "date_of_birth",
        "passport_series_and_number",
        "INN",
        "SNILS",
        "place_of_birth",
        "email",
        "student_login",
        "enrollment_order",
        "enrolled_date",
        "course",
        "group_id",
        "subgroup"
    ) VALUES (
        '${first_name}',
        '${last_name}',
        '${patronymic}',
        '${gender}',
        '${date_of_birth}',
        '${passport_series_and_number}',
        '${INN}',
        '${SNILS}',
        '${place_of_birth}',
        '${email}',
        '${student_login}',
        '${enrollment_order}',
        '${enrolled_date}',
        '${course}',
        '${group_id}',
        '${subgroup}'
    );`,
    };

    return axios.client.post(API_URL, query, { headers: authHeader() });


  }

  getGroupsAsIdText() {
    const query = {
      query: `SELECT group_id AS id, group_number AS text
      FROM "groups" ORDER BY 
      text ASC;`,
    };

    return axios.client.post(API_URL, query, { headers: authHeader() });
  }
  getProgramsAsIdText() {
    const query = {
      query: `SELECT id, program_name AS text
      FROM "programs" ORDER BY 
      text ASC;`,
    };

    return axios.client.post(API_URL, query, { headers: authHeader() });
  }

  getPermissionByTable(tablename) {
    const query = {
      query: `SELECT p.*, r."RoleName"
      FROM "Permissions" AS p
      INNER JOIN "Roles" AS r ON p."RoleId" = r."RoleId"
      WHERE p."TableName" = '${tablename}';`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }

  getAllDirections() {
    const query = {
      query: `SELECT * from directions ORDER BY 
      dir_name ASC;`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }

  getDirectionById(id) {
    const query = {
      query: `SELECT * from directions where 
      dir_id='${id}';`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }
  addDirection(dir_name, dir_code) {
    const query = {
      query: `INSERT INTO "directions" (
        "dir_name",
        "dir_code"
    ) VALUES (
        '${dir_name}',
        '${dir_code}'
    );`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }



  updateDirectionById(dir_id, dir_name, dir_code) {
    const query = {
      query: `"dir_name" = '${dir_name}',
      "dir_code" = '${dir_code}'
  WHERE
      "dir_id" = '${dir_id}';`,
    };
    return axios.client.put(API_URL + "directions", query, { headers: authHeader() });
  }

  getAllProfiles() {
    const query = {
      query: `SELECT
      p.prof_id,
      p.prof_name,
      d.dir_id,
      d.dir_name,
      d.dir_code
  FROM
      "profiles" p
  JOIN
      "directions" d ON p.prof_dir_id = d.dir_id
      ORDER BY 
      p.prof_name ASC;
  `,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }


  getProfileById(id) {
    const query = {
      query: `SELECT * from profiles where 
      prof_id='${id}';`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }
  addProfile(prof_dir_id, prof_name) {
    const query = {
      query: `INSERT INTO "profiles" (
        "prof_dir_id",
        "prof_name"
    ) VALUES (
        '${prof_dir_id}',
        '${prof_name}'
    );`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }

  updateProfileById(prof_id, prof_dir_id, prof_name) {
    const query = {
      query: `"prof_dir_id" = '${prof_dir_id}',
      "prof_name" = '${prof_name}'
  WHERE
      "prof_id" = '${prof_id}';`,
    };
    return axios.client.put(API_URL + "profiles", query, { headers: authHeader() });
  }
  getDirectionsAsIdText() {
    const query = {
      query: `SELECT dir_id AS id, dir_code AS text
      FROM "directions" ORDER BY 
      text ASC;`,
    };

    return axios.client.post(API_URL, query, { headers: authHeader() });
  }

  getProfilesAsIdText() {
    const query = {
      query: `SELECT prof_id AS id, prof_name AS text
      FROM "profiles" ORDER BY 
      text ASC;`,
    };

    return axios.client.post(API_URL, query, { headers: authHeader() });
  }


  getAllGroups() {
    const query = {
      query: `SELECT
      g.group_id,
      g.group_number,
      p.prof_name,
      d.dir_name,
      d.dir_code
  FROM
      "groups" AS g
  JOIN
      "profiles" AS p
  ON
      g.group_prof_id = p.prof_id
  JOIN
      "directions" AS d
  ON
      g.group_dir_id = d.dir_id  ORDER BY 
      g.group_number ASC;
  `,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }


  getGroupById(id) {
    const query = {
      query: `SELECT * from groups where 
      group_id='${id}';`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }
  addGroup(group_dir_id, group_prof_id, group_number) {
    const query = {
      query: `INSERT INTO "groups" (
        "group_dir_id",
        "group_prof_id",
        "group_number"
    ) VALUES (
        '${group_dir_id}',
        '${group_prof_id}',
        '${group_number}'
    );`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }

  updateGroupById(group_id, group_dir_id, group_prof_id, group_number) {
    const query = {
      query: `"group_dir_id" = '${group_dir_id}',
      "group_prof_id" = '${group_prof_id}',
      "group_number" = '${group_number}'
  WHERE
      "group_id" = '${group_id}';`,
    };
    return axios.client.put(API_URL + "groups", query, { headers: authHeader() });
  }

  getAllListeners() {
    const query = {
      query: `SELECT
      CONCAT(l.name, ' ', l.lastname, ' ', l.surname) AS full_name,
      l.phone_number,
      l.email,
      l.id,
      l.days_of_week,
      l.people_count,
      CONCAT(p.name, ' ', p.lastname, ' ', p.surname) AS full_name2
  FROM
      "listeners" as l
      JOIN
      "payers" AS p
  ON
      l.payer_id = p.id
      ;
  `,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }


  getListenerById(id) {
    const query = {
      query: `SELECT *, TO_CHAR(issue_date , 'YYYY-MM-DD') AS issue_date from listeners where 
      id='${id}';`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }
  addListener(name, surname, lastname, snils, passport, issued_by, issue_date, department_code, registration_address, phone_number, email, days_of_week, people_count) {

    var array3 = new Array;
    array3.push(days_of_week);
    const query = {
      query: `INSERT INTO "listeners" (
        "name",
        "surname",
        "lastname",
        "snils",
        "passport",
        "issued_by",
        "issue_date",
        "department_code",
        "registration_address",
        "phone_number",
        "email",
        "days_of_week", 
        "people_count"
    ) VALUES (
        '${name}',
        '${surname}',
        '${lastname}',
        '${snils}',
        '${passport}',
        '${issued_by}',
        '${issue_date}',
        '${department_code}',
        '${registration_address}',
        '${phone_number}',
        '${email}',
        '${array3}',
        '${people_count}'
    );`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }

  updateListenerById(id, name, surname, lastname, snils, passport, issued_by, issue_date, department_code, registration_address, phone_number, email, days_of_week, people_count) {
    const query = {
      query: ` "name" ='${name}',
      "surname" ='${surname}',
      "lastname"=  '${lastname}',
      "snils"= '${snils}',
      "passport"= '${passport}',
      "issued_by"= '${issued_by}',
      "issue_date"='${issue_date}',
      "department_code"='${department_code}',
      "registration_address"='${registration_address}',
      "phone_number"='${phone_number}',
      "email"='${email}',
      "days_of_week"='${days_of_week}', 
      "people_count"='${people_count}'
  WHERE
      "id" = '${id}';`,
    };
    return axios.client.put(API_URL + "listeners", query, { headers: authHeader() });
  }






  getAllContracts() {
    const query = {
      query: `SELECT 
      contracts.id AS contract_id,
      listeners.id AS listener_id,
      CONCAT(listeners.lastname, ' ', listeners.name, ' ', listeners.surname) AS listener_full_name,
      listeners.snils AS listener_snils,
      listeners.passport AS listener_passport,
      listeners.issued_by AS listener_issued_by,
      listeners.issue_date AS listener_issue_date,
      listeners.department_code AS listener_department_code,
      listeners.registration_address AS listener_registration_address,
      listeners.phone_number AS listener_phone_number,
      listeners.email AS listener_email,
      payers.id AS payer_id,
      CONCAT(payers.lastname, ' ', payers.name, ' ', payers.surname) AS payer_full_name,
      payers.snils AS payer_snils,
      payers.passport AS payer_passport,
      payers.issued_by AS payer_issued_by,
      payers.issue_date AS payer_issue_date,
      payers.department_code AS payer_department_code,
      payers.registration_address AS payer_registration_address,
      payers.phone_number AS payer_phone_number,
      payers.email AS payer_email,
      programs.program_name,
      contracts.contr_number,
      contracts.id
  FROM 
      contracts
  JOIN
      listeners ON contracts.listener_id = listeners.id
  JOIN
      payers ON contracts.payer_id = payers.id
  JOIN
      programs ON contracts.program_id = programs.id;
  `,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }


  getContractById(id) {
    const query = {
      query: `SELECT * from contracts where 
      id='${id}';`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }
  addContract(listener_id, payer_id, contr_number, program_id) {
    const query = {
      query: `INSERT INTO contracts (listener_id, payer_id, contr_number, program_id)
      VALUES(
        '${listener_id}',
        '${payer_id}',
        '${contr_number}',
        '${program_id}'
    );`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }

  updateContractById(id, listener_id, payer_id, contr_number, program_id) {
    const query = {
      query: ` "listener_id" ='${listener_id}',
      "payer_id" ='${payer_id}',
      "contr_number"= '${contr_number}',
      "program_id"= '${program_id}'
  WHERE
      "id" = '${id}';`,
    };
    return axios.client.put(API_URL + "contracts", query, { headers: authHeader() });
  }

  getPayersAsIdText() {
    const query = {
      query: `SELECT id AS id, CONCAT(lastname, ' ', name, ' ', surname) AS text
      FROM "payers" ORDER BY 
      text ASC;`,
    };

    return axios.client.post(API_URL, query, { headers: authHeader() });
  }

  getListenersAsIdText() {
    const query = {
      query: `SELECT id AS id, CONCAT(lastname, ' ', name, ' ', surname) AS text
      FROM "listeners" ORDER BY 
      text ASC;`,
    };

    return axios.client.post(API_URL, query, { headers: authHeader() });
  }

  getAllCws() {
    const query = {
      query: `SELECT
      cw.course_work_id,
      cw.course_work_teacher_id,
      cw.course_work_theme,
      cw.course_work_student_id,
      cw.course_work_kafedra,
      CONCAT(s.last_name, ' ', s.first_name, ' ', s.patronymic) AS full_name,
      s.gender AS student_gender,
      s.date_of_birth AS student_date_of_birth,
      s.passport_series_and_number AS student_passport,
      s."INN" AS student_INN,
      s."SNILS" AS student_SNILS,
      s.place_of_birth AS student_place_of_birth,
      s.email AS student_email,
      s.student_login AS student_login,
      s.enrollment_order AS student_enrollment_order,
      s.enrolled_date AS student_enrolled_date,
      s.course AS student_course,
      s.group_id AS student_group_id,
      s.subgroup AS student_subgroup
  FROM
      course_work cw
  JOIN
      students s ON cw.course_work_student_id = s.student_id;
  
  `,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }
  getAllPayers() {
    const query = {
      query: `SELECT
      CONCAT(name, ' ', lastname, ' ', surname) AS full_name,
      phone_number,
      email,
      id
  FROM
      payers;
  `,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }


  getPayerById(id) {
    const query = {
      query: `SELECT *, TO_CHAR(issue_date , 'YYYY-MM-DD') AS issue_date from payers where 
      id='${id}';`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }
  addPayer(name, surname, lastname, snils, passport, issued_by, issue_date, department_code, registration_address, phone_number, email) {
    const query = {
      query: `INSERT INTO "payers" (
        "name",
        "surname",
        "lastname",
        "snils",
        "passport",
        "issued_by",
        "issue_date",
        "department_code",
        "registration_address",
        "phone_number",
        "email"
    ) VALUES (
        '${name}',
        '${surname}',
        '${lastname}',
        '${snils}',
        '${passport}',
        '${issued_by}',
        '${issue_date}',
        '${department_code}',
        '${registration_address}',
        '${phone_number}',
        '${email}'
    );`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }

  updatePayerById(id, name, surname, lastname, snils, passport, issued_by, issue_date, department_code, registration_address, phone_number, email) {
    const query = {
      query: ` "name" ='${name}',
      "surname" ='${surname}',
      "lastname"=  '${lastname}',
      "snils"= '${snils}',
      "passport"= '${passport}',
      "issued_by"= '${issued_by}',
      "issue_date"='${issue_date}',
      "department_code"='${department_code}',
      "registration_address"='${registration_address}',
      "phone_number"='${phone_number}',
      "email"='${email}'
  WHERE
      "id" = '${id}';`,
    };
    return axios.client.put(API_URL + "payers", query, { headers: authHeader() });
  }

  getCwById(id) {
    const query = {
      query: `SELECT *, TO_CHAR(expiration_date , 'YYYY-MM-DD') AS expiration_date from contracts where 
      id='${id}';`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }
  addCw(listener_id, payer_id, required_amount, expiration_date) {
    const query = {
      query: `INSERT INTO contracts (listener_id, payer_id, required_amount, expiration_date)
      VALUES()
        '${listener_id}',
        '${payer_id}',
        '${required_amount}',
        '${expiration_date}'
    );`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }

  updateCwById(id, listener_id, payer_id, required_amount, expiration_date) {
    const query = {
      query: ` "listener_id" ='${listener_id}',
      "payer_id" ='${payer_id}',
      "required_amount"= '${required_amount}',
      "expiration_date"= '${expiration_date}'
  WHERE
      "id" = '${id}';`,
    };
    return axios.client.put(API_URL + "contracts", query, { headers: authHeader() });
  }

  getAllCourses() {
    const query = {
      query: `SELECT
      c.course_id,
      c.course,
      c.group_id,
      g.group_number
  FROM
      "courses" c
  JOIN
      "groups" g ON c.group_id = g.group_id
      ORDER BY 
      c.course ASC;
  `,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }


  getCourseById(id) {
    const query = {
      query: `SELECT * from courses where 
      course_id='${id}';`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }
  addCourse(course, group_id) {
    const query = {
      query: `INSERT INTO "courses" (
        "course",
        "group_id"
    ) VALUES (
        '${course}',
        '${group_id}'
    );`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }

  updateCourseById(course_id, course, group_id) {
    const query = {
      query: `"course" = '${course}',
      "group_id" = '${group_id}'
  WHERE
      "course_id" = '${course_id}';`,
    };
    return axios.client.put(API_URL + "courses", query, { headers: authHeader() });
  }

  getStudentsAsIdText() {
    const query = {
      query: `SELECT student_id AS id, CONCAT(last_name, ' ', first_name, ' ', patronymic) AS text
      FROM "students" ORDER BY 
      text ASC;`,
    };

    return axios.client.post(API_URL, query, { headers: authHeader() });
  }



  getAllPrograms() {
    const query = {
      query: `SELECT
      id,
      required_amount,
      program_name,
      hours,
      TO_CHAR(start_date , 'YYYY-MM-DD') AS start_date,
      TO_CHAR(end_date , 'YYYY-MM-DD') AS end_date
  FROM
    programs;
  `,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }


  getProgramById(id) {
    const query = {
      query: `SELECT *, TO_CHAR(start_date , 'YYYY-MM-DD') AS start_date, TO_CHAR(end_date , 'YYYY-MM-DD') AS end_date from programs where 
      id='${id}';`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }
  addProgram(required_amount, program_name, hours, start_date, end_date) {
    const query = {
      query: `INSERT INTO "programs" (
        "required_amount",
        "program_name",
        "hours",
        "start_date",
        "end_date"
    ) VALUES (
        '${required_amount}',
        '${program_name}',
        '${hours}',
        '${start_date}',
        '${end_date}'
    );`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }

  updateProgramById(id, required_amount, program_name, hours, start_date, end_date) {
    const query = {
      query: `"required_amount" ='${required_amount}',
      "program_name" ='${program_name}',
      "hours"=  '${hours}',
      "start_date"= '${start_date}',
      "end_date"= '${end_date}'
  WHERE
      "id" = '${id}';`,
    };
    return axios.client.put(API_URL + "programs", query, { headers: authHeader() });
  }


  getAllPayments() {
    const query = {
      query: `SELECT
      pg.id AS id,
      pg.listener_id,
      pg.contract_id,
      pg.payer_id AS pay_graph_payer_id,
      pg.expiration_date,
      pg.deposited_amount,
      c.id AS contract_id,
      c.listener_id AS contract_listener_id,
      c.payer_id AS contract_payer_id,
      c.contr_number,
      c.program_id,
      CONCAT(l.name, ' ', l.lastname, ' ', l.surname) AS full_name,  
      l.days_of_week,
      l.people_count,
      l.payer_id AS listener_payer_id,
      l.snils AS listener_snils,
      l.passport AS listener_passport,
      l.issued_by AS listener_issued_by,
      l.issue_date AS listener_issue_date,
      l.department_code AS listener_department_code,
      l.registration_address AS listener_registration_address,
      l.phone_number AS listener_phone_number,
      l.email AS listener_email,
      p.id AS payer_id,
      CONCAT(p.name, ' ', p.lastname, ' ', p.surname) AS full_name2,
      p.snils AS payer_snils,
      p.passport AS payer_passport,
      p.issued_by AS payer_issued_by,
      p.issue_date AS payer_issue_date,
      p.department_code AS payer_department_code,
      p.registration_address AS payer_registration_address,
      p.phone_number AS payer_phone_number,
      p.email AS payer_email
  FROM pay_graph AS pg
  JOIN contracts AS c ON pg.contract_id = c.id
  JOIN listeners AS l ON pg.listener_id = l.id
  JOIN payers AS p ON pg.payer_id = p.id;
  `,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }

  updatePaymentById(id, listener_id, contract_id, payer_id, expiration_date, deposited_amount) {
    const query = {
      query: `"listener_id" ='${listener_id}',
      "contract_id" ='${contract_id}',
      "payer_id"=  '${payer_id}',
      "expiration_date"= '${expiration_date}',
      "deposited_amount"= '${deposited_amount}'
  WHERE
      "id" = '${id}';`,
    };
    return axios.client.put(API_URL + "pay_graph", query, { headers: authHeader() });
  }
  addPayment(listener_id, contract_id, payer_id, expiration_date, deposited_amount) {
    const query = {
      query: `INSERT INTO "payments" (
        "listener_id",
        "contract_id",
        "payer_id",
        "expiration_date",
        "deposited_amount"
    ) VALUES (
        '${listener_id}',
        '${contract_id}',
        '${payer_id}',
        '${expiration_date}',
        '${deposited_amount}'
    );`,
    };
    return axios.client.post(API_URL, query, { headers: authHeader() });
  }

  getPaymentsAsIdText() {
    const query = {
      query: `SELECT id, contr_number AS text
      FROM "contracts" ORDER BY 
      text ASC;`,
    };

    return axios.client.post(API_URL, query, { headers: authHeader() });
  }
}

export default new UserService();