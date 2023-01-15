import { types } from '../types/types';

const userState = {
    img: " ",
    name:"",
    bio:"",
    phone: "",
    email: ""
}

export const infoReducer = ( state = userState, action ) => {
    switch ( action.type ) {
        case types.loadData:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }

}