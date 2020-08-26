const express = require('express')
const mongoose = require("mongoose");
const editordata = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var jwtDecode = require('jwt-decode');


const Editor = require('../models/Editor')
editordata.use(cors())
process.env.SECRET_KEY = 'secret'
process.env.JWT_SECRET ='jwt_secret'

const validUser = (req,res,next) => {
  var token = req.header('auth');
  req.token = token;
  next();
}

editordata.post('/quill',validUser,(req, res) => {
    const today = new Date()
    const userData = {
      title: req.body.title,
      data:req.body.data,
      email:req.body.email
    }
    Editor.findOne({
        title: req.body.title,
      })
      .then(user => {
        EditorRoutes.create(userData)
        .then(user => {
          res.json({ status: user.title + 'Poasted!' })
        })
        .catch({})
      })

      .catch(err => {})
  })


    editordata.get('/quilldata',validUser, (req, res) => {
      Editor.find({  })
          .then((data) => {
              res.send(data)
          })
          .catch((error) => {
              console.log('error: ', daerrorta);
          });
      });
  
      editordata.delete('/quilldata/delete/:id',validUser, function(req, res) {
        Editor.findByIdAndDelete(req.params.id)
        .then(() => res.json('Story Deleted'))
        .catch(err => res.status(400).json('error' + err))
      })

  module.exports= editordata


