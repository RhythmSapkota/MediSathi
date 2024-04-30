import StatsCard from '../components/statsCard'
import { FaHospitalAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { FaHospitalUser } from "react-icons/fa6";
import LineChart from '../components/lineChart';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
export const loader = async() =>{
  try {
    const {data} = await customFetch.get('/stats/all');
    console.log(data)
    return data;
   } catch (error) {
    console.log(error)
    return error
   }
}

const Stats = () => {
  const data = useLoaderData();
  console.log(data)
const iconsMapper = {
  hospitals: <FaHospitalAlt size={20}/>,
  doctors: <FaUserDoctor size={20}/>,
  bookings: <RiCalendarScheduleLine size={20}/>,
  "patient-checked": <FaHospitalUser size={20}/>
}

  return (
    <>
    <div style={{display:"flex",gap:"2rem"}}>
    {data.statsArr?.map((stats)=>{
    return  <StatsCard key={stats?.id} title={stats?.title} content={stats?.content} footer={stats.footer} icon={iconsMapper[stats.name]} color={stats.color}/>
    })}
    </div>
    <div style={{background: "var(--background-secondary-color)", borderRadius:"1rem", padding:"2rem", marginTop:"4rem"}}>
      <LineChart categoriesData={{data:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]}} seriesData={{name:"Bookings", data:data?.chartData}} title={"Bookings per month"} />
    </div>
    </>
  )
}

export default Stats