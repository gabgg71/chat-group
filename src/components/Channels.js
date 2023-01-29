import React, {useState, useContext, useEffect} from 'react';
import { userContext } from '../hooks/userContext';
import {store} from '../store/store.js';
import { useNavigate } from 'react-router-dom';
import { fetchSinToken } from '../helpers/fetch';
import { NewChannel } from './NewChannel';
import { startNewMember } from '../actions/channel';
import { useDispatch } from 'react-redux';

export const Channels = ({focusCh, setFocus}) => {
    let [channels, setChannels] = useState(store.getState().channel);
    let [escuchando, setEscucho] = useState([]);
    const {socket} = useContext(userContext);
    const [open, setOpen] = useState(false);
    let [user, _] = useState(store.getState().info);
    const [otroCanal, setOtro] = useState(false);
    const dispatch = useDispatch();
    let originalC = store.getState().channel;
    const navigate = useNavigate();

    useEffect(() => {
        setFocus(channels.filter(channel => channel.name === "WELCOME"));
        
        setChannels(store.getState().channel);
        
        const uns = store.subscribe(() => {
            setChannels({
              channels: store.getState().channel
            });
          });
        return () => {
        uns();
        };
    }, []);


    

    
    

    

    

    const entrarCanal =async(canal)=>{
        setFocus(canal);
        if(!user.channels.includes(canal._id)){
            let respuesta = await fetchSinToken(`channel/add`, {channel: canal._id, user: user._id}, 'PUT')
            let body = await respuesta.json();
            if(body.ok){
                dispatch(startNewMember(canal._id, {name: user.name, img: user.img}));
            }
        }
        if(!escuchando.includes(canal._id)){
            socket.emit('unirse', {id:`channel${canal._id}`, info:{
                name: user.name,
                img: user.img
            }});
        }
    }
    
    const busca=(e)=>{
        setChannels(originalC.filter((canal)=>{
            return canal.name.toUpperCase().includes(e.target.value.toUpperCase())
        }))
    }

    

    return (
        <>
        {otroCanal && <NewChannel setOtro={setOtro}/>}
        <div className="channels">
        <div className="cha">
            <p>Channels</p>
            <button className="create mas" onClick={()=>{
                setOtro(true);
                }}>
            <span class="material-icons">
            add
            </span>
            </button>
        </div>
        <input className="buscar" placeholder="Search" onChange={busca}></input>
        <div className='cha visualizar'>
            <button onClick={()=>{
                setChannels(originalC);
            }}>Todos los canales</button>
            <button onClick={()=>{
                setChannels(
                    user.channels.map((id)=>{
                        return originalC.find((canal)=>{
                            return canal._id === id
                        })
                    })
                )
            }}>Canales a los que pertenezco</button>
        </div>
        <div className="nombre-c">
            {(channels.channels)?(channels.channels.map((canal, index)=>{
                
                return(
                    <div className="canal" key={index} onClick={()=>{entrarCanal(canal)}}>
                        <div className="short">
                            <p className='inic'>{canal.name.substr(0,2).toUpperCase()}</p>
                        </div>
                        <p>{canal.name}</p>
                    </div>
                )
            })):(channels.map((canal, index)=>{
                
                return(
                    <div className="canal" key={index} onClick={()=>{entrarCanal(canal)}}>
                        <div className="short">
                            <p className='inic'>{canal.name.substr(0,2).toUpperCase()}</p>
                        </div>
                        <p>{canal.name}</p>
                    </div>
                )
            }))}
        </div>
    </div>
    {open && (
        <div className="options2">
          <button className="inline" onClick={()=>{navigate("/profile", {replace:true})}}>
          <span class="material-icons">account_circle</span>
          <p>
            My profile
          </p>
          </button>
          <button className="inline">
          <span class="material-icons material-symbols-outlined">
          landscape
          </span>
          <p>
            Tweeter
          </p>
          </button>
          <p className='line'>________________</p>
          <button className="inline red" onClick={()=>{window.location.href = "/";}}>
          <span class="material-icons">logout</span>
          <p>
            Logout
          </p>
          </button>
        </div>
      )}
      <div className='down'>
                    <img src={user.img} className='show'></img>
                    <p>{user.name}</p>
                    <button className='create' onClick={()=>{setOpen(!open)}}>
                        <span class="material-icons material-symbols-outlined">
arrow_drop_down
</span></button>

            </div>
      </>
    )

}