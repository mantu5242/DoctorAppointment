import Layout from '../components/Layout'
import React from 'react'
import {Tabs,message} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlices';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const handleMarkAllRead = async() => {
      try{
        dispatch(showLoading())
        const res = await axios.post('/api/v1/user/get-all-notification',{userId:user._id},{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}});
        dispatch(hideLoading())
        if(res.data.success){
          message.success(res.data.message)
        }
        else{
          message.error(res.data.message);
        }
      }
      catch(error){
        console.log(error)
        message.error('Something Went Wrong')
      }
  }
  const handleDeleteAllRead = async(req,res) => {
        try{
          dispatch(showLoading());
          const res = await axios.post('/api/v1/user/delete-all-notification', {userId:user._id},{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
          dispatch(hideLoading());
          if(res.data.success){
            message.success(res.data.message)
          }
          else{
            message.error('Something went wrong in notification')
          }
        }
        catch(error){
          dispatch(hideLoading());
          console.log(error);
          message.error('Something Went Wrong In Notifcations')
        }
  }
  return (
    <Layout>
        <h4 className="p-3 text-center">notification page</h4>
        <Tabs>
            <Tabs.TabPane tab="unRead" key={0}>
              <div className = "d-fle justify-content-end">
                <h4 className="p-4" onClick={handleMarkAllRead}>Mark All Read</h4>
              </div>
              {user?.notification.map(notificationMgs => {
               return ( <div className='card'  onClick={()=> navigate(notificationMgs.onClickPath)} style={{cursor:'pointer'}}>
                  <div className='card-text'>
                    {notificationMgs.message}
                  </div>
                </div>)
              })}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Read" key={1}>
              <div className = "d-fle justify-content-end">
                <h4 className="p-2 text-primary" style={{cursor:'pointer'}} onClick={handleDeleteAllRead}>Delete All Read</h4>
              </div>
              {user?.seennotification.map(notificationMgs => {
               return ( <div className='card'  onClick={()=> navigate(notificationMgs.onClickPath)} style={{cursor:'pointer'}}>
                  <div className='card-text'>
                    {notificationMgs.message}
                  </div>
                </div>)
              })}
            </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default Notification;