import React, { useState, useEffect } from "react";
import style from "./NavBar.module.css";
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { scroller } from 'react-scroll';
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import Logo from '../Logo/Logo';
import { NavLink } from "react-router-dom";
import { NavItems } from "./NavBarItems";

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const bar1 = [style.bar1, open ? style.bar1active : ""].join(" ");
    const bar2 = [style.bar2, open ? style.bar2active : ""].join(" ");
    const bar3 = [style.bar3, open ? style.bar3active : ""].join(" ");
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            const liElement = document.getElementById('conditionalLi');
            if (liElement) {
                liElement.style.display = window.innerWidth < 1222 ? 'block' : 'none';
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [location.pathname]);

    const handleScrollToSection = (url) => {
        const scrollToOptions = {
            duration: 1500,
            delay: 0,
            smooth: 'easeInOutQuint',
        };

        if (url === '/') {
            scroll.scrollToTop(scrollToOptions);
        } else if (['/values', '/aboutUs', '/process', '/contact'].includes(url)) {
            scroller.scrollTo('myScrollToElement', scrollToOptions);
        }
    };

    const handleClick = () => {
        setOpen(!open);
    };


    return (
        <nav className={style.NavbarItems}>
            <ScrollLink
                to="top"
                className={style.logo}
                onClick={() => handleScrollToSection('/')}
            >
                <Logo />
            </ScrollLink>
            <div className={style["Hamburger-Cross-Icons"]} onClick={handleClick}>
                <span className={bar1}></span>
                <span className={bar2}></span>
                <span className={bar3}></span>
            </div>
            <div>
                <ul className={`${style.MenuItems} ${open ? style.active : ""}`}>
                    {NavItems.map((Item, index) => (
                        <li key={index}>
                            <span className={style[Item.cName]}>
                                <ScrollLink
                                    className={style.link}
                                    onClick={() => handleScrollToSection(Item.url)} 
                                >
                                    {Item.title}
                                </ScrollLink>
                            </span>
                        </li>
                    ))}
                    <li id="conditionalLi">
                        <span className={style.navlinks}>
                            <NavLink className={style.link} to='signup'>sign up</NavLink>
                        </span>
                    </li>
                    <div className={style.navButtonContainer}>
                        <li>
                            <NavLink to='signup'>
                                <Button
                                    variant="contained"
                                    sx={{
                                        height: "50px",
                                        width: "6rem",
                                        backgroundColor: "rgb(7,28,53)",
                                        marginLeft: "60px",
                                        color: "white",
                                        fontFamily: "Poppins",
                                        boxShadow: "none",
                                        "&:hover": {
                                            backgroundColor: "rgba(7,28,53,0.8)",
                                            color: "#ffffff",
                                            boxShadow: "none",
                                        },
                                    }}
                                >
                                    SIGN UP
                                </Button>
                            </NavLink>
                        </li>
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;