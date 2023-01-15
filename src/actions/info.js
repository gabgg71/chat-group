import { fetchSinToken } from '../helpers/fetch';
import { loadDataS} from '../actions/auth';
import Swal from 'sweetalert2';


export const setInfo=(user)=>{
    return async( dispatch ) => {
        const resp = await fetchSinToken('edit', user, 'PUT' );
        const body = await resp.json();
        if( body.ok ) {
        return dispatch( loadDataS(user) );
        }else{
            Swal.fire('Error', body.msg, 'error');
        }


    }
}

