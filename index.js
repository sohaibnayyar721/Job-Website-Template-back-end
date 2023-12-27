const express = require('express')
const MongoDbConnect = require('./mongodbConn')
const cors = require('cors')
const multer = require('multer');
require('dotenv').config()
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb')
const employerModel = require('./model/EmployerData')

const app = express()

app.use(cors())
app.use(express.json())

MongoDbConnect()

app.post('/job/filter',async(req,res)=>{

    let {jobTitle,listLocation,category,jobTypes,minSalaray,maxSalaray,
        industry,careerLevel,experience} = req.body

    let obj = {jobTitle:jobTitle,location:listLocation,category:category,
        type:jobTypes,industry: industry, 
        careerLevel:careerLevel,
        experience:experience, 
        minSalary:{$gte:parseInt(minSalaray)},
        maxSalary:{$lte:parseInt(maxSalaray)}, 
    }

    for (let i in obj){
        if(obj[i]===""){
            delete obj[i]
        }
    }
    let FindData = await employerModel.find(obj)
    if(FindData.length === 0){

        return res.status(400).json({message:'No Jobs Found'})
    }
    console.log(FindData)
    res.send(FindData)

})

app.get('/job/:singleJobId', async (req, res) => {

try{
    const getJob = await employerModel.find({_id: req.params.singleJobId})
    if(!getJob){
        return res.status(404).json({message:"Can't found Data"})
    }

    res.status(200).json({ jobs: getJob})
}

catch(err){
    res.status(404).json({message:"Error in Single Data Api"})
}
})

// app.get('/getData', async (req, res) => {
//     const getJob = await employerModel.find({})

//     const totalJob = []
//     const count = {};

//     getJob.forEach(element => {
//         count[element.location] = (count[element.location] || 0) + 1;
//     });

//     totalJob.push(count)
    
//     res.status(200).json({ featuredJob: getJob, jobForEachCountry: totalJob })

// })

app.get('/getAllData', async (req, res) => {
    const getJob = await employerModel.find({})
    // console.log(getJob.featuredJob.minSalary)
    
    res.status(200).json({ jobsData: getJob })

})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

app.get('/', async (req, res) => {
    const getJob = await employerModel.find({})
res.send(getJob)
       
})

app.post('/employerAddJob', async(req, res) => {

    console.log(req.body)

    let {jobTitle,category,location,jobType,minSalary,
        maxSalary,date,JobApplyType,SalaryType,Experience,
        jobDescription,applicationDeadlineDate,
        externalURLforApplyJob,jobApplyEmail,
        gender,tag,industry,qualification,careerLevel,
        friendlyAddress,} = req.body

const EmployerData = new employerModel({
    date:date,
    // logoImage:String,
    // bannerImage:String,
    jobTitle:jobTitle,
    jobDescription:jobDescription,
    category:category,
    type:jobType,
    applicationDeadlineDate:applicationDeadlineDate,
    jobApplyType:JobApplyType,
    externalURLforApplyJob:externalURLforApplyJob,
    jobApplyEmail:jobApplyEmail,
    // phoneNumber:Number,
    salaryType:SalaryType,
    minSalary:minSalary,
    maxSalary:maxSalary,
    gender:gender,
    tag:tag,
    industry:industry,
    qualification:qualification,
    careerLevel:careerLevel,
    experience:Experience,
    friendlyAddress:friendlyAddress,
    location:location,
    Maxsalary:300
}) 

EmployerData.save()
res.send(EmployerData)

})

app.listen(process.env.PORT, () => {
    console.log("Server is running!!!")
})

// app.get('/getData', async (req, res) => {
//     const getJob = await jobModel.find({})

//     const totalJob = []
//     const count = {};

//     getJob.forEach(element => {
//         count[element.location] = (count[element.location] || 0) + 1;
//     });

//     totalJob.push(count)
    
//     res.json({ featuredJob: getJob, jobForEachCountry: totalJob })

// })