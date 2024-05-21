const express = require("express")
const orderController = require("../controller/orderController")

const router = express.Router()

// localhost:8000/api/v1/
router.route("/").get(orderController.getAllOrders).post(orderController.generateOrder)

// localhost:8000/api/v1/id
router.route("/:id").get(orderController.findOrder).patch(orderController.updateOrder).delete(orderController.deleteOrder)

module.exports = router