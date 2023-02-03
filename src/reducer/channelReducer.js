import { types } from '../types/types';

let originals = []

export const channelReducer = (state = [], action) => {
    switch (action.type) {
        case types.loadChannels:
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
            console.log("SE LLAMO AL STORE ---------------------- payload " + JSON.stringify(action.payload))
            let salida = state.map(channel => {
                if (channel._id === action.payload.channel) {
                    return {
                        ...channel,
                        messages: [...channel.messages, action.payload.msg]
                    }
                } else {
                    return channel
                }
            })
            return salida
        case types.membersToChannel:
            return state.map(channel => {
                if (channel._id === action.payload.channel) {
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