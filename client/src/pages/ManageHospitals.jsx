import React from 'react'
import HositalTable from '../components/HospitalTable'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { useLoaderData } from 'react-router-dom'
import { useDashboardContext } from './DashboardLayout'
import Error from './Error'


export const loader = async() =>{
    try {
        const {data} = await customFetch.get("/hospitals")
        return data
    } catch (error) {
        console.log("assadasd")
        toast.error("Error Loading Hospitals")
    }
  
}

const ManageHospitals = () => {
    const {hospitals} = useLoaderData();
    const {user} = useDashboardContext();
    console.log(user)
    if (user.role !== "admin"){
        console.log("notAdmin")
        return <Error/>
    }
    console.log(hospitals)
  return (
    <div>
      <HositalTable hospitals={hospitals}/>  
    </div>
  )
}

export default ManageHospitals