import * as actionTypes from './actionTypes';

const initialState: StatieState = {
    statie:{name:''} as IStatie
};

const statieReducer = (state: StatieState = initialState, action: ActionTypeStatie): StatieState => {
    switch (action.type) {
        case actionTypes.ADD_STATIE:
            return {
                statie: action.data as IStatie,
            }
        default:
            return state;
    }
}



export default statieReducer;
