export class UserModel{
    username?: String;
    password?: String;
    role?: number;
    isLogged: Boolean = false;
    token?: String;
}