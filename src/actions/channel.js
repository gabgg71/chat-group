import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startLoadChannel = (data) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken('channel');
        const body = await resp.json();
        console.log(`estos son canales ${JSON.stringify(body)}`)
        /*if( body.ok ) {
           
            return dispatch( login({
            uid: body.uid,
            token: body.token,
            token_init_date: new Date().getTime()
            }))
        } else {
            Swal.fire('Error', body.msg, 'error');
        }*/
    }
}

export const startAddChannel = (data) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken('channel/create', data, 'POST' );
        const body = await resp.json();
        console.log(JSON.stringify(body))
        /*if( body.ok ) {
           
            return dispatch( login({
            uid: body.uid,
            token: body.token,
            token_init_date: new Date().getTime()
            }))
        } else {
            Swal.fire('Error', body.msg, 'error');
        }*/
    }
}

export const DeleteChannel = (data) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken('channel/delete', data, 'DELETE' );
        const body = await resp.json();
        console.log(JSON.stringify(body))
    }
}