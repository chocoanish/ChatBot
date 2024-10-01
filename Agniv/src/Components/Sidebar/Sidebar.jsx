import React, { useState } from 'react'
import './Sidebar.css'
import hamMenu from '../../assets/menu.svg'
import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';


const Sidebar = () => {

  const [sidebar, setbar] = useState(true);
  const [addButton, setAddButton] = useState(true);
  const showsidebar = () => {
    setbar(!sidebar)
    setAddButton(!addButton)
  };

  return (
    <>
      <div className="sidebar">
      <div>
        <div className='ham-menu' onClick={showsidebar} ><img src={hamMenu}/></div>
        <Link to="/login" className='logout'>
          <LogOut/>
        </Link>
        </div>
      </div>
      
    </>
  );
};

export default Sidebar