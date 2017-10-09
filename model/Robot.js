// Robot.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const RobotSchema = new Schema({
  id: { type: Number },
  username: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  avatar:  { type: String },
  email: { type: String, require: true, unique: true },
  universtity: { type: String },
  job: { type: String },
  company: { type: String },
  skills: { body: String },
  phone: { type: String },
  address: {
    street_num: { type: String },
    street_name: { type: String },
    city: { type: String },
    state_or_province: { type: String },
    postal_code: { type: String },
    country: { type: String}
  },
  password: { type: String, required: true }
})

RobotSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) {
    next()
  }

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(Robot.password, salt, function (err, hash) {
    Robot.password = hash
    Robot.updated_at = new Date().toISOString()
    next()
    console.log('line 39 model' + Robot.password)
  })
})
})

RobotSchema.methods.comparePassword = (pwd, dbPass, done) => {
// pwd = plain text
bcrypt.compare(pwd, dbPass, (err, isMatch) => {
  done(err, isMatch)
})
}

RobotSchema.statics.findByEmail = (email, cb) => {
  return this.find({ email: email })
}

const Robot = mongoose.model('Robot', RobotSchema)

module.exports = Robot
