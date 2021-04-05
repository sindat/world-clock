// init project with requirements
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
// SERVE index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



// IF NO TIMESTAMP PARAMETER IS PASSED
app.get('/api/timestamp/', (req,res) => {
  res.json({"unix": Date.now(), "utc": Date()});
});

app.get('/api/timestamp/:userInputDate?', (req, res) => {

  let userInputDateStringParam = req.params.userInputDate;
  
  // check if passed in date is a unix time - 5 consecutive numbers
  if (/\d{5,}/.test(userInputDateStringParam)){
    
    // convert passed in query string into a number
    const inputDateToNumber = parseInt(userInputDateStringParam);
    
    // convert passed in query timestamp converted to NUMBER to a standard date display
    const inputDateToDateFormat = new Date(inputDateToNumber).toUTCString();
    

    // returning the JSON object
    returningTimeObject = {'unix': inputDateToNumber, 'utc': inputDateToDateFormat};
    res.json(returningTimeObject);

  // IF CLASSIC DATE PARAMETER IS PASSED
  } else {
    // parse user input string as a date object
    dateObject = new Date(userInputDateStringParam);
    
    // check if passed in date object is invalid
    if (dateObject.toString() === 'Invalid Date') {
      res.json({ error : "Invalid Date" });
    } else {
      res.json({unix: dateObject.valueOf(), utc: dateObject.toUTCString()});
    }

    
        
  } ;
  
  


});


  

// regex - check at least 5 consecutive numbers = it will be a timestamp
// dateStringTest = 2830-7321
// console.log(/\d{5,}/.test(dateStringTest));

// type test for Date() objects
dateNoInstanceTest = new Date('2015-13-25');
console.log(typeof dateNoInstanceTest);
console.log(dateNoInstanceTest);
dateNoInstanceTestString = dateNoInstanceTest.toString();
console.log(dateNoInstanceTestString);
console.log(typeof dateNoInstanceTestString);





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
