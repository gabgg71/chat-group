import React, {useState, useContext, useEffect} from 'react';
import {store} from '../store/store.js';
import { useNavigate } from 'react-router-dom';

export const Members = ({channel, setMember}) => {
    let [user, _] = useState(store.getState().info);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <>
        <div className="channels">
        <div className="cha">
            <button className="create" onClick={()=>{
                setMember(false);
                }}>
            <span class="material-icons material-symbols-outlined">
arrow_back_ios
</span>
            </button>
            <p>All Channels</p>
        </div>
        <div className="nombre-c">
            <p className='resalt'>{channel.name}</p>
            <p>{channel.description}</p>
            <p className='resalt'>MEMBERS</p>
            {channel.members.map((member, index) => {
                return (
                    <div className="canal" key={index}>
                        <div className="short">
                        <img src={member.img} className='show'></img>
                        </div>
                        <p>{member.name}</p>
                    </div>
                )
            })}
                   
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