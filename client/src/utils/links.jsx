import React from "react";

import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaTasks, FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";



 const links = [
  {
    text: "All Hospitals",
    path: ".",
    icon: <MdQueryStats />,
  },
 

  {
    text: "stats",
    path: "stats",
    icon: <IoBarChartSharp />,
  },
  {
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  }
];



 const adminLinks = [
  {
    text: "Add Hospital",
    path: "add-hospital",
    icon: <FaWpforms />,
  },
  {
    text:"Manage Users",
    path:".",
    icon:<FaWpforms/>
  }
,
{
  text:"Manage Hospitals",
  path:"manage-hospitals",
  icon:<FaWpforms/>
}

]

export {links,adminLinks};