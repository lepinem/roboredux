//dal.js

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/robodb'
let robots = []

function getAllDocs (err, db) {
  const collection = db.collection('robots')
  // console.log(err)
  const documents = []
  collection.find({}).toArray(function (err, docs) {
    robots = docs
    // console.log(robots);
    // db.close()
  })
}

function getAllRobots () {
  return newPromise((resolve, reject) => {
    const collection = db.collection('robots')
    MongoClient.connect(url, function (err, db) {
      // console.log(db)
      collection.find({}).toArray(function (err, docs) {
        // console.log(docs)
        resolve(docs)
        reject(err)
      })
    })
  })
}

function getUnemployed(){
  let unemployedRobots = []
    for (var i=0; i<robots.length; i++) {
      if (robots[i].job == null){
        unemployedRobots.push(robots[i])
      }
    }
    return unemployedRobots
}


// Use connect method to connect to the server

function connectMongodb (url, cb) {
  MongoClient.connect(url, cb)
}

function getRobots() {
  connectMongodb(url, getAllDocs)
  // console.log(robots);
  return robots
}

function getRobot(robotId) {
  let selectRobot = []
  for (var i=0; i<robots.length; i++) {
    if (robots[i].id == robotId) {
      selectRobot = robots[i];
    }
  }
  console.log(selectRobot);
}


module.exports = { getRobots, getAllRobots, getUnemployed, getRobot



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
