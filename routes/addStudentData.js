const router = require('express').Router();
let StudentModel = require('../models/studentModel');

router.route('/').post((req,res) => {

    const StudentData = new StudentModel({
        ID: req.body.id,
        Name: req.body.name, 
        Year_of_batch: req.body.year_of_batch, 
        College_id: req.body.college_id, 
        Skills: req.body.skills,
    });
    studentData.save().then(() => res.json("Student added")).catch(err => res.status(400).json("Error", err));
});

router.route('/addFakeData').patch((req,res) => {
    const fakeData = [];

    const names = ["Vaibhav Jain","Abhishek Garain","Ashish Kirti Singh", "Amit Kumar Burman", 
    "Kalp Varshney", "Aryan Bhardwaj", "Vaibhav Krishan", "Abhishek Upmanyu", "Anubhav Singh Bassi", 
    "Bhuvam Bam", "Ashish Chanchlani", "Sandeep Jain", "Ayush Mehra", "Vaibhav Pandey", 
    "Yo Yo Honey Singh", "Apoorva Arora", "Barkha Singh", "Ahsaas Channa", "Revathi Pillai", 
    "Naveen Polishetty"];

    const skills = [["C++", "Java", "Python"],["Python", "Android", "ML"],["C++", "JavaScript"],["Java", "Spring"]];
    
    for(var i=0;i<100;i++)
    {
        fakeData.push({
            ID: i,
            Name: names[i%20], 
            Year_of_batch: (i%4)+1, 
            College_id: i%30, 
            Skills: skills[i%4], 
        });
    }

    const studentData = StudentModel.insertMany(fakeData).then(function(){
        console.log("Data inserted");
        res.json("Fake Students Added");  
    }).catch(function(error){
        res.status(400).json(error);     
    });
});

module.exports = router;