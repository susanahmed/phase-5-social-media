import React, {useState} from 'react'
import Comments from './Comments'
import { Icon, Button } from "semantic-ui-react"

function CommentDisplay({comment}){
    const {id} = comment
    const [refresh, setRefresh] = useState()
    const [likesCount, setLikesCount] = useState(0)

function handleDeleteComment(id) {
    fetch(`/comments/${id}`, {
    method: 'DELETE',
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json', }
    })
    .then(() => setRefresh(!refresh))
}

    return(
        <>
        <h3>{comment.user_id} says: </h3>
        <h1>{comment.comment}</h1>
        <h4>Like: {likesCount}</h4>
        <Button icon onClick={() => handleDeleteComment(id)}>
              <Icon name='trash alternate' size="small" />
          </Button>       
          <Button icon onClick={() => setLikesCount
              (likesCount + 1)}>
              <Icon name= 'heart' size='small' />
              </Button>
        </>
    )
}
export default CommentDisplay