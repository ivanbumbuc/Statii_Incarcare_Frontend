interface IUser{
    id:string;
    isAdmin:boolean;
}

type UserState = {
    user:IUser;
}

type UserAction = {
    type: string;
    data: IUser;
}

type ActionTypeUser = UserAction;
type DispatchUserType = (args: ActionTypeUser) => ActionTypeUser;