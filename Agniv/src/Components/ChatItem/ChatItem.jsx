import React from 'react'
import { Ellipsis } from 'lucide-react';
import './ChatItem.css'

const ChatItem = ({ title, top = 208 }) => {
    return (
      <>
        <div className='chatbox'>
          <div className='title'>
          {title}
          </div>
          <div className='dots'><Ellipsis/></div>
          <div className='dropdown'></div>
        </div>
      </>
    );
  };

export default ChatItem