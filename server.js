require('dotenv').config()
const express=require('express');
const bodyParser=require('body-parser');
var cors = require('cors')



const Course=require('./model/Course');
const db = require('./database/db');
const courseRouter = require('./route/courseRouter');
const userRouter=require('./route/userRouter')


const app=express();

const PORT=process.env.PORT||3080
// const corsOptions = {
//   origin: "http://localhost:3081"
// };

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true}));
app.listen(PORT,()=>console.log(`Listening on ${PORT}`));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});


const initAPIs = require("./route/authRouter");
initAPIs(app)
app.use(courseRouter);
app.use(userRouter);

app.get('/',(req,res)=>{
    res.send('http://localhost:3000/course');
})
