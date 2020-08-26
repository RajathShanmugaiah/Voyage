const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const passport = require ("passport");
const keys = require('./configuration/index');
const GoogleStratergy = require ("passport-google-oauth20").Strategy;

var port = process.env.PORT || 7000


const app = express();

app.use(express.static(path.join(__dirname,'client','build')));
app.get('/', (req,resp) => {
   console.log('helloworld!');
  resp.sendFile(path.join(__dirname,'client','build','index.html'));
});

app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)


//passport.use(
//    new GoogleStratergy(
//        {
//            clientID : keys.googleClientID ,
//            clientSecret: keys.googleClientSecret ,
//            callbackURL : "/auth/google/callback"
//        },
//        (accessToken,refreshToken,profile,done) => {
//            console.log("accessToken",accessToken)
//            console.log("refreshToken",refreshToken)
//            console.log("profile",profile)
//            console.log("done",done)
//        }
//        )
        
//)


const mongoURI = 'mongodb+srv://rajath:rajath_123@cluster0-iyag8.mongodb.net/test?retryWrites=true&w=majority';

mongoose
  .connect(mongoURI, {useNewUrlParser: true})
  .then(() => console.log("MongoDB connected")
  )

  var Users = require('./routes/Users')
  var EditorSchema = require('./routes/EditorRoutes')
  app.use('/users', Users)
  app.use('/editordata', EditorSchema)
  app.use('/facebookusers',FacebookUser)
  //app.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }))
  //app.get('/auth/google/callback', passport.authenticate('google', { scope: ['profile','email'] }));


const server = app.listen(port, function(){
    console.log("Server is running on port:"  + port);
}); 

module.exports = server;
