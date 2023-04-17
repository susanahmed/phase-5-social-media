import {useParams, useHistory} from 'react-router-dom'
import {useEffect, useState} from 'react'
import NewMessage from './NewMessage'
import MessageList from './MessageList'

function MessageDetail(){
    const [message, setMessage]= useState([])
    const [error, setError] = useState(null)


    const params = useParams()

    const history = useHistory()

    useEffect(() =>{
    fetch(`/messages/${params.id}`)
    .then(res => {
        if(res.ok){
        res.json().then(message => setMessage(message))
        } else {
        console.log("ERROR")
        }
    })
    },[])

    const {id, from_user_id, text, created_at: createdAt}= message



    return (
        <>
        {/* <NewMessage /> */}
        <div id={id}>
            <h4>{text}</h4>
        </div>
        </>
    )
}

export default MessageDetail