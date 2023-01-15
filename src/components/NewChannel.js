import { useDispatch } from 'react-redux';
import { startAddChannel } from '../actions/channel';
import {store} from '../store/store.js';
import React, { useEffect, useState } from 'react';

export const NewChannel = ({setVent}) => {
    let [user, _] = useState(store.getState().info);
    let name = undefined;
    let description = undefined;
    const dispatch = useDispatch();

    useEffect(() => {
        name = document.querySelector(".nombrec");
        description = document.querySelector(".descrc");
    }, []);

    const crearCanal =()=>{
       dispatch( startAddChannel({name: name.value, description: description.value, admin: user._id}))
       /* let resp= fetchSinToken("create", {name: name.value, description: description.value}, "POST")
        if(resp.ok){
            
        }else{
            Swal.fire('Error', "It was not possible to create the channel", 'error');
        }*/
    }

    return (
        <div className="newc">
            <button onClick={setVent(false)} className="btn-cerrar">x</button>
            <p>NEW CHANNEL</p>
            <input placeholder="Channel name" className='nombrec'></input>
            <textarea placeholder="Channel Description" className='descrc'></textarea>
            <button className="save" onClick={crearCanal}>Save</button>
        </div>
    )
}