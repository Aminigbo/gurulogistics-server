const { db } = require('../config/firebase-auth');

const getUserByEmailController = async (email) => {
    try {
        // Handle both cases: called as controller (req, res) or as function (email)


        if (!email) {
            throw new Error("Email is required");
        }

        // Query Firestore for user by email
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('email', '==', email).limit(1).get();

        if (snapshot.empty) {
            throw new Error("User not found");
        }

        const userData = [];
        snapshot.forEach(doc => {
            userData.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return userData;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw new Error("Server error occurred");
    }
};

// get all rider's emails in array []
const getAllRidersEmailsController = async () => {
    try {
        const ridersRef = db.collection('users').where('Rider', '==', true);
        const snapshot = await ridersRef.get();
        return snapshot.docs.map(doc => doc.data().email);
    } catch (error) {
        console.error("Error fetching all riders emails:", error);
        throw new Error("Server error occurred");
    }
}

const getOrderByIdController = async (id) => {
    try {
        // Handle both cases: called as controller (req, res) or as function (email)


        if (!id) {
            throw new Error("Order id is required");
        }

        // Query Firestore for user by email
        const orderRef = db.collection('orders').doc(id);

        const orderData = await orderRef.get();

        if (!orderData.exists) {
            return {
                error: true,
                data: null
            }
        }

        return {
            error: null,
            data: orderData.data()
        };
    } catch (error) {
        console.error("Error fetching order by id:", error);
        throw new Error("Server error occurred");
    }
};


const getUserByIdController = async (id) => {
    try {
        // Handle both cases: called as controller (req, res) or as function (email)


        if (!id) {
            throw new Error("User id is required");
        }

        // Query Firestore for user by email
        const usersRef = db.collection('users');
        const snapshot = await usersRef.doc(id).get();

        if (snapshot.empty) {
            throw new Error("User not found");
        }

        const userData = {
            id: snapshot.id,
            ...snapshot.data()
        };

        return {
            error: null,
            data: userData
        };
    } catch (error) {
        console.error("Error fetching user by id:", error);
        throw new Error("Server error occurred");
    }
};
module.exports = {
    getUserByIdController,
    getOrderByIdController,
    getUserByEmailController,
    getAllRidersEmailsController
};