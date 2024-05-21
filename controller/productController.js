const productControler = require("../models/productModel")

// get all the products available
exports.getAllProducts = async (req, res, next) => {
    try{
        const allProducts = await productControler.find()
        res.status(200).json({
            status: 'Success',
            results: allProducts.length,
            data: {
                allProducts
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

// find the a particular product using the id
exports.findProduct = async (req, res, next) => {
    try{
        const product = await productControler.findById(req.params.id)
        res.status(200).json({
            status: 'Success',
            data: {
                product
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

// create/add a new product
exports.createProduct = async (req, res, next) => {
    try{
        const product = await productControler.create(req.body)
        res.status(200).json({
            status: 'Success',
            data: {
                product
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

// update an existing product
exports.updateProduct = async (req, res, next) => {
    try{
        const updatedProduct = await productControler.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        res.status(200).json({
            status: 'Success',
            data: {
                updatedProduct
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

// delete an existing product
exports.deleteProduct = async (req, res, next) => {
    try{
        const deletedProduct = await productControler.findByIdAndDelete(req.params.id)
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