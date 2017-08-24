//app.js

//globals and dependencies

const express = require ('express');
const app = express();
const mustacheExpress = require('mustache-Express');
const robotDal = require('./dal');
const bodyParser = require('body-parser');

//middleware

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
//routes

app.get('/', function (req, res) {
  const robots = robotDal.getRobots()
  res.render('list', {robots: robots})
})

app.post('/robots/:id', function (req, res) {
  
})


app.get('/robots/:id', function (req, res) {
  const selectRobot = robotDal.getRobot(req.params.id)
  if (selectRobot.id) {
    res.render('_robotCard', selectRobot);
  } else {
    res.send('NO Robots!!!');
  }
})



//
// app.get('/', function(req, res){
//   const people = []
//   dal.getPeople().slice(0, 10)
//     people = peeps
//   })
//   res.render('list', {people : people})
// })
app.set('port', 3000);

app.listen(3000, function () {
  console.log('server started on port: 3000')
})
