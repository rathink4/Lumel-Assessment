const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fs = require('fs');
const fastcsv = require('fast-csv');
const csvtojson = require('csvtojson');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config')
const { Schema } = mongoose = require('mongoose');

const app = express()

app.use(cors({}))
app.use(express.json())

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

const orderRouter = require('./routers/orderRoutes')
const productRouter = require('./routers/productRoutes')
const customerRouter = require('./routers/customerRoutes')

const orderModel = mongoose.model('Order', orderSchema);
const productModel = mongoose.model('Product', productSchema);
const customerModel = mongoose.model('Customer', customerSchema);

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin&directConnection=true`

// TRY-CATCH in case mongodb is down and docker tries to spin up the container tyring to connect
const connectRetry = () => {
    mongoose
    .connect(mongoURL, {
        useNewUrlParser: true,
    })
    .then(() => console.log("Successfully connected to DB"))
    .catch((e) => {
        console.log(e)
        // if mongoose can't connect, then wait 5 secs and then try again. Goes for infinity.
        // Not the best way to approach it but whatever, I tried solving this edge case.
        setTimeout(connectRetry(), 5000)
    })
}

// Use the function to make sure the logic is getting used
connectRetry()

let stream = fs.createReadStream('./data.csv');
let customerData = [];
let orderData = [];
let productData = [];
let csvStream = fastcsv
  .parse()
  .on('data', (data) => {
    orderData.push({
      orderID: data[0],
      dateOfSale: data[6],
      discount: data[9],
      shippingCost: data[10],
      paymentMethod: data[11],
    })
    productData.push({
        productID: data[1],
        name: data[3],
        category: data[4],
        region: data[5],
        price: data[8],
    })
    customerData.push({
        customerID: data[2],
        name: data[12],
        email: data[13],
        address: data[14],
    })
  })
  .on('end', () => {
    orderData.shift();
    productData.shift();
    customerData.shift();
    console.log(orderData);

    mongodb.connect(
        mongoURL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    },
      (err, client) => {
        if (err) throw err;
        // Had to insert many into the schema
        //   client
        //     .db('gm-clients')
        //     .collection('clients')
        //     .insertMany(csvData, (err, res) => {
        //       if (err) throw err;
        //       console.log(`Inserted: ${res.insertedCount} rows`);
        //       client.close
        //     });
      }
    );
  });

stream.pipe(csvStream);

app.get("/api", (req, res) => {
    res.send("<h1>Hello! This is Lumel's Backend Assessment - By Rathin Kamble</h1>")
})

// If you try to hit localhost:8000/api/v1/orders, then it will use the routes orderRouter
app.use("/api/v1/orders", orderRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/customers", customerRouter)

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Listening at port : ${port}`))