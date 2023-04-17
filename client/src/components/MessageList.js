
import React from "react";
import Messages from "./Messages";
import NewMessage from "./NewMessage";

function MessageList({messages}) {

console.log(messages)
    const {id, from_user_id, text, created_at: createdAt}= messages

  return (
    <div className="list">
      <ul>
        {messages.map((message) => (
          <Messages
            key={message.id}
            message={message}
            from_user_id={from_user_id}
          />     
        ))}
      </ul>
    </div>
  );
}

export default MessageList;