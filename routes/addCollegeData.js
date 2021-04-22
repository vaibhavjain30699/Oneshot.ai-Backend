const router = require('express').Router();
let CollegeModel = require('../models/collegeModel');

router.route('/').post((req,res) => {

    const collegeData = new CollegeModel({
        ID: req.body.id,
        Name: req.body.name, 
        Year_founded: req.body.year_founded, 
        City: req.body.city, 
        State: req.body.state, 
        Country: req.body.country, 
        No_of_Students: req.body.Nstudents, 
        Courses: req.body.courses,
    });

    collegeData.save().then(() => res.json("User added")).catch(err => res.status(400).json("Error", err));
});

router.route('/addFakeData').patch((req,res) => {
    const fakeData = [];
    const cities = ["Ghaziabad", "Hyderabad", "Noida", "Ghaziabad", "Agra", "Gwalior", "Guwahati", "Noida", "Gwalior","Agra", "Noida", "Warangal", "Gwalior", "Durgapur", "Dhanbad", "Silchar"];
    const states = ["Uttar Pradesh", "Telangana", "Uttar Pradesh", "Uttar Pradesh", "Uttar Pradesh", "Madhya Pradesh", "Assam", "Uttar Pradesh", "Madhya Pradesh", "Uttar Pradesh", "Uttar Pradesh", "Telangana", "Madhya Pradesh", "West Bengal", "Jharkhand", "Assam"]
    const colleges = [
        "ABES Ghaziabad", "SP College Hyderabad", "Amity University Noida",
        "Makhanlal College Ghaziabad", "DD College Agra", "IIIT Gwalior", "IIT Guwahati",
        "Galgotias College Noida", "ITM Gwalior", "KVS College Agra",
        "GNIT Noida", "ITI Warangal", "MITS Gwalior",
        "NIT Durgapur", "ISM Dhanbad", "NIT Silchar"
        ];
    const names = ["Vaibhav Jain","Abhishek Garain","Ashish Kirti Singh", "Amit Kumar Burman", 
    "Kalp Varshney", "Aryan Bhardwaj", "Vaibhav Krishan", "Abhishek Upmanyu", "Anubhav Singh Bassi", 
    "Bhuvam Bam", "Ashish Chanchlani", "Sandeep Jain", "Ayush Mehra", "Vaibhav Pandey", 
    "Yo Yo Honey Singh", "Apoorva Arora", "Barkha Singh", "Ahsaas Channa", "Revathi Pillai", 
    "Naveen Polishetty"];
    const courses = [["Computer Science", "Physics"],["Computer Science", "Electronics"],["Mechanical", "Electronics"]]
    for(var i=0;i<100;i++)
    {
        fakeData.push({
            ID: i,
            Name: colleges[i%16], 
            Year_founded: i<=9 ? "202"+i : "20" + i, 
            City: cities[i%16], 
            State: states[i%16], 
            Country: "India", 
            No_of_Students: "50", 
            Courses: courses[i%3],
        });
    }
    const collegeData = CollegeModel.insertMany(fakeData).then(function(){
        console.log("Data inserted");
        res.json("Fake Users Added");  
    }).catch(function(error){
        res.status(400).json(error);     
    });
});

module.exports = router;