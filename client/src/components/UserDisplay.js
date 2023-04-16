import React, {useState, createContext, useContext} from 'react'
import './UserDisplay.css'
import {BsPersonFillAdd, BsFillCheckCircleFill} from 'react-icons/bs'
import {AddContext} from './Profile'
import {Link} from 'react-router-dom'


function UserDisplay({user, handleAddClick}){
    const {id, username, bio, location} = user

    const friendsCount = useContext(AddContext)

    
    return (
        <>
    <li className="sidebarFriendhr">
        <img className="sidebarFriendImg" src="https://api.dicebear.com/6.x/bottts/svg" alt="" />
        <span className="sidebarFriendName"> {user.username} </span>
        <button>
        <BsPersonFillAdd onClick={handleAddClick}/>

        </button>
        {/* <button onClick = {handleAddClick}>Add Friend</button>
     */}
        <br />
        <span className="sidebarFriendName"> Location: {user.location} </span>
        <br />
        <span className="sidebarFriendName"> Bio: {user.bio} </span>
    </li>
    </>
    )
}

export default UserDisplay