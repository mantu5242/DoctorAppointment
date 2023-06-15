const express = require("express");
const {
  loginController,
  registerController,authController,applyDoctorController,getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentController
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//AUTH || POST
router.post('/getUserData',authMiddleware, authController)

//APPLY DOCTOR || POST
router.post('/apply-Doctor', authMiddleware ,applyDoctorController)

//NOTIFICATION DOCTOR || POST
router.post('/get-all-notification', authMiddleware ,getAllNotificationController)

//DELETE NOTIFICATION  || POST
router.post('/delete-all-notification', authMiddleware ,deleteAllNotificationController)

//GET ALL DOCTORS
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)

//BOOK APPOINTMENTS
router.post('/book-appointment',authMiddleware,bookAppointmentController)

//BOOKING AVAILABILITY
router.post('/booking-availability',authMiddleware,bookingAvailabilityController)

//APPOINTMENT LIST
router.get('/user-appointments', authMiddleware,userAppointmentController);

module.exports = router;
