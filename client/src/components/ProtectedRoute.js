import React,{useEffect} from 'react';
import {useNavigate ,Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { setUser } from '../redux/features/userSlice';
import axios from 'axios';
import { hideLoading, showLoading } from '../redux/features/alertSlices';


export default function ProtectedRoute({children}){
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user)
    const navigate = useNavigate();

    const getUser = async() => {
        try{
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/getUserData',
            {
                token: localStorage.getItem('token')
            },
            {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            )
            dispatch(hideLoading());
            if(res.data.success){
                dispatch(setUser(res.data.data))
            }
            else{
                navigate('/login')
                localStorage.clear();
                // <Navigate to = '/login' />
            }
        }
        catch(error){
            dispatch(hideLoading())
            localStorage.clear();
            console.log(error);
        }
    }
    useEffect(() => {
        if(!user){
            getUser();
        }
    }, [user,getUser])

    if(localStorage.getItem('token')){
        return children;
    }
    else{
        return <Navigate to ='/login'></Navigate>
        
    }
}