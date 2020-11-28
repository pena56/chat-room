import React, { forwardRef } from "react";
import "./Message.css";

const Message = forwardRef(({ userName, message }, ref) => {
  const isUser = userName === message.userName ? true : false;
  return (
    <div
      ref={ref}
      className={`message__card ${
        isUser ? "message__card-user" : "message__card-notuser"
      }`}
    >
      {!isUser ? (
        <p
          className={`message__card-username ${
            isUser && "message__card-isusername"
          }`}
        >
          {message.userName}
        </p>
      ) : (
        ""
      )}
      <p className="message__card-message">{message.message}</p>
    </div>
  );
});

export default Message;
