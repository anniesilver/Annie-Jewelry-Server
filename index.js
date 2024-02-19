const express = require('express');
const bodyParser = require('body-parser');
const ordersRoutes = require('./routes/orders-routes');
const productsRoutes = require('./routes/products-routes');
const usersRoutes = require('./routes/users-routes');
const cors = require("cors");

require('dotenv').config();
const PORT = process.env.PORT || 9000;

const base = "https://api-m.sandbox.paypal.com";
const server = express();
server.use(cors());
server.use(express.json());
server.use(bodyParser.json());

server.use("/images", express.static("./public/images"));


server.use('/users', usersRoutes);
server.use('/products', productsRoutes);
server.use('/orders', ordersRoutes);


server.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});