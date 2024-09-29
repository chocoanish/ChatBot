import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Chat from '../../Components/Chat/Chat';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Dashboard.css'


const Dashboard = () => {

  return (
    <>
      <div className='dashboard'>
        <Sidebar/>
        <Chat/>
      </div>
    </>
  );
};

export default Dashboard