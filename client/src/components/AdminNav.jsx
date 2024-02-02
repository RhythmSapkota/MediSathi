import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout";
import LogoutContainer from "./LogoutContainer";
import ThemeToggle from "./ThemeToggle";
import { adminLinks } from "../utils/links";
import { NavLink } from "react-router-dom";

const AdminNav = ({onClick}) => {
  const { toggleSidebar } = useDashboardContext();
  const handleClick = (text) =>{
    console.log(text)
    onClick(text)
  }
  return (
    <Wrapper style={{height: "40px",width:"100%", position: "inherit",  pointerEvents:"auto"}}>
      <div className="admin-nav">
 {adminLinks.map((link)=>{
            const { text, path, icon } = link;
            return (
              <NavLink
                to={path}
                key={text}
                className="links"
                onClick={()=>handleClick(text)}
                end
              >
                <span className="icon">{icon}</span>
                {text}
              </NavLink>
            );
           })} 
      </div>
    </Wrapper>
  );
};

export default AdminNav;
