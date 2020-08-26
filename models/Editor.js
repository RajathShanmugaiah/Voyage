const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const EditorSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  data:{
    type:String,
    required: true
  },
  email:{
    type:String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = EditorRoutes = mongoose.model('editordata', EditorSchema)


