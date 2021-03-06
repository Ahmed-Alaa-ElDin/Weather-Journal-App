// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening(){
  console.log(`server connected ${port}`);
}

app.get('/info', function (req,res) {
  res.send(projectData);
})

// POST Route
app.post('/data', function (req, res) {
    userData = {
        temperature: req.body.temperature,
        date: req.body.date,
        feelings: req.body.feelings
    };

    projectData.temperature = userData.temperature;
    projectData.date = userData.date;
    projectData.feelings = userData.feelings;
    console.log(projectData);
});
