const customerController = require("../models/customerModel")

// get all the customer available
exports.getAllCustomers = async (req, res, next) => {
    try{
        const allCustomers = await customerController.find()
        res.status(200).json({
            status: 'Success',
            results: allCustomers.length,
            data: {
                allCustomers
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

// find the a particular customer using the id
exports.findCustomer = async (req, res, next) => {
    try{
        const customer = await customerController.findById(req.params.id)
        res.status(200).json({
            status: 'Success',
            data: {
                customer
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

// create/add a new customer
exports.createCustomer = async (req, res, next) => {
    try{
        const customer = await customerController.create(req.body)
        res.status(200).json({
            status: 'Success',
            data: {
                customer
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

// update an existing customer
exports.updateCustomer = async (req, res, next) => {
    try{
        const updatedCustomer = await customerController.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        res.status(200).json({
            status: 'Success',
            data: {
                updatedCustomer
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

// delete an existing customer
exports.deleteCustomer = async (req, res, next) => {
    try{
        const deletedCustomer = await customerController.findByIdAndDelete(req.params.id)
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