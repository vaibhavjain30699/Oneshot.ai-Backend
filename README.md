# Oneshot.ai-Backend Task

## This repository contains the code for the API that serves data to the frontend website.

### API URL: https://oneshot-backend1.herokuapp.com/

### Supported Endpoints:
|        Supported Endpoints       | Method |  Request Body   |
|:--------------------------------:|:------:|:---------------:|
|       /fetchSimilarColleges      |  POST  | id: _collegeID |
|     /fetchCollegeDetails/byID    |  POST  | id: _collegeID |
|   /fetchCollegeDetails/students  |  POST  | id: _collegeID |
| /fetchCollegeDetails/allColleges |  POST  |       None      |
|        /fetchStats/States        |  POST  |       None      |
|        /fetchStats/Courses       |  POST  |       None      |

### Test Locally
- Clone the Project
- Make sure latest version of node and npm is installed
- `cd Oneshot.ai-Backend`
- Install node modules using `npm install`
- Create a `.env` file with contents as
```
URL=<mongoDB URL>
```
- Serve the API using `npm start` 


### Notes on Database 
- The database name should be `AssignmentDatabase`
- The database should contain two collections, `Student` and `College`.
- You can use the mock data stored in mock_data/College.json and mock_data/Student.json

Created with ❤️ by [Vaibhav Jain](https://in.linkedin.com/in/vaibhavjain30699)
