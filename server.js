const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./schema');

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
  console.log(__dirname);
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/index.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.js'));
});

app.get('/style.css', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'style.css'));
});

app.post('/form', (req, res) => {
  console.log(req.body);
  User.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('Listening...');
});
