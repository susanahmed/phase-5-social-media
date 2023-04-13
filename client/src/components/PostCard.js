import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './PostCard.css'
import { Icon, Button } from "semantic-ui-react"



function PostCard({post, updatePost}) {
    const {id, title, description, file, likes} = post
    const [refresh, setRefresh] = useState(false)
    const [likesCount, setLikesCount] = useState(post.likes)


    function handleDelete(id) {
      fetch(`/posts/${id}`, {
      method: 'DELETE',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json', }
      })
      .then(() => setRefresh(!refresh))
    }
    
    return (
      <div id={id} className = 'post'>
        <div className = 'postWrapper'>
            <div className = 'postTop'>
                <div className = 'postTopLeft'>
                  <span className="postDate">{post.created_at}</span>
        <Link to={`/posts/${id}`}> 
            <h3>Title: {post.title}</h3>
            <h2>Description: {post.description}</h2>  
            <img src= {post.file} className="postImg"/>
            <h4>Likes: {likesCount}</h4>
        </Link>
          <div className="postBottom">
            <div className="postBottomLeft">
              <Button icon onClick={() => setLikesCount
              (likesCount + 1)}>
              <Icon name= 'heart' size='small' />
              </Button>
              <Link to={`posts/${post.id}/edit`}> 
          <Button icon >
            <Icon name='edit' size="small" />
          </Button>
                </Link>
          <Button icon onClick={() => handleDelete(post.id)}>
              <Icon name='trash alternate' size="small" />
          </Button>
          <Link to= '/comments'> 
          <Button icon >
            <Icon name='comments' size="small" />
          </Button>
                </Link>
       </div>
       <div className="postBottomRight">
       </div>
        </div>
        </div>
      </div>
     </div>
     </div>
    )
  }
  
  export default PostCard
