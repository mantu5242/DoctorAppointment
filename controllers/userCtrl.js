const userModel = require("../models/userModels");
const doctorModel = require('../models/doctorModel')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const appointmentModel = require("../models/appointmentModel");
const moment = require('moment')

//register callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({ message: "Invlid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};


const authController = async(req,res) => {
  try{
      // user.password = undefined;
      const user = await userModel.findById( {_id: req.body.userId});
      if(!user){
        return res.status(200).send({message:'user not found',success:false})
      }
      else{
        user.password = undefined;
        res.status(200).send({success:true,
          data:user
        })
      }
  }
  catch(error){
    console.log(error);
    res.status(500).send({message:'auth error',success:false,error})
  }
}


// const applyDoctorController = async(req,res) => {
//     try{
//       const  newDoctor = await doctorModel({...req.body,status:'pending'})
//       await newDoctor.save();
//       const adminUser = await userModel.findOne({isAdmin:true});
//       console.log(userModel)
//       if(!adminUser){
//         res.status(401).send({message:'admin is null'})
//       }
//       else{

//         const notification = adminUser.notification
//         notification.push({
//           type:'apply-doctor-request',
//           message:`${newDoctor.firstName} ${newDoctor.lastName} Has applied For a Doctor Account`,
//           data:{
//                 doctorId: newDoctor._id,
//                 name: newDoctor.firstName+" "+newDoctor.lastName,
//                 onClickPath:'/admin/doctors'
//               }
//           })
//       await userModel.findByIdAndUpdate(adminUser._id,{notification})
//       res.status(201).send({message:'doctor Account Applied Successfully',success:true})
//       }
//       }
//     catch(error){
//       console.log(error);
//       res.status(500).send({message:'Error while apply for Doctor',success:false,error})
//     }
// }





const applyDoctorController = async(req,res) => {
  try{
    const  newDoctor = await doctorModel({...req.body,status:'pending'})
    await newDoctor.save();
    console.log(newDoctor);
    const adminUser = await userModel.findOne({isAdmin:true});
    console.log(userModel)
    if(!adminUser){
      res.status(401).send({message:'admin is null'})
    }
    else{

      const notification = adminUser.notification
      notification.push({
        type:'apply-doctor-request',
        message:`${newDoctor.firstName} ${newDoctor.lastName} Has applied For a Doctor Account`,
        data:{
              doctorId: newDoctor._id,
              name: newDoctor.firstName+" "+newDoctor.lastName,
              onClickPath:'/admin/doctors'
            }
        })

        const timings = {
          startTime: moment(req.body.startTime, 'HH:mm').format('HH:mm'),
          endTime: moment(req.body.endTime, 'HH:mm').format('HH:mm'),
        };
    await userModel.findByIdAndUpdate(adminUser._id,{notification})
    res.status(201).send({message:'doctor Account Applied Successfully',success:true})
    }
    }
  catch(error){
    console.log(error);
    res.status(500).send({message:'Error while apply for Doctor',success:false,error})
  }
}




// notification
const getAllNotificationController = async(req,res) => {
    try{
      const user = await userModel.findOne({_id:req.body.userId})
      const seennotification = user.seennotification
      const notification = user.notification
      seennotification.push(...notification)
      user.notification = []
      user.seennotification = seennotification
      const updatedUser = await user.save()
      res.status(200).send({
        success:true,
        message:'all notification marked as read',
        data:updatedUser,
      })
    }
    catch(error){
      console.log(error);
      res.status(500).send({message: 'Error in notification',
      success: false,
      error
    })
    }
}


// delete all notifications
// const deleteAllNotificationController = async(req,res) =>{
//     try{
//       const user = await userModel.findOne({_id:req.body.userId});
//       user.notification = [];
//       user.seennotification = []
//       const updatedUser = await user.save();
//       updatedUser.password = undefined;
//       res.status(200).send({
//         success:false,
//         message:'Unable to delete all notification',
//         data:updatedUser
//       })
//     }
//     catch(error){
//       console.log(error);
//       res.status(500).send({message:'Error in notification',
//       success:false,error
//     })
//     }
// }


const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;

    res.status(200).send({
      success: true,
      message: 'All notifications deleted',
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error in deleting notifications', success: false });
  }
};

// get all doctor
const getAllDoctorsController = async(req,res) => {
  try{
    const doctors = await doctorModel.find({status:'approved'})
    res.status(200).send({
      success: true,
      message:'Doctor list Fetch successfully',
      data:doctors
    })
  }
  catch(error){
    console.log(error)
    res.status(500).send({success:false,error,message:'Error While Fetching Doctor'})
  }
}


//book appointment
const bookAppointmentController = async(req,res) => {
    try{
      req.body.date = moment(req.body.date,'DD-MM-YYYY').toISOString();
      req.body.time = moment(req.body.time, 'HH:mm').toISOString();
        req.body.status= 'pending'
        const newAppointment = new appointmentModel(req.body)
        await newAppointment.save()
        const user = await userModel.findOne ({_id: req.body.doctorInfo.userId})
        user.notification.push({
          type:'New-appointment-request',
          message:`A New Appointment Request from ${req.body.userInfo.name}`,
          onClickPath:'/user/appointments'
        })
        await userModel.save();
        res.status(200).send({success:true, message:'Doctor is Appointmented'})
    }
    catch(error){
      console.log(error);
      res.status(500).send({success:false,error,message:'Error while booking for the Doctor'})
    }
}


const bookingAvailabilityController = async() => {
  try{
    const date  = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm").subtract(1,'hours').toISOString()
    const toTime = moment(req.body.time, 'HH:MM').add(1,'hours').toISOString()
    const doctorId = req.body.doctorId
    const appointments = await appointmentModel.find({doctorId,
      date,
      time:{$gte:fromTime, $lte:toTime}
    })
    if(appointmentModel.length > 0){
      return res.status(200).send({success:true, message:'Appointment not Available at this time',})
    }
    else{
      return res.status(200).send({success:true, message:'Appointments Available '})
    }
  }
  catch(error){
    console.log(error)
    res.status(500).send({success:false, error, message:'Error in booking'})
  }
}


const userAppointmentController = async() => {
  try{
    const appointments = await appointmentModel.find({userId:req.body.userId})
    res.status(200).send({success:true, message:'users Appointments fetch successfully',data: appointments})
  }
  catch(error){
    console.log(error)
    res.status(500).send({success:false,error,message:'Error in uploading Appointment list'})
  }
}

module.exports = { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController ,bookingAvailabilityController, userAppointmentController}