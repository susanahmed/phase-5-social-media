import React, {useState, useContext} from 'react'
import "./Sidebar.css"
import Users from './Users'
import UserDisplay from './UserDisplay'
import {AddContext} from './Profile'


function Sidebar({users, handleAddClick}){
    const friendsCount = useContext(AddContext)

    return (
        <>
        <div className="sidebar" >
            <h3>Suggested Friends</h3>
            <br />
        <ul className="sidebarFriendList">
            <Users user={users} friendsCount={friendsCount} handleAddClick={handleAddClick}/>
        </ul>
        </div>
        </>


    )
}
export default Sidebar