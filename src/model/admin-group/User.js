export default class User {
    id;
    username;
    passwordhash;
    password;
    constructor(user) {
        this.id = user?.id ?? null;
        this.username = user?.username ?? null;
        this.passwordhash = user?.passwordhash ?? null;
        this.password = user?.password ?? null;
    }

    get displayName() {
        // You could include any additional logic here, such as formatting the username
        return this.username;
    }


}
