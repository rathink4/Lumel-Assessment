const express = require("express")
const customerController = require("../controller/customerController")

const router = express.Router()

// localhost:8000/api/v1/
router.route("/").get(customerController.getAllCustomers).post(customerController.createCustomer)

// localhost:8000/api/v1/id
router.route("/:id").get(customerController.findCustomer).patch(customerController.updateCustomer).delete(customerController.deleteCustomer)

module.exports = router