const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const mongoose = require('mongoose');
const pgClient = require("./postgres");

require('dotenv/config');

const app = express()
const port = 3000
var path = require('path');
var usersRouter = require("./routes/users");
var booksRouter = require("./routes/books");
var postsRouter = require("./routes/posts");
	
var requestIp = require('request-ip');

const logRequestStart = (req, res, next) => {
  console.log(`${req.url} ${requestIp.getClientIp(req)} ${Date.now().toString()}`) 
  
  res.on('finish', () => {
      console.info(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`)
  })
  next()
}

app.use(logRequestStart);

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/users", usersRouter);
app.use("/books", booksRouter);
app.use("/posts", postsRouter);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {  
  res.send('NodeJS web api is started!')
})

mongoose.connect("mongodb+srv://MongoFeng:Mongo_2022@cluster0.0xjvk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", () => {
  console.log('Connected to MongoDB')
});

pgClient.connect().then(res => {
  console.log("postgres database connected");
}).catch(err => {
  console.log(err);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})