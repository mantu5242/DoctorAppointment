import React,{useEffect , useState} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd';
import '../../styles/Layout.css'


const Users = () => {
  const [user,setUsers] = useState([]);
  console.log(user);
  const getUsers = async() => {
      try{
        const res = await axios.get('/api/v1/admin/getAllUsers',{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
        if(res.data.success){
          console.log(res.data)
          setUsers(res.data.data)
          console.log(user);
        }
      }
      catch(error){
          console.log(error)
          // message.error 
      }
  }

  useEffect(() => {
    getUsers()
  },[])

  const columns = [
    { title:'Name', dataIndex:'name'},
    { title: 'Email', dataIndex:'email' },
    {
      title: 'Doctor',
      dataIndex: 'isDoctor',
      render: (text, record) => (
        <span>{record.isDoctor ? 'Yes' : 'No'}</span>
      )
    },
    { title:'Actions', dataIndex:'actions',
        render: (text,record) => 
          (
            <div className='d-flex'>
                <button className='btn btn-danger'>Block</button>
            </div>
          )     
    }
  ]


  return (
    <div>
        <Layout>
        <div className='tophead'><h1 className="text-center m-2">Users List</h1></div> 
        <Table columns={columns} dataSource={user}/>
        </Layout>
    </div>
    
  )
}

export default Users