import { types } from '../types/types';

const channels = []

export const channelReducer = ( state = channels, action ) => {
    switch ( action.type ) {
        case types.createChannel:
            return [
                ...state,
                action.payload
            ]
        case types.deleteChannel:
            return state.filter(channel => channel.id !== action.payload)
        default:
            return state;
    }

}