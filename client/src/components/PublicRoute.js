import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({children}){
    // const Navigate = useNavigate();
    if(localStorage.getItem('token')){
        return <Navigate to='/'/>;
    }
    else{
        return children;
    }
}