import Wrapper from '../assets/wrappers/Dashboard'
import { Outlet,redirect, useLoaderData, useNavigate } from 'react-router-dom'
import { BigSidebar, Navbar, SmallSidebar } from '../components'
import React, { createContext, useContext, useEffect } from 'react';
import { checkDefaultTheme } from '../utils/DefaultTheme';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const loader = async () =>{
 try {
  const {data} = await customFetch.get('/users/current-user');
  console.log(data)
  return data;
 } catch (error) {
  console.log(error)
  return redirect('/')
 }
}

const DashboardContext = createContext()

const DashboardLayout = () => {

  const {user} = useLoaderData();
const navigate = useNavigate();
const [headText,setHeadText] = React.useState(localStorage.getItem("mainHead"))
 // This will log "admin" to the console

const [showSidebar,setShowSidebar] = React.useState(false);
const [isDarkTheme,setIsDarkTheme] = React.useState(checkDefaultTheme());


useEffect(()=>{
  const urlParts = window.location.pathname.split("/");
const adminName = urlParts[2]; // "admin" will be at index 2
console.log(adminName);
adminName? localStorage.setItem("mainHead",adminName) : localStorage.setItem('mainHead', "Dashboard");
},[])
const toggleDarkTheme = () =>{
  const newDarkTheme = !isDarkTheme;
  setIsDarkTheme(newDarkTheme);
  document.body.classList.toggle('dark-theme',newDarkTheme)
localStorage.setItem('darkTheme',newDarkTheme)
}

const toggleSidebar = () => {
  setShowSidebar(!showSidebar);
}

const onHeadText = (text) => {
console.log(text,"here we are")
  setHeadText(text)
  localStorage.setItem("mainHead",text)
  localStorage.setItem('adminHead', "Manage-Users")
}

const logoutUser = async () =>{
navigate('/');
await customFetch.get('/auth/logout')
toast.success('Logout Successful.')
};
  return (
    <DashboardContext.Provider value={{user,showSidebar,isDarkTheme,onHeadText,toggleDarkTheme,toggleSidebar,logoutUser,headText}}>
    <Wrapper>
      <main className='dashboard'>
        <SmallSidebar/>
        <BigSidebar/>
        <div>
          <Navbar/>
       <div className='dashboard-page'>
      <Outlet context={{user}} />   
        </div>   
        </div>
      </main>
      </Wrapper>
      </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout