import {useParams, useHistory} from 'react-router-dom'
import {useEffect, useState} from 'react'
import './Profile.css'
import PostCont from './PostCont'

function UserProfile({users, posts}) {
console.log(users)
    const [user, setUser]= useState([])
    const [error, setError] = useState(null)
  
  
    const params = useParams()
  
    const history = useHistory()
  
    useEffect(() =>{
      fetch(`/users/${params.id}`)
      .then(res => {
        if(res.ok){
          res.json().then(data=> setUser(data))
        } else {
          console.log("ERROR")
        }
      })
    },[])

    const {id, username, bio} = user

    return (
    <>
    <div className="profile">
        
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
            <img
                className="profileCoverImg"
                src = "https://www.globalfocusmagazine.com/wp-content/uploads/2020/02/Engaging_with_technology-scaled.jpg"
                alt = ""
                />
                <img
                className="profileUserImg"
                src="https://api.dicebear.com/6.x/bottts/svg"
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">BIO: {user.bio}</span>
                <span className="profileInfoDesc">LOCATION: {user.location}</span>
            </div>
            </div>
            <PostCont posts={posts}/>
        </div>
        </div>
    </>
    )
}

export default UserProfile