import { toast } from 'react-toastify';
import { HospitalContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext, useState } from 'react';

export const loader = async () =>{
 try {
  const data = await customFetch.get('/hospitals')

  return {data:data.data};
 } catch (error) {
  const errorMsg = await error.response.data.msg;
  toast.error(errorMsg);
 }
}

const AllHospitalsContext = createContext();

const AllHospitals = () => {
  const {data} = useLoaderData();
  const [showSearch,setShowSearch] = useState(true);

const handleSearch = (val) =>{
setShowSearch(val)

}

  return (<>
  <AllHospitalsContext.Provider value={{data}}>
    <div>
  {showSearch?<SearchContainer/>: null}
  <HospitalContainer showData={handleSearch}/>
  </div>
  </AllHospitalsContext.Provider>
  </>
  )
}

export const useAllHospitalsContext = () => useContext(AllHospitalsContext)

export default AllHospitals;