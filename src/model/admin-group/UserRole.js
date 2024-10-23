export default class UserRole {
    userroleid;
    userid;
    roleid;

    constructor(userRole) {
        this.userroleid = userRole?.userroleid ?? null;
        this.userid = userRole?.userid ?? null;
        this.roleid = userRole?.roleid ?? null;
    }

    // Example method to get the user associated with this UserRole
    getUser() {
        //return userStore.userMap[this.userid] || null;
    }

    // Example method to get the role associated with this UserRole
    getRole() {
        //return roleStore.roleMap[this.roleid] || null;
    }


}
