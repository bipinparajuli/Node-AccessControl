// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const routes = require('./route/auth');
const db = require("./database")
const user = require('./model/user')


const app = express();

const PORT = process.env.PORT || 3000;

db.sync()
.then
(d=> console.log("DB connected"))
.catch(e=>console.log("error in connecting database"))

app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
 if (req.headers["x-access-token"]) {
  const accessToken = req.headers["x-access-token"];
  const { userId, exp } = await jwt.verify(accessToken, "secreate");
  // Check if token has expired
  if (exp < Date.now().valueOf() / 1000) { 
   return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
  } 
  res.locals.loggedInUser = await user.findOne({where:userId}); next(); 
 } else { 
  next(); 
 } 
});

app.use('/', routes); 
app.listen(PORT, () => {
  console.log('Server is listening on Port:', PORT)
})