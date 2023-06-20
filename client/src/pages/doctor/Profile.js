// import React,{useState, useEffect} from 'react'
// import Layout from '../../components/Layout'
// import { useParams,useNavigate } from 'react-router-dom'
// import axios from 'axios';
// import { Col, Input, Row, TimePicker ,message, Form } from 'antd'
// import { showLoading, hideLoading } from '../../redux/features/alertSlices'
// import { useDispatch, useSelector } from 'react-redux'
// import moment from 'moment';



// const Profile = () => {
//   const {user} = useSelector(state => state.user)
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [doctor , setDoctor] = useState(null)
//   const params = useParams();
//   const getDoctorInfo = async() => {
//     try{
//       const res = await axios.post('/api/v1/doctor/getDoctorInfo',
//       {userid: params.id},
//       {
//         Headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
//       }
      
//       )
//       if(res.data.success){
//         setDoctor(res.data.data)
//       }
//     }
//     catch(error){
//       console.log(error)
//     }
//   }


//   const handleFinish = async(values) => {
//     try{
//         dispatch(showLoading());
//         const res = await axios.post('/api/v1/user/apply-doctor',{...values,userId:user._id,timings:[moment(values.timings[0]).format('HH:mm'),moment(values.timings[1]).format('HH:mm')]},
//         {
//             headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
//         })
//         dispatch(hideLoading());
//         // console.log(values)
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
//         }
//     }
//     catch(error){
//         dispatch(hideLoading());
//         console.log(error)
//         message.error("Something Went Wrong")
//     }


//   useEffect( () => {
//     getDoctorInfo();
//     // eslint-disable-next-line
// },[]);

//   return (
//     <Layout><h1>Manage Profile</h1>
//     {doctor && (
//       <Form layout ='vertical' onFinish={handleFinish} className='m-3' initialValues={{...doctor,timings:[moment(doctor.timings[0],'HH:mm'),moment(doctor.timings[0],'HH:mm'),],}}>
//             <h4 className='' >Personal Details :</h4>
//             <Row gutter={20}>
//                 <Col xs={24} md={24} lg={8} >
//                     <Form.Item label = "First Name" name = 'firstName' required rules = {[{required:true}]}>
//                         <Input type='text' placeholder='first name'/>
//                     </Form.Item>
//                 </Col>
//                 <Col xs={24} md={24} lg={8} >
//                     <Form.Item label = "Last Name" name = 'lastName' required rules = {[{required:true}]}>
//                         <Input type='text' placeholder='last name'/>
//                     </Form.Item>
//                 </Col>
//                 <Col xs={24} md={24} lg={8} >
//                     <Form.Item label = "Email" name = 'email' required rules = {[{required:true}]}>
//                         <Input type='text' placeholder='email'/>
//                     </Form.Item>
//                 </Col>
//                 <Col xs={24} md={24} lg={8} >
//                     <Form.Item label = "Phone" name = 'phone' required rules = {[{required:true}]}>
//                         <Input type='text' placeholder='phone no.'/>
//                     </Form.Item>
//                 </Col>
//                 <Col xs={24} md={24} lg={8} >
//                     <Form.Item label = "Address" name = 'address' required rules = {[{required:true}]}>
//                         <Input type='text' placeholder='address'/>
//                     </Form.Item>
//                 </Col>
//                 <Col xs={24} md={24} lg={8} >
//                     <Form.Item label = "Website" name = 'website'>
//                         <Input type='text' placeholder='website'/>
//                     </Form.Item>
//                 </Col>
//             </Row>
//             <h4 >Professional Details :</h4>
//             <Row gutter={20}>
//                 <Col xs={24} md={24} lg={8} >
//                     <Form.Item label = "Specialization" name = 'specialization' required rules = {[{required:true}]}>
//                         <Input type='text' placeholder='your specialization'/>
//                     </Form.Item>
//                 </Col>
//                 <Col xs={24} md={24} lg={8} >
//                     <Form.Item label = "Experience" name = 'experience' required rules = {[{required:true}]}>
//                         <Input type='text' placeholder='Your experience'/>
//                     </Form.Item>
//                 </Col>
//                 <Col xs={24} md={24} lg={8} >
//                     <Form.Item label = "Fees Per Consultation" name = 'feePerconsultation' required rules = {[{required:true}]}>
//                         <Input type='text' placeholder='fees'/>
//                     </Form.Item>
//                 </Col>
//                 <Col xs={24} md={24} lg={8} >
//                     <Form.Item label = "Timing" name = 'timings' required rules = {[{required:true}]}>
//                         <TimePicker.RangePicker format="HH:MM"/>
//                     </Form.Item>
//                 </Col>
//                 <Col xs={24} md={24} lg={8}></Col>
//                 <Col xs={24} md={24} lg={8}>
//                 <button className='btn btn-primary form-btn' type='submit'>Update</button>
//                 </Col>
//             </Row>
//         </Form>
//     )}
//     </Layout>
//   )
// }
// }
// export default Profile;













// import React, { useState, useEffect } from 'react';
// import Layout from '../../components/Layout';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Col, Input, Row, TimePicker, message, Form } from 'antd';
// import { showLoading, hideLoading } from '../../redux/features/alertSlices';
// import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment';

// const Profile = () => {
//   const { user } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [doctor, setDoctor] = useState(null);
//   const params = useParams();

//   const getDoctorInfo = async () => {
//     try {
//       const res = await axios.post(
//         '/api/v1/doctor/getDoctorInfo',
//         { userid: params.id },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         }
//       );
//       if (res.data.success) {
//         setDoctor(res.data.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleFinish = async (values) => {
//     try {
//       dispatch(showLoading());
//       const res = await axios.post(
//         '/api/v1/doctor/updateProfile',
//         {
//           ...values,
//           userId: user._id,
//           timings: [
//             moment(values.timings[0]).format('HH:mm'),
//             moment(values.timings[1]).format('HH:mm'),
//           ],
//         },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         }
//       );
//       dispatch(hideLoading());
//       console.log(res.data);
//       if (res.data.success) {
//         message.success(res.data.message);
//         navigate('/');
//       } else {
//         message.error(res.data.success);
//       }
//     } catch (error) {
//       dispatch(hideLoading());
//       console.log(error);
//       message.error('Something Went Wrong');
//     }
//   };

//   useEffect(() => {
//     getDoctorInfo();
//     // eslint-disable-next-line
//   }, [getDoctorInfo]);

//   return (
//     <Layout>
//       <h1>Manage Profile</h1>
//       {doctor && (
//         <Form
//           layout='vertical'
//           onFinish={handleFinish}
//           className='m-3'
//           initialValues={{
//             ...doctor,
//             timings: [moment(doctor.timings[0], 'HH:mm'), moment(doctor.timings[0], 'HH:mm')],
//           }}
//         >
//           <h4 className=''>Personal Details :</h4>
//           <Row gutter={20}>
//             <Col xs={24} md={24} lg={8}>
//               <Form.Item label='First Name' name='firstName' required rules={[{ required: true }]}>
//                 <Input type='text' placeholder='first name' />
//               </Form.Item>
//             </Col>
//             {/* ... rest of the form items */}
//           </Row>
//         </Form>
//       )}
//     </Layout>
//   );
// };

// export default Profile;









import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Col, Input, Row, TimePicker, message, Form } from 'antd';
import { showLoading, hideLoading } from '../../redux/features/alertSlices';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const params = useParams();

  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        '/api/v1/doctor/getDoctorInfo',
        { userid: params.id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleFinish = async (values) => {
  //   try {
  //     dispatch(showLoading());
  //     const res = await axios.post(
  //       '/api/v1/doctor/updateProfile',
  //       {
  //         // ...doctor,
  //         ...values,
  //         userId: user._id,
  //         timings: [
  //           moment(values.timings[0]).format('HH:mm'),
  //           moment(values.timings[1]).format('HH:mm'),
  //         ],
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  //       }
  //     );
  //     dispatch(hideLoading());
  //     console.log(res.data);
  //     if (res.data.success) {
  //       message.success(res.data.message);
  //       setDoctor(res.data.data)
  //       console.log(res.data);
  //       navigate('/');
  //       console.log('successfull');
  //     } else {
  //       message.error(res.data.success);
  //     }
  //   } catch (error) {
  //     dispatch(hideLoading());
  //     console.log(error);
  //     message.error('Something Went Wrong');
  //   }
  // };
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/doctor/updateProfile',
        {
          ...doctor, // Send the existing doctor object
          ...values, // Include the updated values from the form
          userId: user._id,
          timings: [
            moment(values.timings[0]).format('HH:mm'),
            moment(values.timings[1]).format('HH:mm'),
          ],
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        setDoctor(res.data.data); // Update the doctor state with the updated profile data
        navigate('/');
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something Went Wrong');
    }
  };



  useEffect(() => {
    getDoctorInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1>Manage Profile</h1>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...doctor,
            timings: [moment(doctor.timings[0], 'HH:mm'), moment(doctor.timings[0], 'HH:mm')],
          }}
        >
          <h4 className="">Personal Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="First Name" name="firstName" required rules={[{ required: true }]}>
                <Input type="text" placeholder="first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Last Name" name="lastName" required rules={[{ required: true }]}>
                <Input type="text" placeholder="last name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Email" name="email" required rules={[{ required: true }]}>
                <Input type="text" placeholder="email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Phone" name="phone" required rules={[{ required: true }]}>
                <Input type="text" placeholder="phone no." />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Address" name="address" required rules={[{ required: true }]}>
                <Input type="text" placeholder="address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Website" name="website">
                <Input type="text" placeholder="website" />
              </Form.Item>
            </Col>
          </Row>
          <h4>Professional Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your experience" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Fees Per Consultation"
                name="feesPerConsultation"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="fees" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Timing" name="timings" required rules={[{ required: true }]}>
                <TimePicker.RangePicker format="HH:MM" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
              <button className="btn btn-primary form-btn" type="submit">
                Update
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;

