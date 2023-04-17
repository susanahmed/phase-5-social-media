import React, { useEffect, useState } from "react";
// import {useParams, useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'

function Messages({message}){
    const [messages, setMessages] = useState([])
    // const params = useParams()

    const {id, from_user_id, text, created_at: createdAt}= message
    const timestamp= new Date(createdAt).toLocaleTimeString()
    

    return (
        <>
        <li>
            <span>{timestamp}</span>
            <br/>
            <span>{from_user_id}</span>
            <Link to = {`/messages/${id}`}>
            <p>{text}</p>
            </Link>
            <br />
        </li>
        
        </>
    )
}

export default Messages