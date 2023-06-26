import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Layout.css'

const DoctorList = ({doctor}) => {

    const navigate = useNavigate();
    
    // console.log(typeof(doctor.timings))

  return (
    <div>
    
        <div className='card m-2' style={{cursor:'pointer'}} onClick={()=>navigate(`/doctor/book-appointment/${doctor._id}`)}>
            <div className='card-header'>
                Dr. {doctor.firstName} {doctor.lastName}
            </div>
            <div className='card-body'>
                <p>
                    <b>Specialization: </b> {doctor.specialization}
                </p>
                <p>
                    <b>Experience: </b> {doctor.experience}
                </p>
                <p>
                    <b>Fees Per Consultation: </b> {doctor.feesPerConsultation}
                </p>
                <p>
                    <b>Timings: </b> {doctor.timings[0]} - {doctor.timings[1]}
                </p>
                {/* <p>
                    <b>Experience: </b> {doctor.experience}
                </p> */}
            </div>
        </div>
    </div>
  )
}

export default DoctorList;


