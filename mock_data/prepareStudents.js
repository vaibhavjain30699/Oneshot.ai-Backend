const fs = require('fs')

fs.readFile('../aa.txt', 'utf8' , async (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let students = data.split(/\n/);
  console.log(students)
//   const result = new Array(Math.ceil(students.length / 100))
//   .fill()
//   .map(_ => students.splice(0, 100));
    const skills = [["C++", "Java", "Python"],["Python", "Android", "ML"],["C++", "JavaScript"],["Java", "Spring"]];
    const batch = ["2017","2018","2019","2020"];

  const firstSet = [];
  var i = 0;
  students.forEach(data => {
    firstSet.push({
        "Name": data,
        "Year_of_batch": batch[i%4],
        "Skills": skills[i%4]
    })
    i++;
  })
//   let clgs = [];
//   var i = 1;
//   const year_founded = ["2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"];
//   const courses = [["Computer Science", "Physics"],["Computer Science", "Electronics"],["Mechanical", "Electronics"]]

//   await JSON.parse(data).data.forEach(ele => {
//         clgs.push({
//           "ID": i,
//           "Name" : (ele[2].split(' ('))[0],
//           "City": ele[4],
//           "State": ele[1],
//           "Country": "India",
//           "Year_founded": year_founded[i%10],
//           "Courses": courses[i%3]
//         });
//         i++;
//   });
//   console.log(result[1]);
  fs.writeFileSync('studentData.json', JSON.stringify(firstSet))
})