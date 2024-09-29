import React from 'react'
import Dashboard from './Pages/Dashboard/Dashboard'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css'
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';


const App = () => {
  const router = createBrowserRouter([
    {
      path: "",
      children:[
        {
          path: "/auth/signup",
          element: <Signup />,

        },
        {
          path: "/auth/login",
          element: <Login />,
        },
        {
          path: "/auth/dashboard",
          element: <Dashboard />
        },
        {
          path: "",
          element: <Home />
        }
      ]
    }
  ])
  return (
    <>
    <RouterProvider router={router} />
      {/* <Dashboard/> */}
    </>
  )
}

export default App