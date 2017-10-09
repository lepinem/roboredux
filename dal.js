//dal.js

const mongoose = require('mongoose')
const Robot = require('./model/Robot')
mongoose.Promise = require('bluebird')
const url = 'mongodb://localhost:27017/robodb'
mongoose.connect(url, {
  useMongoClient: true
})

function getAllRobots() {
  return Robot.find()
}

function addNewRobot(newRobot){
  const robot = new Robot(newRobot)
  robot.save(function(err){
    console.log(err)
  })
  return Promise.resolve('success')
}

function getRobotById(robotId) {
  return Robot.findOne({'_id': robotId}) .catch(function(err){
    console.log(err)
  })
}

function editRobot(robotId, updatedRobot) {
  Robot.update({'_id': robotId,}, updatedRobot, {upsert: true}, function(err, doc) {
    console.log(doc, 'from editRobot dal method')
  })
}

function deleteRobot (robotId) {
  Robot.deleteOne({'_id': robotId})
  .catch(function(err){
    console.log(err)
  })
}

// function checkLogin()

module.exports = {
  getAllRobots,
  addNewRobot,
  getRobotById,
  editRobot,
  deleteRobot,
  // checkLogin

}



////////////////////////////////////////////////////////
/////////////////       LEGACY      ////////////////////
////////////////////////////////////////////////////////
// const robotsData = require('./data')
// const robots = robotsData.users
//
// function getRobots() {
//   return robots
// }
//
// function getRobot (robotId) {
//   var selectRobot = {}
//   for (var i=0; i<robots.length; i++) {
//     if (robots[i].id == robotId) {
//       selectRobot = robots[i]
//     }
//   }
//   return selectRobot
// }
//
// function addRobot (newRobot) {
//   robots.push(newRobot)
//   return robots
// }
//
//
// module.exports = {
//   getRobots: getRobots,
//   getRobot: getRobot,
//   addRobot: addRobot
// }
