const mongoose = require('mongoose')

const EmployerjobSchema = new mongoose.Schema({
    date: String,
    logoImage: String,
    bannerImage: String,
    jobTitle: String,
    jobDescription: String,
    category: String,
    type: String,
    applicationDeadlineDate: String,
    jobApplyType: String,
    externalURLforApplyJob: String,
    jobApplyEmail: String,
    phoneNumber: Number,
    salaryType: String,
    minSalary: Number,
    maxSalary: Number,
    gender: String,
    tag: String,
    industry: String,
    qualification: String,
    careerLevel: String,
    experience: String,
    friendlyAddress: String,
    location: String,
    Maxsalary:Number

})

const EmployerjobModel = mongoose.model('EmployerjobSchema', EmployerjobSchema)

module.exports = EmployerjobModel;