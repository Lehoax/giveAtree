const express = require('express')
require('dotenv').config({path: './config/.env'});
const app = express()
require('./config/db');



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})