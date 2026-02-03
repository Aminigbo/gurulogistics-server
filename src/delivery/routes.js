let { Router } = require("express") 
const multer = require('multer');
let route = Router()

const { createDeliveryOrder, uploadDeliveryImage, deleteDeliveryOrder, getDeliveryOrder, getUserDeliveryOrders } = require("./controllers");
const storage = multer.memoryStorage();
const upload = multer({ storage });


route.post("/create-delivery-order", createDeliveryOrder)
route.post("/upload-delivery-image", upload.single("packageImage"), uploadDeliveryImage) 
route.delete("/delete-delivery-order/:orderId", deleteDeliveryOrder) 
route.get("/get-delivery-order/:orderId", getDeliveryOrder)
route.get("/get-delivery-orders/:userId", getUserDeliveryOrders)

module.exports = route