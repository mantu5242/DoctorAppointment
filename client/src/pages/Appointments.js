import React , { useState , useEffect} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { Table, message} from 'antd';
// import '../styles'
import moment from 'moment'

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const getAppointments = async() => {
        try{
            const res = await axios.get('/api/v1/user/user-appointments',
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
            )
            if(res.data.success){
                // console.log("res.data.data",res.data.data)
                setAppointments(res.data.data);

                console.log(res.data.data)
                console.log(appointments)
                // setAppointments(res.data.data);
                
                // console.log( "dofnsofn" +  appointments )
            }
        }
        catch(error){
            console.log(error)
        }
    }
    // console.log(appointments.doctorInfo)

    useEffect( () => {
        getAppointments();
    },[])

    const columns = [
        {
            title : 'ID',
            dataIndex: '_id'
        },
        {
            title: 'Name',
            dataIndex:'name',
            render:(text,record) => (
                <span>
                { record.doctorInfo.firstName} {record.doctorInfo.lastName}
                </span>
            )
        },
        {
            title: 'Phone',
            dataIndex:'phone',
            render:(text,record) => (
                <span>
                {
                    record.doctorInfo.phone
                }
                </span>
            )
        },
        {
            title: 'Date & Time',
            dataIndex:'date',
            render:(text,record) => (
                <span>
                { moment(record.date).format('DD-MM-YYYY')+" "}
                { moment(record.time).format('HH:mm') }
                </span>
            )
        },
        {
            title:'Status',
            dataIndex:'status',
        }
    ] 

  return (
    <Layout>
        <h1>Appointments List</h1>
        <Table columns={columns} dataSource={appointments}/>
    </Layout>
  )
}

export default Appointments;