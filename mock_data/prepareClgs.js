const fs = require('fs')

fs.readFile('./aa.json', 'utf8' , async (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let clgs = [];
  var i = 1;
  const year_founded = ["2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"];
  const courses = [["Computer Science", "Physics"],["Computer Science", "Electronics"],["Mechanical", "Electronics"]]
  let states = {};

  await JSON.parse(data).data.forEach(ele => {
        clgs.push({
          "Name" : (ele[2].split(' ('))[0],
          "City": ele[4],
          "State": ele[1],
          "Country": "India",
          "Year_founded": year_founded[i%10],
          "Courses": courses[i%3],
          "No_of_Students": ele[1] in states ? states[ele[1]] + 100 : states[ele[1]] = (i%4)*100
        });
        i++;
  });
  console.log(clgs);
  fs.writeFileSync('collegeData.json', JSON.stringify(clgs))
})