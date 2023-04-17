import React, { useState } from "react";
import MessageList from './MessageList'

function NewMessage({handleAddMessage, message}) {
    const [body, setBody] = useState("")
    const {id, from_user_id, text, created_at: createdAt}= message

    function handleSubmit(e) {
        e.preventDefault()
    }

    fetch("/messages", {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from_user_id: from_user_id,
            text: text,
        }),
    })
    .then((r) => r.json())
    .then((newMessage) => {
        handleAddMessage(newMessage)
        setBody("")
    }, []);

return(
    <>
    <form>
        <input
        type="text"
        name="text"
        value={text}
        onChange={(e) => setBody(e.target.value)} />
        <button type ="submit">Send</button>
    </form>
    </>
)
}

export default NewMessage