export default class GlobalPermission {
    permissionid;
    roleid;
    create_table_grant;
    update_table_grant;
    delete_table_grant;
    create_grant;

    constructor(permission) {
        this.permissionid = permission?.permissionid ?? null;
        this.roleid = permission?.roleid ?? null;
        this.create_table_grant = permission?.create_table_grant ?? false;
        this.update_table_grant = permission?.update_table_grant ?? false;
        this.delete_table_grant = permission?.delete_table_grant ?? false;
        this.create_grant = permission?.create_grant ?? false;
    }

    // You can add helper methods here if needed, for example:
    hasFullPermissions() {
        return this.create_table_grant && this.update_table_grant && this.delete_table_grant && this.create_grant;
    }

    hasCreatePermissions() {
        return this.create_table_grant || this.create_grant;
    }
}
