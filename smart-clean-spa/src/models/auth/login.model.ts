
export class LoginModel {
    constructor(username, password, rememberMe) {
        this.username = username;
        this.password = password;
        this.rememberMe = rememberMe;
    }

    public username: string;
    public password: string;
    public token?: string;
    public rememberMe: boolean;
}
