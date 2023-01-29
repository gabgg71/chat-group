import { types } from '../types/types';

let originals = []

export const channelReducer = ( state = [], action ) => {
    switch ( action.type ) {
        case types.loadChannels:
            console.log(`llaman reducer ${action.payload}`)
            originals = action.payload
            return [
                ...state,
                ...action.payload
            ]
        case types.createChannel:
            return [action.payload, ...state]
        case types.deleteChannel:
            return state.filter(channel => channel._id !== action.payload)
        case types.loadMsg:
            console.log(`llaman reducer ${action.payload}`)
            return state.map(channel => {
                if(channel._id === action.payload.channel){
                    return {
                        ...channel,
                        messages: [...channel.messages, action.payload.msg]
                    }
                } else {
                    return channel
                }
            })
        case types.membersToChannel:
            return state.map(channel => {
                if(channel._id === action.payload.channel){
                    return {
                        ...channel,
                        members: [...channel.members, action.payload.user]
                    }
                } else {
                    return channel
                }
            })
        default:
            return state;
    }

}