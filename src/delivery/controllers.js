const { bucket } = require('../../config/firebase-init');
const { createDocument, deleteDocument, getDocuments, getDocumentById } = require('../helpers/firestore');

async function uploadPackageImage(packageImage) {
    try {
        if (!packageImage || !packageImage.buffer) {
            throw new Error('No image file provided');
        }

        // Generate a unique filename
        const timestamp = Date.now();
        const filename = `package-images/${timestamp}-${Math.random().toString(36).substring(7)}.jpg`;

        // Create a file reference in the bucket
        const file = bucket.file(filename);

        // Upload the file buffer
        await file.save(packageImage.buffer, {
            metadata: {
                contentType: packageImage.mimetype || 'image/jpeg',
            },
        });

        // Make the file publicly accessible and get the download URL
        await file.makePublic();
        const downloadURL = `https://storage.googleapis.com/${bucket.name}/${filename}`;

        return downloadURL;
    } catch (error) {
        console.error('Error uploading package image:', error);
        throw error;
    }
}

const createDeliveryOrder = async (req, res) => {
    const { data } = req.body
    console.log(data)
    try {
        // Prepare order data for Firestore
        const orderData = {
            ...data,
            rider: null,
            status: 1,
        };

        // Create order in Firestore
        const orderId = await createDocument("orders", orderData);

        if (!orderId) return res.send({
            success: false,
            error: 'Failed to create delivery order'
        })

        res.send({
            success: true,
            data: {
                ...orderId.data,
                orderId: orderId.id
            }
        })

    } catch (error) {
        console.error('Error creating delivery order:', error);
        res.status(500).json({ error: 'Failed to create delivery order', message: error.message });
    }
}

const uploadDeliveryImage = async (req, res) => {
    try {
        const packageImage = req.file;

        // upload package image to firebase storage
        const imageUrl = await uploadPackageImage(packageImage)

        res.send({
            success: true,
            data: imageUrl
        })
    } catch (error) {
        console.error('Error uploading delivery image:', error);
        res.status(500).json({ error: 'Failed to upload delivery image', message: error.message });
    }
}

const deleteDeliveryOrder = async (req, res) => {
    const { orderId } = req.params
    try {
        const order = await deleteDocument("orders", orderId)
        if (!order) return res.send({
            success: false,
            error: 'Failed to delete delivery order'
        })

        res.send({
            success: true,
            data: order
        })
    } catch (error) {
        console.error('Error deleting delivery order:', error);
        res.status(500).json({ error: 'Failed to delete delivery order', message: error.message });
    }
}

const getDeliveryOrder = async (req, res) => {
    const { orderId } = req.params
    try {
        // console.log("polling")
        const order = await getDocumentById("orders", orderId)
        if (!order) return res.send({
            success: false,
            error: 'Delivery order not found'
        })

        res.send({
            success: true,
            data: order
        })
    } catch (error) {
        console.error('Error getting delivery orders:', error);
        res.status(500).json({ error: 'Failed to get delivery orders', message: error.message });
    }
}

// get all user's delivery orders
const getUserDeliveryOrders = async (req, res) => {
    const { userId } = req.params
    try {
        const orders = await getDocuments("orders", { user_id: userId })
        if (!orders) return res.send({
            success: false,
            error: 'User delivery orders not found'
        })
        console.log(orders)
        res.send({
            success: true,
            data: orders
        })
    } catch (error) {
        console.error('Error getting user delivery orders:', error);
        res.status(500).json({ error: 'Failed to get user delivery orders', message: error.message });
    }
}

module.exports = {
    createDeliveryOrder,
    uploadDeliveryImage,
    deleteDeliveryOrder,
    getDeliveryOrder,
    getUserDeliveryOrders
}