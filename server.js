const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./schema');
const userController = require('./userController');
const sessionController = require('./sessionController');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
const PORT = 3000;

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) console.log(err);
  else console.log('Connected to database...');
});

app.get('/', (req, res) => {
  // console.log(__dirname);
  res.sendFile(`${__dirname}/login.html`);
});

app.get('/login.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'login.js'));
});

app.post('/loginUser',
  userController.verifyUser,
  sessionController.setSessionCookie,
  sessionController.startSession,
  (req, res) => {
    console.log('server');
    if (res.locals.verified) {
      res.status(200);
      res.send();
    } else {
      res.status(404);
      res.send();
    }
  });

app.get('/secret', (req, res) => {
  // console.log(__dirname);
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/index.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.js'));
});

app.get('/style.css', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'style.css'));
});

app.post('/form', (req, res) => {
  // console.log(req.body);
  User.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});

app.get('/getMessages', (req, res) => {
  // console.log(1);
  User.find({}, (err, result) => {
    if (err) console.log(err);
    else res.json(result);
  });
});

app.delete('/deleteMessage', (req, res) => {
  const { _id } = req.body;
  console.log({ _id });
  User.findOneAndDelete({ _id }, (err, result) => {
    if (err) console.log(err);
    else console.log('Delete successful');
  });
});

app.patch('/updateMessage', (req, res) => {
  const { _id, username, password } = req.body;

  User.findOneAndUpdate({ _id }, { $set: { username, password } }, { upsert: true, new: true })
    .then((data) => {
      // console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/signup', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'signup.html'));
});

app.get('/signup.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'signup.js'));
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('Listening...');
});
