const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/User')
const FacebookUser = require('../models/facebookUsers')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/facebook/login',async(req,res) => {
  const today = new Date()
      const userData = {
        name:req.body.name,
        email: req.body.email,
        accessToken:req.body.accessToken,
        created: today
      }
      var userToken = await jwt.sign({email:userData.email,id:userData._id},process.env.SECRET_KEY, {
        expiresIn: 1440
      })
      res.header('auth',userToken).json(userToken);
      var data = await FacebookUser.create(userData);
      res.json(data)
})

users.post('/register', async (req, res) => {
    try{
      var emailExist = await User.findOne({email: req.body.email})
      if(emailExist){
        return res.status(400).json("Email already exists")
      }
      var hash = await bcrypt.hash(req.body.password,10)

      const today = new Date()
      const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hash,
        created: today
      }
      var data = await User.create(userData);
      res.json(data)
      res.header('auth',userData.accessToken).json(userToken);
    }
    catch
    {
      res.status(400).json(err);
    }
  })



  users.post('/login', async (req, res) => {
    try{
      var loginData = await User.findOne({email: req.body.email})
      if(!loginData){
        return res.status(400).json("Email does not exists")
      }
      else{
        var validPassword = await bcrypt.compare(req.body.password,loginData.password)
      if(!validPassword)
      {
        return res.status(400).json("Invalid password")
      }
      var userToken = await jwt.sign({email:loginData.email,id:loginData._id},process.env.SECRET_KEY, {
        expiresIn: 1440
      })
      res.header('auth',userToken).json(userToken);
      }
      
    }
    catch
    {
      res.status(400).json(err);
    }
  })


  const validUser = (req,res,next) => {
    var token = req.header('auth');
    req.token = token;
    next();
  }

  users.get('/getall', validUser,async (req, res) => {
        jwt.verify(req.token,process.env.SECRET_KEY, async (err,data) =>{
          if(err){
            res.sendStatus(403)
          }
          else{
            const data = await User.find()
            res.json(data);
          }
        })
  });

  users.get('/profile',validUser,(req, res) => {

    var decoded = jwt.verify(req.token, process.env.SECRET_KEY)
    User.find({email:decoded.email})
    const user ={
      _id : decoded._id,
      email :decoded.email,
      first_name:decoded.first_name
    }
  
    res.json(user)
  })

  
  module.exports= users