const { model, Schema } = require('mongoose');

const turtleSchema = new Schema({
  name: String,
  role: String
}, {
  timestamps: true
})


module.exports = model('Turtle', turtleSchema)
