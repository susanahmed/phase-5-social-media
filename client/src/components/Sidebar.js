import React, {useState} from 'react'
import "./Sidebar.css"
import Users from './Users'
import UserDisplay from './UserDisplay'


function Sidebar({users}){


    return (
        <>
        <div className="sidebar" >
            <h3>Suggested Friends</h3>
            <br />
        <ul className="sidebarFriendList">
            <Users user={users} />
        </ul>
        </div>
        </>


    )
}
export default Sidebar