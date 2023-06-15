const express = require('express')
const  authMiddlewares = require('../middlewares/authMiddleware');
const { getDoctorInfoController, updateProfileController, doctorAppointmentsController, updateStatusController } = require('../controllers/doctorCtrl');

const  router = express.Router();
router.post('/getDoctorInfo',authMiddlewares,getDoctorInfoController)


router.post('updateProfile',authMiddlewares,updateProfileController)

router.post('/getDoctorBYId',authMiddlewares, getDoctorInfoController)

router.get('/doctor-appointments', authMiddlewares,doctorAppointmentsController)

router.post('/update-status',authMiddlewares,updateStatusController)

module.exports = router