import React, { createContext, useContext, useEffect, useState } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import {AdminNav, Forbidden} from '../components'
import Error from './Error'


const AdminContext = createContext()

const Admin = () => {


  const {user,updateHead} = useOutletContext();
  const [text,setText] = useState(localStorage.getItem("adminHead"))

  useEffect(()=>{
    const urlParts = window.location.pathname.split("/");
  const adminName = urlParts[3]; // "admin" will be at index 2
  console.log(adminName);
  adminName? localStorage.setItem("adminHead",adminName) : localStorage.setItem('adminHead', "Manage-Users")
  setText(adminName? adminName : "Manage Users")
  })
  const handleClick = (text) =>{
    // setText(text)
    // localStorage.setItem("adminHead",text)
  }
  console.log(user.role)
  return (
    <AdminContext.Provider value={{user}}>
   {user.role === "admin"? <Wrapper>
        <AdminNav onClick={handleClick}/>
    <main className='dashboard'>
    <div className='admin-page'>
      <div>
        <h3>{text}</h3>
        <br/>
   
    <Outlet  context={{user}}/>   
      </div>   
      </div>
    </main>
    </Wrapper> : <Forbidden/>} 
   </AdminContext.Provider>
  )
}

export const useAdminContext = () => useContext(AdminContext)

export default Admin