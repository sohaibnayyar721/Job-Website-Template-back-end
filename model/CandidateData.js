const mongoose = require('mongoose')

const EmployerjobSchema = new mongoose.Schema({

    fullName:String,
    dateOfBirth:String,
    phoneNumber:Number,
    email:String,
    gender:String,
    age:String,
    salary:Number,
    salaryType:String,
    qualification:String,
    experienceTime:String,
    categories:[String],
    languages:[String],
    tags:String,
    showMyProfile:String,
    profileUrl:String,
    aboutMe:String,
    friendlyAddress:String,
    Location:String,
    mapsLocation:String,
    introductionVideoURL:String,
})

const EmployerjobModel = mongoose.model('EmployerjobSchema',EmployerjobSchema)

module.exports = EmployerjobModel;