import React, { children } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { adminMenu, userMenu } from "../Data/data";
import {Badge, message} from 'antd';
import "../styles/Layout.css";

import { useSelector } from "react-redux";

const Layout  = ({children}) => {
    const {user} = useSelector( state => state.user)
    const location = useLocation();
    const navigate = useNavigate();
    // handle logout
    const handleLogout = () => {
        localStorage.clear()
        message.success('Logout Successfully')
        navigate('/login');
    }
    //handle /notifications
    const handlenotification = () => {
        console.log(user.notification.length);
        console.log(user.notification);
        navigate('/notification')
    }

    //user menu
    const userMenu = [
        {
            name: 'Home',
            path: '/',
            icon: "fa-solid fa-house"
        },
        {
            name: 'Appointments',
            path: '/appointments',
            icon: "fa-solid fa-list fa-beat" 
        },
        {
            name: 'Apply Doctor',
            path: '/apply-doctor',
            icon: "fa-solid fa-user-doctor"
        },
        {
            name: 'profile',
            path: `/user/profile/${user?._id}`,
            icon: "fa-solid fa-user" 
        }
    ];


    //  doctor profile menu

    const DoctorMenu = [
        {
            name: 'Home',
            path: '/',
            icon: "fa-solid fa-house"
        },
        {
            name: 'Appointments',
            path: '/doctor-appointments',
            icon: "fa-solid fa-list fa-beat" 
        },
        {
            name: 'profile',
            path: `/doctor/profile/${user?._id}`,
            icon: "fa-solid fa-user" 
        }
    ];


    //rendering menu list
    const SidebarMenu = user?.isAdmin 
    ? adminMenu 
    : user?.isDoctor 
    ? DoctorMenu 
    : userMenu ;
    return (
        <div className='main'>
            <div className='layout'>
                <div className='sidebar'>
                    <div className ="logo">
                        <h6>DOC APP</h6>
                        <hr/>
                    </div>
                    <div className='menu'>
                        {SidebarMenu.map(menu => {
                            const isActive = location.pathname === menu.path;
                            return (
                                <div className={`menu-item ${isActive && 'active'}`}>
                                    <i className={menu.icon}></i>
                                    <Link to = {menu.path}>{menu.name}</Link>
                                </div>
                            )    
                        })}
                        <div className={`menu-item`} onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <Link to = '/login'>Logout</Link>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className='content'>
                <div className='header'>
                    <div className="header-content" style ={{cursor:"pointer"}}>
                        <Badge count={user && user.notification.length} onClick = {handlenotification} >
                            <i class="fa-solid fa-bell"></i>
                        </Badge>
                        <Link to = '/profile'>{user?.name}</Link>
                    </div>
                </div>
                <div className='body'>{children}</div>
            </div>
        </div>
    )
}

export default Layout;