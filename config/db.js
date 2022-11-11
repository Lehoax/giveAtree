const mongoose = require('mongoose');
mongoose
    .connect('mongodb+srv://'+process.env.DB_USER_PASS+'@cluster0.aoxy6.mongodb.net/giveAtree')
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));