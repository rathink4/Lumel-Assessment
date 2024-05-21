const orderController = require("../models/orderModel")

// get all the orders available
exports.getAllOrders = async (req, res, next) => {
    try{
        const allOrders = await orderController.find()
        res.status(200).json({
            status: 'Success',
            results: allOrders.length,
            data: {
                allOrders
            }
        })
    }
    catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed :('
        })
    }
}

// find the a particular order using the id
exports.findOrder = async (req, res, next) => {
    try{
        const order = await orderController.findById(req.params.id)
        res.status(200).json({
            status: 'Success',
            data: {
                order
            }
        })
    }
    catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed :('
        })
    }
}

// create/add a new order
exports.generateOrder = async (req, res, next) => {
    try{
        const order = await orderController.create(req.body)
        res.status(200).json({
            status: 'Success',
            data: {
                order
            }
        })
    }
    catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed :('
        })
    }
}

// update an existing order
exports.updateOrder = async (req, res, next) => {
    try{
        const updatedOrder = await orderController.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        res.status(200).json({
            status: 'Success',
            data: {
                updatedOrder
            }
        })
    }
    catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed :('
        })
    }
}

// delete an existing order
exports.deleteOrder = async (req, res, next) => {
    try{
        const deletedOrder = await orderController.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: 'Success',
        })
    }
    catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed :('
        })
    }
}