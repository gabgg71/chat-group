import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';

export const startLoadChannel = (data) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken('channel');
        const body = await resp.json();
        if( body.channels) {
            let canales = body.channels.map(channel => {
                return JSON.parse(JSON.stringify(channel))
            });
            console.log(`CANALES ${canales[0]}`)
            return dispatch( {
                type: types.loadChannels,
                payload: canales
            })
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startNewMember = (channel, user) => {
    return async( dispatch ) => {
            //agregar id del canal a usuario
            dispatch({
                type: types.newChannel,
                payload: channel
            })
            dispatch({
                type: types.membersToChannel,
                payload: {channel, user}
            })
    }
}

export const loadMsg = (channel, msg) => {
    return async( dispatch ) => {
        let respuesta = await fetchSinToken(`channel/msg`, {channel_id: channel, msg}, 'POST')
        let body = await respuesta.json();
        if(body.ok){
            return dispatch({
                type: types.loadMsg,
                payload: {channel, msg}
            })
        }else{
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startAddChannel = (data) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken('channel/create', data, 'POST' );
        const body = await resp.json();
        console.log(JSON.stringify(body))
        if( body.ok ) {
            return dispatch({
                type: types.createChannel,
                payload: JSON.parse(JSON.stringify(body.canal))
            })
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const DeleteChannel = (data) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken('channel/delete', data, 'DELETE' );
        const body = await resp.json();
        console.log(JSON.stringify(body))
    }
}