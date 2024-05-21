const { ObjectId } = require('bson')
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        require: [true, "There should be a order id :/"],
        unique: true,
    },
    dateOfSale: {
        type: Date
    },
    quantitySold: {
        type: Number,
        require: [true, "There must some quantity that is sold :/"],
    },
    discount: {
        type: Number,
    },
    shippingCost: {
        type: Number,
        require: [true, "keep the tabs on the shipping cost for a product :/"],
    },
    paymentMethod: {
        type: String,
        require: [true, "customer must have used some payment method for the payment to occur :/"],
    },
})

const order = mongoose.model("order", orderSchema)
module.exports = order