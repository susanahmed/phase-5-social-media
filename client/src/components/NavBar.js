import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { BsFillPersonFill, BsBellFill } from 'react-icons/bs'
import { BiMessageAltDetail, BiSearchAlt } from 'react-icons/bi'
import './NavBar.css'
import {RiLogoutBoxRFill} from 'react-icons/ri'
import {FaUserFriends} from 'react-icons/fa'
import Profile from './Profile'
import Users from './Users'
import Searchbar from './Searchbar'

function Navigation({user, setUser, handleChange}) {

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

    return(
        <>
        <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo"><Link to = '/home'>TECHBOOK</Link></span>
      </div>
      <div className="topbarCenter">
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink"><Link to='/profile'>Profile</Link></span>
          <span className="topbarLink"><Link to='/feed'>Timeline</Link></span>
        </div>
        <div className="topbarIcons">
          <Link to='/users'>
          <div className="topbarIconItem">
            <FaUserFriends />
          </div>
          </Link>
          <Link to='/comments'>
          <div className="topbarIconItem">
            <BiMessageAltDetail /> 
          </div>
          </Link>
          <div className="topbarIconItem">
            <BsBellFill />
          </div>
        </div>
        <Link to= './profile'><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" alt="" className="topbarImg"/>
      </Link>
      </div>
      <div className="topbarIconItem">
      <RiLogoutBoxRFill onClick={handleLogoutClick}/>
      </div>
       
    </div>
        </>
    )
}
export default Navigation;

