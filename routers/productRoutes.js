// Makes use of the controller to route to the necessary function
const express = require("express")
const productControler = require("../controller/productController.js")

const router = express.Router()

// localhost:8000/api/v1/
router.route("/").get(productControler.getAllProducts).post(productControler.createProduct)

// localhost:8000/api/v1/id
router.route("/:id").get(productControler.findProduct).patch(productControler.updateProduct).delete(productControler.deleteProduct)

module.exports = router