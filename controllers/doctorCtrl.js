const appointmentModel = require("../models/appointmentModel");
const doctorModel = require('../models/doctorModel');
const userModel = require("../models/userModels");

const getDoctorInfoController = async(req,res) => {
    try{
        const doctor = await doctorModel.findOne({userId:req.body.userId});
        console.log(doctorModel);
        res.status(200).send({success:true, message:'doctor data fetch success',data:doctor})
    }
    catch(error){
        console.log(error)
        res.status(500).send({success:false,error,message:'Error in Fetching Doctor Details'})
    }
}





const updateProfileController = async(req,res) => {
    try{
        const doctor = await doctorModel.findOne({userId:req.body.useId},req.body)
        res.status(201).send({success:true,message:'Doctor Profile Updated',data:doctor})
    }
    catch(error){
        console.log(error)
        res.status(500).send({success:false, message:'Doctor Profile Update issue',error})
    }
}






const getDoctorBYIdController = async(req,res) => {
    try{
        const doctor = await doctorModel.findOne({doctorId:req.body.doctorId})
        console.log(req.body.doctorId)
        res.status(200).send({
            success:true,
            message:'Single Doc Info Fetched',
            data:doctor
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({success:false, message:'Error in single doctor info',error})
    }
}







const doctorAppointmentsController = async(req,res) => {
    try{
        const doctor = await doctorModel.findOne({userId:req.body.userId})
        const appointments = await  appointmentModel.find({doctorId:doctor._id})

        res.setHeader('Cache-Control', 'no-store'); // Disable caching

        res.status(200).send({
            success:true,
            message:'Doctor Appointment fetch Successfully',
            data: appointments

        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({success:false,error,message:'Error in Doc Appointments'})
    }
}







const updateStatusController = async(req,res) => {
    try{
        const {appointmentsId, status} = req.body
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId,{status})
        const user = await userModel.findOne ({_id: appointments.userId})
        res.setHeader('Cache-Control', 'no-store'); // Disable caching

        const notification = user.notification
        notification.push({
          type:'Status Updated',
          message:`Your appointment has been updated ${status}`,
          onClickPath:'/doctor-appointments'
        })
        await user.save();
        res.status(200).send({
            success:true,
            message:'Appointment Status Updated',
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({success:false,error,message:'Error In Update Status'})
    }
}






module.exports = {getDoctorInfoController, updateProfileController ,getDoctorBYIdController, doctorAppointmentsController,updateStatusController};