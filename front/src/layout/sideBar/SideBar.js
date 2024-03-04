import React, { useState, useEffect } from 'react';
import styles from './SideBar.module.css';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { BsHouse, BsBoxArrowRight } from 'react-icons/bs';
import { IoIosArrowForward } from "react-icons/io";
import { SiSquarespace } from "react-icons/si";
import { useUserStore } from "../../Store";
import { BiTask } from "react-icons/bi";
import { MdOutlinePlayLesson } from "react-icons/md";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import axios from 'axios'
const SideBar = () => {
  const navigate = useNavigate();
  const { user,setUser } = useUserStore()
  const [isSidebarClosed, setSidebarClosed] = useState(window.innerWidth < 1000);
  const handleLogout = async () => { 
      try {
          await axios.post(`${process.env.REACT_APP_ENDPOINT}api/users/logout`);
      setUser({})
      navigate('/');
        } catch (err) {
          console.error("Error logging out :", err);
          setUser({})

        }
  };

  useEffect(() => {
    const handleResize = () => {
      setSidebarClosed(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
          <Link to='/' style={{ textDecoration: 'none' }}>
            <div className={styles['image-text']}>
              <SiSquarespace className={styles.image} />
              <div className={`${styles['logo-text']}`}>
                <span className={styles.name}>PI-Track</span>
              </div>
            </div>
          </Link>
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
            {user ? (
              <li>
                <NavLink className={styles.profile}
                  to='profile'
                >
                  <Avatar alt={user.username} src={user.image} className={styles.icons} >
                    {user.username ? user.username[0] : ''}
                  </Avatar>
                  <span className={styles.text}> {user.username} </span>
                </NavLink>
              </li>
            ) : (
              <li className={styles.loading}>
                <div>Loading...</div>
              </li>
            )}
            <li className={styles.logout}>
              <Link onClick={handleLogout}>
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
