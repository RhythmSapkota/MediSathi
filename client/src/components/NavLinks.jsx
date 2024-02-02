import React from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import { NavLink } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { adminLinks, links } from "../utils/links";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user, onHeadText } = useDashboardContext();

  const handleClick = (text) => {
    if (isBigSidebar) {
      onHeadText(text);
    } else {
      onHeadText(text);
      toggleSidebar();
    }
  };

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={() => handleClick(text)}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
      {user.role === "doctor" && (
        <NavLink
          to="daily-sessions"
          key={"today's session"}
          className="nav-link"
          onClick={() => handleClick("Daily-Sessions")}
          end
        >
          <span className="icon">
            <FaTasks />
          </span>
          today's session
        </NavLink>
      )}

      {user.role === "admin" && (
        <NavLink
          to="admin"
          key={"admin"}
          className="nav-link"
          onClick={() => handleClick("Admin")}
          end
        >
          <span className="icon">
            <MdAdminPanelSettings />
          </span>
          admin
        </NavLink>
      )}
    </div>
  );
};

export default NavLinks;
