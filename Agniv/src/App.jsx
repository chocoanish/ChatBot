import React from 'react'
import Dashboard from './Pages/Dashboard/Dashboard'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css'
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import OnBoardingForm from './Pages/OnBoardingForm/OnBoardingForm'
import { UserProvider } from '../src/context/userId';


const App = () => {
  const router = createBrowserRouter([
    {
      path: "",
      children:[
        {
          path: "/signup",
          element: <Signup button_text="Sign Up"/>,

        },
        {
          path: "/login",
          element: <Login button_text="Log In"/>,
        },
        {
          path: "/dashboard",
          element: <Dashboard />
        },
        {
          path: "",
          element: <Home />
        },
        {
          path: "/onboard",
          element: <OnBoardingForm/>
        }
      ]
    }
  ])
  return (
    <>
    <UserProvider>
    <RouterProvider router={router} />
    {/* <Dashboard/> */}
    </UserProvider>
    
    </>
  )
}

export default App