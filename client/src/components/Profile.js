import './Profile.css'
import PostCont from './PostCont'
import PostForm from './PostForm'
import {useState, useEffect} from "react"

function Profile({posts, addPost, user, setUser}) {
  console.log(user)
  const [toggle, setToggle] = useState(false)
  // const {id, username, image_url, bio} = user

  const handleClick = () => {
    setToggle(!toggle);
  };
    return (
        <>
        <div className="profile">
        {/* <Sidebar /> */}
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
            </div>
          </div>
          {/* <div className="profileRightBottom"> */}
            {/* <Feed /> */}
            {/* <Rightbar profile/> */}
            {/* <PostCont /> */}
            <PostForm />
            <div>
              <PostCont posts={posts} addPost={addPost}/>
            </div>
            
          {/* </div> */}
        </div>
      </div>

        
        </>
    )
}

export default Profile