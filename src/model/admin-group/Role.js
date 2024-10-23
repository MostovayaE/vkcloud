export default class Role {
    roleid;
    rolename;

    constructor(role) {
        this.roleid = role?.roleid ?? null;
        this.rolename = role?.rolename ?? null;
    }

    // Optional method to provide display information or manipulate role data.
    get displayRoleName() {
        return this.rolename;
    }

    // You can add more methods if needed, for example, to validate role properties.
    isValidRole() {
        // Add validation logic here, for example, ensuring rolename is not empty
        return this.rolename && this.rolename.trim() !== '';
    }
}
