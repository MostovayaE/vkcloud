export default class Permission {
    permissionid;
    roleid;
    tablename;
    operation;

    constructor(permission) {
        this.permissionid = permission?.permissionid ?? null;
        this.roleid = permission?.roleid ?? null;
        this.tablename = permission?.tablename ?? '';
        this.operation = permission?.operation ?? null;
    }
    // You can add helper methods here if needed, for example:
    hasFullPermissions() {
        return this.create_table_grant && this.update_table_grant && this.delete_table_grant && this.create_grant;
    }

    hasCreatePermissions() {
        return this.create_table_grant || this.create_grant;
    }
}
