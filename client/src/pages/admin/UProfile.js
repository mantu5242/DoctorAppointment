import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Form, Input, message } from 'antd';
import "../../../src/styles/Layout.css";
import axios from 'axios';
import { hideLoading, showLoading } from '../../redux/features/alertSlices';

const UProfile = () => {

    const [user,setUsers] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  let findmatch= {};
  // console.log(params.id)
  // console.log(user);
  const getUsers = async() => {
      try{
        dispatch(showLoading)
        const res = await axios.get('/api/v1/admin/getAllUsers',{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
        dispatch(hideLoading)
        if(res.data.success){
          findmatch = res.data.data.find(user => user._id === params.id);
          console.log(findmatch);
          if(findmatch){
            setUsers(findmatch)
            console.log("dflsks");
            console.log(user);
            console.log("kdksjfs");
          }
        }
      }
      catch(error){
        dispatch(hideLoading)
          console.log(error)
          // message.error 
      }
  }

  useEffect(() => {
    getUsers()
  },[])


  return (
    <div>
    <Layout>
      <div className='tophead'><h1>User Profile</h1></div>
      <div className='container'>
        <div className='profile'>
          <div className='ind'>
            <div className='indlab'>Name:</div>
            <div className='labelans'>{user.name}</div>
          </div>
          <div className='ind'>
            <div className='indlab'>Email:</div>
            <div className='labelans'>{user.email}</div>
          </div>
          <div className='ind'>
            <div className='indlab'>Contact:</div>
            <div className='labelans'>{user._id}</div>
          </div>
          <div className='ind'>
            <div className='indlab'>Address:</div>
            <div className='labelans'>{user._id}</div>
          </div>
        </div>
        
      </div>
    </Layout>
  </div>
  )
}

export default UProfile