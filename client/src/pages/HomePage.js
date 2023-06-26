import React,{useEffect,useState} from "react";
import axios from 'axios';
import Layout from "../components/Layout";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";
import '../styles/Layout.css'
const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  const getUserData = async() => {
      try{
          // const res = await axios.post('/api/v1/user/getUserData',{},{headers: {Authorization: "Bearer " + localStorage.getItem('token')}})
          const res = await axios.get('/api/v1/user/getAllDoctors', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
          console.log(doctors);
          // console.log(doctors);
          if(res.data.success){
            setDoctors(res.data.data);
            console.log(doctors)
          }
      }
      catch(error){
        console.log(error);
      }
  }
  
  useEffect(() => {
    getUserData(); // Invoke the function
  }, []);

  return (
    <div>
         <Layout>
         <div className="tophead"><h1 className="text-center">HomePage</h1></div>
    
    <Row>
      {/* {doctors &&  doctors.map(doctor => (<DoctorList doctor={doctor}/>))} */}

      {doctors && doctors.map(doctor => (
      <DoctorList key={doctor._id} doctor={doctor} />
      ))}
      
      {/* <DoctorList/> */}
    </Row>
    </Layout>
    </div>
   
  );
};

export default HomePage;