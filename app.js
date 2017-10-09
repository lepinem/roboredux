//app.js

//globals and dependencies

const express = require ('express')
const app = express()
const mustacheExpress = require('mustache-Express')
const {getAllRobots, addNewRobot, getRobotById, editRobot, deleteRobot, checkLogin} = require('./dal')
const bodyParser = require('body-parser')
const mongoose = require ('mongoose')

//middleware

app.engine('mustache', mustacheExpress())

app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//routes
/////////////////////  LOGIN  ////////////////////////////

app.get('/', (req, res) => {
  res.redirect('./login')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login', (req, res) => {
  Robot.findOne({ username: req.body.username }, 'username password', function (err, user, next) {
    if (err) {
      return next(err)
    }
    if (!user) {
      console.log("user", user)
      return res.redirect("./login")
    }
})
})

///////////////////// REGISTER ////////////////////////////
app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', (req, res) => {
  dal.addRobot(req.body)
  res.redirect('/robots')
})

///////////////////  ALL ROBOTS  ///////////////////////

app.get('/robots', (req, res) => {
  getAllRobots().then(function(robots) {
    res.render('list', {robots})
  })
})

////////////////////  ADD ROBOTS  ///////////////////////

app.get('/addRobot',(req, res) => {
  res.render('addRobot')
})

app.post('/robots', (req, res) => {
  addNewRobot(req.body)
  res.redirect('/robots')
})

////////////////////  SELECT ROBOT  /////////////////////

app.get('/robots/:_id', (req, res) => {
  const selectRobot = getRobotById(req.params.id)
    res.render('_robotCard', selectRobot)
})

app.post('/robots/:_id', (req, res) => {
  res.redirect('./robots/{{_id}}')
})

////////////////////  EDIT ROBOT  ////////////////////////

app.get('/edit/:_id', (req, res) => {
  const editedRobot = getRobotById(req.params.id).then()
  res.render('editRobot', {editedRobot})
})

app.post('/edit/:_id', (req, res) => {
  editRobot(req.params.id, req.body)
    res.redirect('/robots/list')
})

///////////////////  DELETE ROBOT ////////////////////////

app.get('/delete/:_id', (req, res) => {
  deleteRobot(req.params.id)
    res.render('./list')
})

app.post('/delete/:_id', (req, res) => {
  deleteRobot(req.params.id)
    res.redirect('/robots/list')
})

////////////////////  LOCAL HOST  ////////////////////////
app.set('port', 3000)

app.listen(3000, function () {
  console.log('server started on port: 3000')
})
