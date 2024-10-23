import endpoints from '@/api/endpoints';
import ReqExec from '@/services/RequestExecutor';
ReqExec.baseUrl = '';



//API methods
export default {

    uploadFile: (file) => {
        const formData = new FormData();
        formData.append('file', file);


        return ReqExec.postFile(endpoints.directLinks.uploadFile, file)

    },
    //student
    getStudentList: () => ReqExec.get(endpoints.rest.student, null, true),
    getStudentCont: () => ReqExec.get(endpoints.rest.cont, null, true),
    postStudent: (student) => ReqExec.post(endpoints.rest.student, student),
    putStudent: (student_id, student) => ReqExec.put(endpoints.rest.student, student_id, student),
    deleteStudent: (student) => ReqExec.put(endpoints.procedure.student, student.student_id, student),
    //direction
    getDirectionList: () => ReqExec.get(endpoints.rest.direction, null, true),
    postDirection: (direction) => ReqExec.post(endpoints.rest.direction, direction),
    putDirection: (direction_id, direction) => ReqExec.put(endpoints.rest.direction, direction_id, direction),
    deleteDirection: (direction) => ReqExec.put(endpoints.procedure.direction, direction.direction_id, direction),
    //profile
    getProfileList: () => ReqExec.get(endpoints.rest.profile, null, true),
    postProfile: (profile) => ReqExec.post(endpoints.rest.profile, profile),
    putProfile: (profile_id, profile) => ReqExec.put(endpoints.rest.profile, profile_id, profile),
    deleteProfile: (profile) => ReqExec.put(endpoints.procedure.profile, profile.profile_id, profile),
    //group
    getGroupList: () => ReqExec.get(endpoints.rest.group, null, true),
    postGroup: (group) => ReqExec.post(endpoints.rest.group, group),
    putGroup: (group_id, group) => ReqExec.put(endpoints.rest.group, group_id, group),
    deleteGroup: (group) => ReqExec.put(endpoints.procedure.group, group.group_id, group),

    //courseWork
    getCourseWorkList: () => ReqExec.get(endpoints.rest.courseWork, null, true),
    postCourseWork: (courseWork) => ReqExec.post(endpoints.rest.courseWork, courseWork),
    putCourseWork: (courseWork_id, courseWork) => ReqExec.put(endpoints.rest.courseWork, courseWork_id, courseWork),
    deleteCourseWork: (courseWork) => ReqExec.put(endpoints.procedure.courseWork, courseWork.courseWork_id, courseWork),

    //departament
    getDepartamentList: () => ReqExec.get(endpoints.rest.departament, null, true),

    //teacher
    getTeacherList: () => ReqExec.get(endpoints.rest.teacher, null, true),

    //listener
  getListenerList: () => ReqExec.get(endpoints.rest.listener, null, true),
  postListener: (listener) => ReqExec.post(endpoints.rest.listener, listener),
  putListener: (id, listener) =>
    ReqExec.put(endpoints.rest.listener, id, listener),
  deleteListener: (listener) =>
    ReqExec.put(endpoints.procedure.listener, listener.id, listener),
  //contract
  getContractList: () => ReqExec.get(endpoints.rest.contract, null, true),
  postContract: (contract) => ReqExec.post(endpoints.rest.contract, contract),
  putContract: (id, contract) =>
    ReqExec.put(endpoints.rest.contract, id, contract),
  deleteContract: (contract) =>
    ReqExec.put(endpoints.procedure.contract, contract.id, contract),
  //l_group
  getListenergroupList: () => ReqExec.get(endpoints.rest.l_group, null, true),
  postListenergroup: (l_group) => ReqExec.post(endpoints.rest.l_group, l_group),
  putListenergroup: (id, l_group) =>
    ReqExec.put(endpoints.rest.l_group, id, l_group),
  deleteListenergroup: (l_group) =>
    ReqExec.put(endpoints.procedure.l_group, l_group.id, l_group),
  //payer
  getPayerList: () => ReqExec.get(endpoints.rest.payer, null, true),
  postPayer: (payer) => ReqExec.post(endpoints.rest.payer, payer),
  putPayer: (id, payer) =>
    ReqExec.put(endpoints.rest.payer, id, payer),
  deletePayer: (payer) =>
    ReqExec.put(endpoints.procedure.payer, payer.id, payer),
  //pay_graph
  getPaymentList: () => ReqExec.get(endpoints.rest.pay_graph, null, true),
  postPayment: (pay_graph) => ReqExec.post(endpoints.rest.pay_graph, pay_graph),
  putPayment: (id, pay_graph) =>
    ReqExec.put(endpoints.rest.pay_graph, id, pay_graph),
  deletePayment: (pay_graph) =>
    ReqExec.put(endpoints.procedure.pay_graph, payment.id, pay_graph),
  //program
  getProgramList: () => ReqExec.get(endpoints.rest.program, null, true),
  postProgram: (program) => ReqExec.post(endpoints.rest.program, program),
  putProgram: (id, program) =>
    ReqExec.put(endpoints.rest.program, id, program),
  deleteProgram: (program) =>
    ReqExec.put(endpoints.procedure.program, program.id, program),
  //uploaded_files

  getUploaded_FileList: () => ReqExec.get(endpoints.rest.uploaded_file, null, true),
  postUploaded_File: (uploaded_file) => ReqExec.post(endpoints.rest.uploaded_file, uploaded_file),
  putUploaded_File: (direction_code, uploaded_file) =>
    ReqExec.put(endpoints.rest.uploaded_file, direction_code, uploaded_file),
  deleteUploaded_File: (uploaded_file) =>
    ReqExec.put(endpoints.procedure.uploaded_file, uploaded_file.id, uploaded_file),


  //role
  getRoleList: () => ReqExec.get(endpoints.rest.role, null, true),
  postRole: (role) => ReqExec.post(endpoints.function_end.insert_roles, role),
  putRole: (roleid, role) => ReqExec.put(endpoints.rest.role, roleid, role),
  deleteRole: (role) => ReqExec.put(endpoints.procedure.role, role.roleid, role),
  //globalPermission
  getGlobalPermissionList: () => ReqExec.get(endpoints.rest.globalPermission, null, true),
  postGlobalPermission: (globalPermission) => ReqExec.post(endpoints.rest.globalPermission, globalPermission),
  putGlobalPermission: (permissionid, globalPermission) => ReqExec.put(endpoints.rest.globalPermission, permissionid, globalPermission),
  deleteGlobalPermission: (globalPermission) => ReqExec.put(endpoints.procedure.globalPermission, globalPermission.permissionid, globalPermission),
  //functionUser
  getFunctionUserList: () => ReqExec.get(endpoints.rest.functionUser, null, true),
  postFunctionUser: (functionUser) => ReqExec.post(endpoints.directLinks.createFunction, functionUser),
  putFunctionUser: (id, functionUser) => ReqExec.put(endpoints.directLinks.updateFunctionFromSql, id, functionUser),
  deleteFunctionUser: (functionUser) => ReqExec.put(endpoints.procedure.deleteFunctionUser, functionUser, functionUser),
  //procedureUser
  getProcedureUserList: () => ReqExec.get(endpoints.rest.procedureUser, null, true),
  postProcedureUser: (procedureUser) => ReqExec.post(endpoints.directLinks.createProcedure, procedureUser),
  putProcedureUser: (id, procedureUser) => ReqExec.put(endpoints.directLinks.updateProcedureFromSql, id, procedureUser),
  deleteProcedureUser: (procedureUser) => ReqExec.put(endpoints.procedure.deleteProcedureUser, procedureUser, procedureUser),
  //tableUser
  getTableUserList: () => ReqExec.get(endpoints.rest.tableUser, null, true),
  postTableUser: (tableUser) => ReqExec.post(endpoints.directLinks.createTable, tableUser),
  putTableUser: (id, tableUser) => ReqExec.put(endpoints.directLinks.updateTableFromSql, id, tableUser),
  deleteTableUser: (tableUser) => ReqExec.put(endpoints.table.deleteTableUser, tableUser, tableUser),
  //triggerUser
  getTriggerUserList: () => ReqExec.get(endpoints.rest.triggerUser, null, true),
  postTriggerUser: (triggerUser) => ReqExec.post(endpoints.directLinks.createTrigger, triggerUser),
  putTriggerUser: (id, triggerUser) => ReqExec.put(endpoints.directLinks.updateTriggerFromSql, id, triggerUser),
  deleteTriggerUser: (triggerUser) => ReqExec.put(endpoints.trigger.deleteTriggerUser, triggerUser, triggerUser),
  //user
  getUserList: () => ReqExec.get(endpoints.rest.user, null, true),
  postUser: (user) => ReqExec.post(endpoints.directLinks.registerUser, user),
  putUser: (id, user) => ReqExec.put(endpoints.directLinks.updateUser, id, user),
  deleteUser: (user) => ReqExec.put(endpoints.procedure.user, user.id, user),
  //userRole
  getUserRoleList: () => ReqExec.get(endpoints.rest.userRole, null, true),
  postUserRole: (userRole) => ReqExec.post(endpoints.rest.userRole, userRole),
  deleteUserRole: (userRole) => ReqExec.put(endpoints.procedure.deleteUserRoleByUserId, userRole.id, userRole),
  //permission
  getPermissionList: () => ReqExec.get(endpoints.rest.permission, null, true),
  postPermission: (permission) => ReqExec.post(endpoints.rest.permission, permission),
  deletePermission: (permission) => ReqExec.put(endpoints.rest.permission, permission, permission),

};
