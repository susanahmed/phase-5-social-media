import './Profile.css'
import PostCont from './PostCont'
import PostForm from './PostForm'
import {useState} from "react"

function Profile({posts}, {addPost}) {
  const [toggle, setToggle] = useState(false)

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
                src="data:image/jpeg;base64,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"
                alt=""
              />
              <img
                className="profileUserImg"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">Susan Ahmed</h4>
                <span className="profileInfoDesc">Hello there!</span>
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