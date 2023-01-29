import { types } from '../types/types';

const userState = {
    img: " ",
    name:"",
    bio:"",
    phone: "",
    email: "",
    channels: []
}

export const infoReducer = ( state = userState, action ) => {
    switch ( action.type ) {
        case types.loadData:
            return {
                ...state,
                ...action.payload
            }
        case types.newChannel:
            return {
                ...state,
                channels: [...state.channels, action.payload],
            }
        default:
            return state;
    }

}