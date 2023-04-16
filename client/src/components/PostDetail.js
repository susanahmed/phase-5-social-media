import {useParams, useHistory} from 'react-router-dom'
import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import PostCard from './PostCard'
import EditPostForm from './EditPostForm'

function PostDetail(){
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
      <EditPostForm />
      <h1>Title: {title}</h1>
      <h2>Description: {description}</h2>
      <img src = {file} />
    </div>
    <ul>
      <li>{comments}</li>
    </ul>
    </>
  )
}

export default PostDetail
