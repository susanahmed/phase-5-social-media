import {useParams, useHistory} from 'react-router-dom'
import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import PostCard from './PostCard'
import EditPostForm from './EditPostForm'
import './PostDetail.css'

function PostDetail({updatePost}){
  const [post, setPost]= useState([])
  const [error, setError] = useState(null)


  const params = useParams()

  const history = useHistory()

  useEffect(() =>{
    fetch(`/posts/${params.id}`)
    .then(res => {
      if(res.ok){
        res.json().then(data=> setPost(data))
      } else {
        console.log("ERROR")
      }
    })
  },[])

  const {id, title, description, file, comments} = post
  if (error) return <h2> {error} </h2>
  return (
    <>
    <div id ={id}>
      <EditPostForm updatePost= {updatePost}/>
      <br />
      <br />
      <div id ={id} className='post'>
      <h5 className= 'postDetail'>Title: {title}</h5>
      <h4 className= 'postDetail'>Description: {description}</h4>
      <img className='postImg' src = {file} />
      <br />
    </div>
    </div>
    </>
  )
}

export default PostDetail
