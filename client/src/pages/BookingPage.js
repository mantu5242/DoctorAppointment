import React,{useEffect, useState} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { DatePicker, TimePicker, message } from 'antd'
import { hideLoading, showLoading } from '../redux/features/alertSlices'
import { useDispatch,useSelector } from 'react-redux'
import moment from 'moment'
// import { param } from '../../../routes/doctorRoutes'

const BookingPage = () => {
    const {user} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const params = useParams();
    // const [doctors, setDoctors] = useState([]);
    const [date,setDate] = useState()
    const [time, setTime] = useState()
    const [isAvailable,setIsAvailable] = useState()

    
    const [doctors, setDoctors] = useState([]);
    // const [startTime,endTime]=doctors?.timing;
   

    const getUserData = async() => {
        try{
            // const res = await axios.post('/api/v1/user/getUserData',{},{headers: {Authorization: "Bearer " + localStorage.getItem('token')}})
            const res = await axios.post('/api/v1/doctor/getDoctorById',{doctorId:params.doctorId}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            console.log(doctors);
            // console.log(doctors);
            if(res.data.success){
              setDoctors(res.data.data);
          
            }
        }
        catch(error){
          console.log(error);
        }
    }
    
    useEffect(() => {
      getUserData(); // Invoke the function
    }, []);
  

    // check Availability
    const handleAvailability = async() => {
        try{
            dispatch(showLoading)
            const res = await axios.post('/api/v1/user/booking-availability',
            {
                doctorId: params.doctorId,
                date, time
            },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
            )
            dispatch(hideLoading)
            if(res.data.success){
                setIsAvailable(true)
                message.success(res.data.message)
            }else{
                message.error(res.data.message)
            }
        }
        catch(error){
            console.log(error)
            message.error("something went wrong")
        }
    }




    // booking handling

    const handleBooking = async() => {
        try{
            // setIsAvailable(true);
            if(!date && !time){
                return alert("Date & Time Required")
            }
            dispatch(showLoading)
            const res = await axios.post('/api/v1/user/book-appointment',
            {
                doctorId: params.doctorId,
                userId: user._id,
                doctorInfo:doctors,
                time:time,
                date:date,
                userInfo:user
            },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
            )
            dispatch(hideLoading)
            if(res.data.success){
                message.success(res.data.message)
            }
        }
        catch(error){
            dispatch(hideLoading);
            console.log(error)
            message.error('something went wrong')
        }
    
    }


  return (
    <Layout>
        <h1>BookingPage</h1>
        <div className='container m-2' >
            {doctors && (
                <div>
                    <h4>Dr.{doctors.firstName} {doctors.lastName}</h4>
                    <h4>Fees: {doctors.feesPerConsultation}</h4>
                    {/* {console.log(doctors.timings)} */}
                    {doctors.timings?.length ? <h4>Timings: {doctors.timings[0]} - {doctors.timings[1]}</h4>:""}

                    {/* <h4>Timings: {doctors.timings}</h4> */}

                    <div className='d-flex flex-column w-50'>
                        <DatePicker className='m-2' format = "DD-MM-YYYY" 
                        onChange = {
                            (values) => { 
                                setIsAvailable(false) 
                                setDate(moment(values).format('DD-MM-YYYY'))
                                }
                        }
                        />
                        <TimePicker  format = "HH:mm" className='m-2' onChange = {(values) => { 
                                                                                            setIsAvailable(false)
                                                                                             setTime(moment(values).format('HH:mm'))
                                                                                            }}/>
                         <button className='btn btn-primary mt-2' onClick={handleAvailability}>check Availability</button>
                         {isAvailable && (
                             <button className='btn btn-dark mt-2' onClick={handleBooking}>Book Now</button>
                         
                        )}

                    </div>
                </div>
                
            )}
        </div>
        
    </Layout>
  )
}

export default BookingPage;