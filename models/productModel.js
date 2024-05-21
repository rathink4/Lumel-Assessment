const { ObjectId } = require('bson')
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productID: {
        type: String,
        require: [true, "There should be a product id :/"],
        unique: true,
    },
    name: {
        type: String,
        require: [true, "There should be a product name :/"],
        unique: true,
    },
    category: {
        type: String,
        require: [true, "There must be a category to which it belongs :/"],
    },
    region: {
        type: String,
        require: [true, "There must be a region in which it exists:/"],
    },
    price: {
        type: Number,
        require: [true, "Price is necessary :/"],
    }
})

const product = mongoose.model("product", productSchema)
module.exports = product