import React, { useState } from 'react';
import styles from './SideBar.module.css';
import { NavLink, Outlet,Link } from 'react-router-dom';
import { BsHouse,BsBoxArrowRight } from 'react-icons/bs';
import { IoIosArrowForward } from "react-icons/io";
import { SiSquarespace } from "react-icons/si";
import { BiTask } from "react-icons/bi";
import { MdOutlinePlayLesson } from "react-icons/md";
import { IoCalendarNumberOutline } from "react-icons/io5";
const SideBar = () => {
  const [isSidebarClosed, setSidebarClosed] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarClosed(!isSidebarClosed);
  };


  const menuItems = [
    { link: "/dashboard/overview", icon: <BsHouse className={styles.icon} />, text: "Dashboard" },
    { link: "/dashboard/plans", icon: <MdOutlinePlayLesson className={styles.icon} />, text: "Plans" },
    { link: "/dashboard/tasks", icon: <BiTask className={styles.icon} />, text: "Tasks" },
    { link: "/dashboard/calendar", icon: <IoCalendarNumberOutline className={styles.icon} />, text: "Calendar" },

  
  ];

  return (
    <div>
      <nav className={`${styles.sidebar} ${isSidebarClosed ? styles.close : ''}`}>
        <header>
          <div className={styles['image-text']}>
            <SiSquarespace className={styles.image}/>
            <div className={`${styles['logo-text']}`}>
              <span className={styles.name}>PI-Track</span>
            </div>
          </div>
      
          <i className={`bx bx-chevron-right ${styles.toggle}`} onClick={handleToggleSidebar}><IoIosArrowForward /></i>
        </header>

        <div className={styles['menu-bar']}>
          <div className={styles.menu}>
            <ul className={styles['menu-links']}>
              {/* Map over the menu items array */}
              {menuItems.map((item, index) => (
                <li className={styles['nav-link']} key={index}>
                    <NavLink
                    to={item.link}
                    end
                    className={({ isActive }) =>
                      isActive ? styles.activeLink : styles.navLink
                    }
                  >
                    {item.icon}
                    <span className={styles.text}>{item.text}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles['bottom-content']}>
            <li className={styles.logout}>
              <Link to="/logout">
                <BsBoxArrowRight className={styles.icon} />
                <span className={styles.text}>Logout</span>
              </Link>
            </li>
          </div>
        </div>
      </nav>
      <div className={styles.outletWrapper}>
        <Outlet />
      </div>
    </div>
  );
};

export default SideBar;
