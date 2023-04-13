import React, {useState, useEffect} from 'react'
import CommentDisplay from './CommentDisplay'
import CommentForm from './CommentForm'


function Comments({addComment}){
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetch('/comments')
        .then(r => r.json())
        .then(data => setComments(data))
    },[])

    return (
        <div >
            <CommentForm />
        {comments?.map(comment => <CommentDisplay key={comment.id}  comment={comment}/>)}
</div>

    )
}

export default Comments