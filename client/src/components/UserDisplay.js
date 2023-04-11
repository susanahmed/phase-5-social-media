import React, {useState} from 'react'
import './UserDisplay.css'
import {BsPersonFillAdd, BsFillCheckCircleFill} from 'react-icons/bs'


function UserDisplay({user}){
    const [friendsCount, setFriendsCount] = useState(0)
    
    return (
        <>
    <li className="sidebarFriendhr">
        <img className="sidebarFriendImg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" alt="" />
        <span className="sidebarFriendName"> {user.username} </span>
        <button>
        <BsPersonFillAdd onClick={() => setFriendsCount
              (friendsCount + 1)}/></button>
        <br />
        <span className="sidebarFriendName"> {user.location} </span>
        <br />
        <span className="sidebarFriendName"> {user.bio} </span>
    </li>
    </>
    )
}

export default UserDisplay