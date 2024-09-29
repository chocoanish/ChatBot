import React from 'react'
import { ArrowUp, Paperclip } from 'lucide-react';
import './Chat.css'
import Messages from '../Messages/Messages';
import { useState } from 'react';


const Chat = ({name}) => {
    return (
      <>
        <div className='chat_container'>
            <div className='Chat_Nav'>
              <div className='profile_name'>{name}</div>
              <div className='profile-circle'></div>
            </div>
            <div className='conversations_box'>
              <div className='conversations'>
              {/* Messages */}
                <Messages/>
                {/*  */}
              </div>
              <div className='Query_Box'>
                <div><Paperclip/></div>
                <input type="text" value="" required/>
                <div className='circle' ><ArrowUp/></div>
              </div>
            </div>
        </div>
      </>
    );
  };

export default Chat