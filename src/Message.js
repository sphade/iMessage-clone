import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./message.css";
const Message = forwardRef(
  (
    { id, contents: { email, uid, displayName, photo, message, timestamp } },
    ref
  ) => {
    const user = useSelector(selectUser);
    
    return (
      <div className={`message ${user.email === email && "message__sender"}`}>
        <Avatar src={photo} className="message__photo" />
        <p>{message}</p>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
      </div>
    );
  }
);
export default Message;
