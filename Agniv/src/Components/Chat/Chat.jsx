import React from "react";
import { ArrowUp, Paperclip } from "lucide-react";
import "./Chat.css";
import Messages from "../Messages/Messages";
import Logo from "../../assets/Logo.png";

const Chat = ({ name, role }) => {
  return (
    <>
      <div className="chat_container">
        <div className="Chat_Nav">
          <img src={Logo} />
          <div>
            <div>
              <div className="profile_name">John Doe</div>
              <div className="profile_role">Admin</div>
            </div>
            <div className="profile-circle"></div>
          </div>
        </div>
        <div className="conversations_box">
          <div className="conversations">
            {/* Messages */}
            <Messages />
            {/*  */}
          </div>
          <div className="Query_Box">
            <div>
              <Paperclip />
            </div>
            <input type="text" required />
            <div className="circle">
              <ArrowUp />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
