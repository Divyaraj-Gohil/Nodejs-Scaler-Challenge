/* Importing the express */
const express = require("express");

/* Initializing express */
const app = express();

/* Function for Logging Data */
function loggingMiddleware(req, res, next) {
  const TimeStamp = new Date().toDateString();
  const Method = req.method;
  const URL = req.url;

  console.log(`TimeStamp: ${TimeStamp}`);
  console.log(`Method: ${Method}`);
  console.log(`URL: ${URL}`);
  console.log(req.headers);
  console.log(req.body);

  next();
}
app.get('/',(req,res)=>{res.send('data noted down')})
app.use(express.json());
app.use(loggingMiddleware);

/* Listening on port */
app.listen(3000);