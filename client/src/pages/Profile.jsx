import React from 'react'
import { Outlet } from 'react-router-dom'
import { ProfileCard } from '../components'


const Profile = () => {
  return (
    <div> 
      <ProfileCard/>
            <Outlet/>  
    </div>
  )
}

export default Profile