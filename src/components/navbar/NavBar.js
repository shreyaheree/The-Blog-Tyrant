import { Box, Divider, Drawer } from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import './navbar.scss';
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

const NavBar = () => {
    const navigate = useNavigate();
    // const isAuth = false; //set isAuth
    const [activeMenu, setActiveMenu] = useState(false);
    const {isAuth, logout, isAdmin, isModerator} = useContext(AuthContext);

    const handleLogout = () => {
        if (activeMenu) {
            setActiveMenu(false);
        }
        let navigatePage = '/';
        if(isAdmin){
            navigatePage = '../admin/login';
        }
        if(isModerator){
            navigatePage = '../mod/login';
        }

        logout();
        // navigate('/');
        navigate(navigatePage);
    };

    return (
        <div className='navbar'>
            {/* for mobiles */}

            <Drawer anchor={'right'} open={activeMenu} onClose={() => setActiveMenu(false)}>
                <Box sx={{ width: 300, padding: '20px', textAlign: 'center' }}>
                    <div className={'mobileMenu'}>
                        <h2 style={{ paddingBottom: '20px' }}>MyBlog - Navigation</h2>
                        <Divider />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '20px' }}>
                            <Link onClick={() => setActiveMenu(false)} className={'link'} to={'/'}>
                                <h1>Home</h1>
                            </Link>
                            {isAuth ?
                                <>
                                    <Link onClick={() => setActiveMenu(false)} className={'link'} to={'/profile'}>
                                        <h1>Profile</h1>
                                    </Link>
                                    <Link onClick={() => setActiveMenu(false)} className={'link'} to={'/create'}>
                                        <h1>Make Post</h1>
                                    </Link>
                                    <h1 onClick={handleLogout}>Logout</h1>
                                </>
                                :
                                <>
                                    <Link onClick={() => setActiveMenu(false)} className={'link'} to={'/login'}>
                                        <h1>Login</h1>
                                    </Link>
                                    <Link onClick={() => setActiveMenu(false)} className={'link'} to={'/register'}>
                                        <h1>Create</h1>
                                    </Link>
                                </>
                            }
                        </div>
                    </div>
                </Box>
            </Drawer>

            <div className="navbarInner">
                <div className={"left"}>
                    <HistoryEduIcon className={"icon"} />
                    {isAdmin?
                    <Link to={"../admin/home"} className={"link"}>
                    <h1 className={"title"}>The Daily Scribbles</h1>
                    </Link>
                    : isModerator? 
                    <Link to={"../mod/home"} className={"link"}>
                        <h1 className={"title"}>The Daily Scribbles</h1>
                    </Link>

                    :

                    <Link to={"/"} className={"link"}>
                        <h1 className={"title"}>The Daily Scribbles</h1>
                    </Link>

                    }
                </div>
                <div className={"right"}>
                    <div onClick={() => setActiveMenu(prev => !prev)} className={'burgerMenu'}>
                        <div className={'burgerMenuItem'} />
                        <div className={'burgerMenuItem'} />
                        <div className={'burgerMenuItem'} />
                    </div>
                    {isAuth ? (
                        <button onClick={handleLogout} className={"signupButton"}>
                            Log out
                        </button>
                    ) : (
                        <>
                            <Link to={"/login"}>
                                <button className={"loginButton"}>Log in</button>
                            </Link>
                            <Link to={"/register"}>
                                <button className={"signupButton"}>Create account</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NavBar;
