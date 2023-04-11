import React, {useState, useEffect} from 'react'
import CommentDisplay from './CommentDisplay'


function Comments(){
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetch('/comments')
        .then(r => r.json())
        .then(data => setComments(data))
    },[])

    return (
        <div >
        {comments?.map(comment => <CommentDisplay key={comment.id}  comment={comment}/>)}
</div>

    )
}

export default Comments