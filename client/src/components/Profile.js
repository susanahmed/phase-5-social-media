import './Profile.css'
import PostCont from './PostCont'
import PostForm from './PostForm'
import Users from './Users'
import UserDisplay from './UserDisplay'
import Sidebar from './Sidebar'
import React, {useState, createContext, useContext} from "react"
import {PostContext} from './App'
import {BsPersonFillAdd} from 'react-icons/bs'

export const AddContext = React.createContext()

function Profile({addPost, user, setUser, users, handleDelete}) {
  console.log(user)
  const [toggle, setToggle] = useState(false)
  const [friendsCount, setFriendsCount]= useState(0)
  const posts = useContext(PostContext)


  const handleClick = () => {
    setToggle(!toggle);
  };

  const handleAddClick = () => setFriendsCount(friendsCount + 1)

    return (
        <>
        <AddContext.Provider value={friendsCount}>
          <button> 
          <BsPersonFillAdd onClick = {handleAddClick} />
          </button>
        <div className="profile">
        <Sidebar handleAddClick={handleAddClick}/>
        
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
            <img
                className="profileCoverImg"
                src={user.background_url}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.image_url}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.bio}</span>
                <span className="profileInfoDesc">{user.location}</span>
                <span className="profileInfoDesc">Friends:{friendsCount}</span>
            </div>
          </div>
          <br />
            <PostForm />
            <div>
              <PostCont posts= {posts}addPost={addPost}/>
            </div>
        </div>
      </div>
    </AddContext.Provider>
        
        </>
    )
}

export default Profile