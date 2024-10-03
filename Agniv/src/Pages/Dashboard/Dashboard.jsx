import React, { useContext, useState } from 'react';
import './Dashboard.css'
import { ArrowUp, Paperclip } from "lucide-react";
import Logo from "../../assets/Logo.png";
import hamMenu from '../../assets/menu.svg'
import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import Messages from '../../Components/Messages/Messages';
import axios from 'axios'
import { useUser } from '../../context/userId';


const Dashboard = ({ name, role }) => {

  const { user_Id } = useUser();

  console.log({user_Id});

  // Local Storage
  const fn = localStorage.getItem("User_Data");
  const parsedData = JSON.parse(fn);
  const fname = parsedData.firstName;


  // States for Queries
  const [query, setQuery] = useState("");
  const [queryResponse, setQueryResponse] = useState("");
  const [User_Id, setUser_Id] = useState("");
  // Queries


  const handleChange = (e) => {
    const { value } = e.target;;
    setQuery(value);
    console.log(value);
  };

  const handleQuery = async (e) => {
    e.preventDefault();
    const encodedQuery = encodeURIComponent(query);
    const token = localStorage.getItem("Bearer_Token");
    try {
      const userId = localStorage.getItem("id");
      const response = await axios.get(
        `https://philosophical-karlene-garibrath-9eb650cd.koyeb.app/chat/query?query=${encodedQuery}&`+userId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQueryResponse(response.data);
      
    } catch (error) {
      console.error(
        "Query error:",
        error.response ? error.response.data : error.message
      );
      setQueryResponse("Error occurred while processing your query.");
    }
  };

  //



  // Storage clear on LogOut
  const clearLocalStorage = (()=>{
    localStorage.clear();
  })
  //


  return (
    <>
    {/* Sidebar */}
      <div className='dashboard'>
      <div className="sidebar">
      <div>
        <div className='ham-menu'><img src={hamMenu}/></div>
        <Link to="/login" onClick={clearLocalStorage} className='logout'>
          <LogOut/>
        </Link>
        </div>
      </div>
      {/* Chat */}
        <div className="chat_container">
        <div className="Chat_Nav">
          <img src={Logo} />
          <div>
            <div>
              <div className="profile_name">{name}</div>
              <div className="profile_role">{role}</div>
            </div>
            <div className="profile-circle" ></div>
          </div>
        </div>
        <div className="conversations_box">
          <div className="conversations">
          <div className='chit_chat'>Hi! {fname}</div>
          <Messages response = {queryResponse}/>
          </div>
          <div className="Query_Box">
            {/* <div>
              <Paperclip />
            </div> */}
            <input name='query' type="text" value={query} onChange={handleChange} required />
            <button className="circle" onClick={handleQuery}>
              <ArrowUp />
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Dashboard