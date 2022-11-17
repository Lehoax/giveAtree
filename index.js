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
const stripe = require('stripe')('sk_test_51M4w4eB3Qdm0mZdRiD36WVIhrccVWcExcvLAvrVMlpnAFNZRNMBn6OKzvSh2JiXxbS27rzXyfm4b00O5akJoHETJ001hesCE8t');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const YOUR_DOMAIN = 'http://localhost:5000';

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

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_type: ["card"],
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1M4wOJB3Qdm0mZdRMRLCia4B',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  })

  res.json(session.url).status(303);
});


app.use('/api/user', userRoutes);
app.use('/api/tree', treeRoutes);
app.use('/api/admin', adminAuth ,adminRoutes);
app.use('/api/square' , squareRoutes);
app.use('/api/order', requireAuth, orderRoutes);




app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})