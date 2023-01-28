import { types } from '../types/types';

const channels = []
let originals = []

export const channelReducer = ( state = channels, action ) => {
    switch ( action.type ) {
        case types.loadChannels:
            console.log(`llaman reducer ${action.payload}`)
            originals = action.payload
            return [
                ...state,
                ...action.payload
            ]
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