const { getOrderByIdController, getUserByIdController } = require("../controllers");
const { sendNotificationFunction } = require("../firebase/controller");
const { getIo } = require("../utilities/io")

const triggerDispatchRequestController = async (req, res) => {
    const orderId = req.body.orderId;
    const Order = await getOrderByIdController(orderId);
    if (Order.error) {
        console.log("Order.error", Order.error)
        return res.status(400).json({
            error: Order.error,
            message: "Order not found"
        });
    }
    const sender = await getUserByIdController(Order.data.user_id);
    if (sender.error) {
        console.log("sender.error", sender.error)
        return res.status(400).json({
            error: sender.error,
            message: "Sender not found",
            data: Order.data.user_id
        });
    }

    // sender.data.fcmToken
    // res.send(sender.data.email);

    const io = getIo()
    io.emit('dispatchRequestUpdated', {
        rider: req.body.riderID,
        orderId: req.body.orderId,
        notify: {
            title: "Dispatch Request Updated",
            message: `The dispatch request has been updated`,
            image: `https://yqmlwjrkxnamjkzbxbbo.supabase.co/storage/v1/object/public/assets/Group_50.png`
        }
    });
    // console.log("dispatchRequestUpdated emitted", req.body.email)
    sendNotificationFunction({
        audience: "SINGLE",
        image: `https://firebasestorage.googleapis.com/v0/b/guru-logistics.firebasestorage.app/o/Group.svg?alt=media&token=b8881cd8-8c79-4ab5-887c-3c4e29c9c293`,
        title: "Dispatch Request Updated",
        message: `The dispatch request has been updated`,
        email: req.body.email,
    })

    sendNotificationFunction({
        audience: "SINGLE",
        image: `https://firebasestorage.googleapis.com/v0/b/guru-logistics.firebasestorage.app/o/Group.svg?alt=media&token=b8881cd8-8c79-4ab5-887c-3c4e29c9c293`,
        title: "Dispatch Request Updated",
        message: `The dispatch request has been updated`,
        email: sender.data.email,
    })

    // console.log("Dispatch request triggered successfully", Order.data.user_id, sender.data.email)

    return res.send({
        success: true,
        message: "Dispatch request triggered successfully",
    })
}

const triggerSocket = async (req, res) => {
    const orderId = req.body.orderId;
    const Order = await getOrderByIdController(orderId);
    if (Order.error) {
        console.log("Order.error", Order.error)
        return res.status(400).json({
            error: Order.error,
            message: "Order not found"
        });
    }
    const io = getIo()
    io.emit('dispatchRequestUpdated', {
        rider: req.body.riderID,
        orderId: req.body.orderId,
        notify: {
            title: "Dispatch Request Updated",
            message: `The dispatch request has been updated`,
            image: `https://yqmlwjrkxnamjkzbxbbo.supabase.co/storage/v1/object/public/assets/Group_50.png`
        }
    });
    console.log("dispatchRequestUpdated emitted", req.body.orderId)
    return res.send({
        success: true,
        message: "Dispatch request triggered successfully",
    })
}

module.exports = {
    triggerDispatchRequestController,
    triggerSocket
}