import React, { useState } from 'react'
import './Sidebar.css'
import hamMenu from '../../assets/menu.svg'
import { Plus } from 'lucide-react';
import Logo from '../../assets/Logo.png'
import ChatItem from '../ChatItem/ChatItem';


const Sidebar = () => {

  const [sidebar, setbar] = useState(true);
  const [addButton, setAddButton] = useState(true);
  const showsidebar = () => {
    setbar(!sidebar)
    setAddButton(!addButton)
  };

  return (
    <>
      <div className={sidebar? "sidebar":"sidebar close"}>
        <div className='ham-menu' onClick={showsidebar} ><img src={hamMenu}/></div>
      <div className={addButton? "addNoteSection": "addNoteSection addNoteSectionClose"}>
        <img src={Logo}/>
        <div className='add'><Plus/></div>
      </div>
      <div className='chats'>
        <div>All Chats</div>
        <ChatItem title="Chat-1"/>
      </div>
      </div>
    </>
  );
};

export default Sidebar