import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './PostCard.css'
import { Icon, Button } from "semantic-ui-react"


function PostCard({post, updatePost}) {
    const {id, title, description, file, likes} = post
    const [refresh, setRefresh] = useState(false)
    const [likesCount, setLikesCount] = useState(post.likes)
    const [comments, setComments] = useState([])

    useEffect(() => {
      fetch('/comments')
        .then(r => r.json())
        .then(data => setComments(data))
    })

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
            <h2>Description: {post. description}</h2>  
            <h1>{post.file}</h1>
            <h4>Likes: {likesCount}</h4>
            <h4>Comments: {comments}</h4>
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
          <Button icon onClick={() => handleDelete(id)}>
              <Icon name='trash alternate' size="small" />
          </Button>
       </div>
       <div className="postBottomRight">
        <span className="postCommentText">{comments} comments </span>
       </div>
        </div>
        </div>
      </div>
     </div>
     </div>
    )
  }
  
  export default PostCard
