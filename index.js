const express = require('express')
require('dotenv').config({path: './config/.env'});
require('./config/db');
const userRoutes = require('./Routes/user.route');
const treeRoutes = require('./Routes/tree.route');
const adminRoutes = require('./Routes/admin.route');
const squareRoutes = require('./Routes/square.route');
const orderRoutes = require('./Routes/order.route');
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
const {checkUser, requireAuth, adminAuth} = require('./middleware/auth.middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const path = require('path');
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_API_KEY);



const app = express()

// use swagger-Ui-express for your app documentation endpoint
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
      
 
const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};


app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});
  

app.use('/api/user', userRoutes);
app.use('/api/tree', treeRoutes);
app.use('/api/admin', adminAuth ,adminRoutes);
app.use('/api/square' , squareRoutes);
app.use('/api/order', requireAuth, orderRoutes);




app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})