import { logInCall } from ".";

export const logIn = (email:string,password:string) => {
    return logInCall('/Login/login',email,password);
}
