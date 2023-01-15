import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';

export const startLogin = ( email, password ) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken('auth', { email, password }, 'POST' );
        const body = await resp.json();
        if( body.ok ) {
            dispatch( loadDataS(
                body.user
                ) )
            return dispatch( login({
            uid: body.uid,
            token: body.token,
            token_init_date: new Date().getTime()
            }))
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
        

    }
}

export const startLoginGoogle = ( user, uid, token) => {
    return async( dispatch ) => {
            dispatch( loadDataS(
                user
                ) )
            return dispatch( login({
            uid,
            token,
            token_init_date: new Date().getTime()
            }))

    }
}

export const startRegisterGoogle = (user, uid, token ) => {
    return async( dispatch ) => {
        dispatch( loadDataS(
            user
            ) )
            dispatch( login({
                uid,
                token,
                token_init_date: new Date().getTime()
            }) )
    }
}

export const startRegister = ( email, password, name ) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken( 'auth/new', { email, password, name }, 'POST' );
        const body = await resp.json();
        if( body.ok ) {
            dispatch( loadDataS(
                {email, 
                img: process.env.REACT_APP_PREDEFINED}
            ) )
            return dispatch( login({
                uid: body.uid,
                token: body.token,
                token_init_date: new Date().getTime()
            }) )
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startLogout = () => {
    return ( dispatch ) => {
        dispatch( logout() );
    }
}

const logout = () => ({ type: types.authLogout })

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

export const loadDataS = ( user ) => ({
    type: types.loadData,
    payload: user
});
