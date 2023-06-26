import { Col, Input, Row, TimePicker ,message, Form } from 'antd'
import React,{useState} from 'react'
import '../styles/Layout.css'
// import { Form } from 'react-router-dom'; 
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/features/alertSlices'
import axios from 'axios';
import moment from 'moment'

const ApplyDoctor = () => {
    const {user} = useSelector(state => state.user)
    // const [startTime, setStartTime] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
   



    
// applydoctor handleFinish function
 const handleFinish = async(values) => {
        try{
            dispatch(showLoading());
           
            const res = await axios.post('/api/v1/user/apply-doctor',{
                ...values,
                userId:user._id,
                timings: [
                    values.timings[0].format('HH:mm'), 
                    values.timings[1].format('HH:mm')
                ],
            },
            {
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(hideLoading());
            console.log(values)
            // console.log("rdfonweeff")
            console.log(res.data)
            // console.log(res.data.success)
            if(res.data.success){
                message.success(res.data.message)
                // return <Navigate to ="/" />
                navigate("/")
                console.log("successfull")
            }
            else{
                message.error(res.data.success)
                // console.log("successfull but ferror occur")
            }
        }
        catch(error){
            dispatch(hideLoading());
            console.log(error)
            message.error("Something Went Wrong")
        }
        
    }




    // new changes

    // const [timings, setTimings] = useState([]); // State to store selected timings

    // const handleTimingsChange = (value) => {
    //   setTimings(value); // Update the selected timings in state
    // };
  




    // const handleFinish = async(values) => {
    //     try{
    //         dispatch(showLoading());

    //         console.log(values.timings);
    //         const formattedTimings = values.timings.map((timing) => moment(timing).format('HH:mm'));
    // const res = await axios.post('/api/v1/user/apply-doctor', { ...values, timings: formattedTimings, userId: user._id }, {
    //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    // });
           
    //         // const res = await axios.post('/api/v1/user/apply-doctor',{...values,userId:user._id},
    //         // {
    //         //     headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
    //         // })
    //         dispatch(hideLoading());
    //         console.log(values)
    //         // console.log("rdfonweeff")
    //         console.log(res.data)
    //         // console.log(res.data.success)
    //         if(res.data.success){
    //             message.success(res.data.message)
    //             // return <Navigate to ="/" />
    //             navigate("/")
    //             console.log("successfull")
    //         }
    //         else{
    //             message.error(res.data.success)
    //             // console.log("successfull but ferror occur")
    //         }
    //     }
    //     catch(error){
    //         dispatch(hideLoading());
    //         console.log(error)
    //         message.error("Something Went Wrong")
    //     }
        
    // }


  return (
    <div>
        <Layout>
        <div className='tophead'> <h1>Apply For Doctor</h1></div>
        <Form layout ='vertical' onFinish={handleFinish} className='m-3'>
            <h4 className='' >Personal Details :</h4>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={8} >
                    <Form.Item label = "First Name" name = 'firstName' required rules = {[{required:true}]}>
                        <Input type='text' placeholder='first name'/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8} >
                    <Form.Item label = "Last Name" name = 'lastName' required rules = {[{required:true}]}>
                        <Input type='text' placeholder='last name'/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8} >
                    <Form.Item label = "Email" name = 'email' required rules = {[{required:true}]}>
                        <Input type='text' placeholder='email'/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8} >
                    <Form.Item label = "Phone" name = 'phone' required rules = {[{required:true}]}>
                        <Input type='text' placeholder='phone no.'/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8} >
                    <Form.Item label = "Address" name = 'address' required rules = {[{required:true}]}>
                        <Input type='text' placeholder='address'/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8} >
                    <Form.Item label = "Website" name = 'website'>
                        <Input type='text' placeholder='website'/>
                    </Form.Item>
                </Col>
            </Row>
            <h4 >Professional Details :</h4>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={8} >
                    <Form.Item label = "Specialization" name = 'specialization' required rules = {[{required:true}]}>
                        <Input type='text' placeholder='your specialization'/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8} >
                    <Form.Item label = "Experience" name = 'experience' required rules = {[{required:true}]}>
                        <Input type='text' placeholder='Your experience'/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8} >
                    <Form.Item label = "Fees Per Consultation" name = 'feesPerConsultation' required rules = {[{required:true}]}>
                        <Input type='text' placeholder='fees'/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8} >
                    <Form.Item label="Timings" name="timings" required rules={[{ required: true }]}>
                        <TimePicker.RangePicker format="HH:mm"  />
                    </Form.Item>   
                </Col>
                {/* <Col xs={24} md={24} lg={8} >
                    <Form.Item label="Timings" name="timings" required rules={[{ required: true }]}>
                        <TimePicker.RangePicker format="HH:mm" onChange={handleTimingsChange} />
                    </Form.Item>   
                </Col> */}
                <Col xs={24} md={24} lg={8}>
                <button className='btn btn-primary form-btn' type='submit'>Submit</button>
                </Col>
            </Row>
        </Form>
    </Layout>
    </div>
    
  )
}

export default ApplyDoctor;