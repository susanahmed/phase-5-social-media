import React, {useState, createContext} from 'react'
import './UserDisplay.css'
import {BsPersonFillAdd, BsFillCheckCircleFill} from 'react-icons/bs'


function UserDisplay({user}){
    const [friendsCount, setFriendsCount] = useState(0)


    
    return (
        <>
    <li className="sidebarFriendhr">
        <img className="sidebarFriendImg" src="https://api.dicebear.com/6.x/bottts/svg" alt="" />
        <span className="sidebarFriendName"> {user.username} </span>
        <button>
        <BsPersonFillAdd onClick={() => setFriendsCount
              (friendsCount + 1)}/></button>
    
        <br />
        <span className="sidebarFriendName"> Location: {user.location} </span>
        <br />
        <span className="sidebarFriendName"> Bio: {user.bio} </span>
    </li>
    </>
    )
}

export default UserDisplay