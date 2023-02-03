import { useDispatch } from 'react-redux';
import { startAddChannel } from '../actions/channel';
import {store} from '../store/store.js';
import React, { useEffect, useState } from 'react';

export const NewChannel = ({setOtro}) => {
    let [user, _] = useState(store.getState().info);
    let name = undefined;
    let description = undefined;
    const dispatch = useDispatch();

    useEffect(() => {
        name = document.querySelector(".nombrec");
        description = document.querySelector(".descrc");
    }, []);

    const crearCanal =()=>{
        dispatch( startAddChannel({name: name.value.toUpperCase(), description: description.value, admin: user._id}))
        setOtro(false);
    }

    return (
        <div className="newc">
            <button onClick={()=>{
        setOtro(false);
    }} className="btn-cerrar">x</button>
            <p>NEW CHANNEL</p>
            <input placeholder="Channel name" className='nombrec'></input>
            <textarea placeholder="Channel Description" className='descrc'></textarea>
            <button className="save" onClick={crearCanal}>Save</button>
        </div>
    )
}