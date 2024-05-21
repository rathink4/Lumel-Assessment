const { ObjectId } = require('bson')
const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    customerID: {
        type: String,
        require: [true, "There should be a customer id :/"],
        unique: true,
    },
    name: {
        type: String,
        require: [true, "There should be a customer name to identify customer :/"],
    },
    email: {
        type: String,
        require: [true, "There should be an email by which customer made an account :/"],
    },
    address: {
        type: String,
        require: [true, "what address are you shipping the product :/"],
    }
})

const customer = mongoose.model("customer", customerSchema)
module.exports = customer