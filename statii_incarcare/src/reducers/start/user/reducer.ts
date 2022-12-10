import * as actionTypes from './actionTypes';

const initialState: UserState = {
    user:{id:" ",isAdmin:false} as IUser
};

const userReducer =(state: UserState = initialState, action: ActionTypeUser): UserState => {
    switch (action.type) {
        case actionTypes.ADD_USER:
            return {
                user: action.data as IUser,
            }
        default:
            return state;
    }
}



export default userReducer;