const express = require('express')
require('dotenv').config({path: './config/.env'});
require('./config/db');
const userRoutes = require('./Routes/user.route');
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');



const app = express()


const corsOption = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOption));


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});

app.use('/api/user', userRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})