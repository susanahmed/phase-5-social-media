import React, {useState} from 'react'
import {Link} from 'react-router-dom'
// import styled from 'styled-components'
import './PostCard.css'
import { Icon, List, Pagination, Button, Container } from "semantic-ui-react"


function PostCard({post, updatePost, handleDelete}) {
    const {id, file, description} = post
    const [like,setLike] = useState(post.like)
    const [isLiked,setIsLiked] = useState(false)

    const likeHandler=() => {
      setLike(isLiked ? like-1 : like+1)
      setIsLiked(!isLiked)
    }

    return (
      <div id={id} className = 'post'>
        <div className = 'postWrapper'>
            <div className = 'postTop'>
                <div className = 'postTopLeft'>
                  <span className="postDate">{post.created_at}</span>
        <Link to={`/posts/${id}`}> 
            <h2>{file}</h2>
            <h2>{description}</h2>
            <h1>THIS IS THE POST</h1>        
        </Link>
        <Link to={`posts/${post.id}/edit`}> </Link>
          <div className="postBottom">
            <div className="postBottomLeft">
              <Button icon onClick={likeHandler}>
              <Icon name= 'heart' size='small' />
              </Button>
          <Button icon onClick = {() => updatePost={updatePost}}>
            <Icon name='edit' size="small" />
          </Button>
          <Button icon onClick={() => handleDelete={handleDelete}}>
              <Icon name='trash alternate' size="small" />
          </Button>
       </div>
       <div className="postBottomRight">
        <span className="postCommentText">{post.comment} comments </span>
       </div>
        </div>
        </div>
      </div>
     </div>
     </div>
    )
  }
  
  export default PostCard
