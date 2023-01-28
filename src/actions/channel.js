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

export const startAddChannel = (data) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken('channel/create', data, 'POST' );
        const body = await resp.json();
        console.log(JSON.stringify(body))
        if( body.ok ) {
            return dispatch({
                type: types.createChannel,
                payload: data
            })
        } else {
            Swal.fire('Error', "It was not possible to create this channel", 'error');
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