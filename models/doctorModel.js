// const mongoose = require('mongoose');

// const doctorSchema = new mongoose.Schema(
//     {
//         userId:{
//             type:String,
//         },
//         firstName:{
//             type:String,
//             require:[true,'first name is required']
//         },
//         lastName:{
//             type:String,
//             require:[true,'last name is required']
//         },
//         phone:{
//             type:String,
//             required:[true,'phone no is required']
//         },
//         email:{
//             type:String,
//             required:[true,'email is required']
//         },
//         website:{
//             type:String,
//             required:[true,'email is required']
//         },
//         address:{
//             type:String,
//             required:[true,'address is required']
//         },
//         specialization:{
//             type:String,
//             required:[true,'specialization is required']
//         },
//         experience:{
//             type:String,
//             required:[true,'experience is required']
//         },
//         feesPerConsultation:{
//             type:Number,
//             require:[true,'fee is require']
//         },
//         status:{
//             type:String,
//             default:'pending'
//         },
//         timings: {
//            type:Object,
//            require:[true, 'timings is require']
//           },
//     },   
//     { timestamps:true}
// );

// const doctorModel = mongoose.model('doctors',doctorSchema);
// module.exports = doctorModel;





const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
        },
        firstName:{
            type:String,
            require:[true,'first name is required']
        },
        lastName:{
            type:String,
            require:[true,'last name is required']
        },
        phone:{
            type:String,
            required:[true,'phone no is required']
        },
        email:{
            type:String,
            required:[true,'email is required']
        },
        website:{
            type:String,
            required:[true,'email is required']
        },
        address:{
            type:String,
            required:[true,'address is required']
        },
        specialization:{
            type:String,
            required:[true,'specialization is required']
        },
        experience:{
            type:String,
            required:[true,'experience is required']
        },
        feesPerConsultation:{
            type:Number,
            require:[true,'fee is require']
        },
        status:{
            type:String,
            default:'pending'
        },
        timings: {
            startTime: {
              type: String,
              required: [true, 'Start time is required'],
            },
            endTime: {
              type: String,
              required: [true, 'End time is required'],
            },
          },
    },   
    { timestamps:true}
);

const doctorModel = mongoose.model('doctors',doctorSchema);
module.exports = doctorModel;
