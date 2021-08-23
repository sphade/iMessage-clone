import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Search, RateReviewOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import db, { auth } from "./firebase";

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);
  useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);
  const addChat = () => {
    const chatName = prompt("please enter a chat name");

    if (chatName) {
      db.collection("chats").add({
        chatName: chatName,
      });
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          onClick={() => auth.signOut()}
          src={user.photo}
          className="sidebar__avatar"
        />
        <div className="sidebar__input">
          <Search />
          <input type="text" placeholder="search" />
        </div>
        <IconButton variant="outlined" className="sidebar__inputButton">
          <RateReviewOutlined onClick={addChat} />
        </IconButton>
      </div>
      <div className="sidebar__chats">
        {chats.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
