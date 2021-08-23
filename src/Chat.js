import { IconButton } from "@material-ui/core";
import { Mic } from "@material-ui/icons";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./chat.css";
import { selectChatId, selectChatName } from "./features/chatSlice";
import { selectUser } from "./features/userSlice";
import FlipMove from "react-flip-move";
import db from "./firebase";
import Message from "./Message";
const Chat = () => {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          // TODO:create a return statement
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatId]);
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("chats").doc(chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <h4>
          To <span className="chat__name">{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>
      <div className="chat__message">
        
          {messages.map(({ id, data }) => (
            <Message key={id} contents={data} />
          ))}
       
      </div>
      <div className="chat__input">
        <form>
          <input
            type="text"
            placeholder="iMessage"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />
          <button onClick={sendMessage}>Send Message</button>
        </form>
        <IconButton>
          <Mic className="chat__mic" />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
