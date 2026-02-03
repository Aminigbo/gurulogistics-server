const { admin } = require('../../config/firebase-init');

const db = admin.firestore();

/**
 * Create a new document in a collection
 * @param {string} collection - Collection name
 * @param {Object} data - Document data
 * @param {string} [id] - Optional document ID (auto-generated if not provided)
 * @returns {Promise<{id: string, data: Object}>} Created document ID and data
 */
async function createDocument(collection, data, id = null) {
    try {
        const docRef = id 
            ? db.collection(collection).doc(id)
            : db.collection(collection).doc();
        
        await docRef.set({
            ...data,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        
        return {
            id: docRef.id,
            data: {
                ...data,
                id: docRef.id
            }
        };
    } catch (error) {
        console.error(`Error creating document in ${collection}:`, error);
        throw error;
    }
}

/**
 * Get a document by ID
 * @param {string} collection - Collection name
 * @param {string} id - Document ID
 * @returns {Promise<Object|null>} Document data with ID, or null if not found
 */
async function getDocumentById(collection, id) {
    try {
        const docRef = db.collection(collection).doc(id);
        const doc = await docRef.get();
        
        if (!doc.exists) {
            return null;
        }
        
        return {
            id: doc.id,
            ...doc.data()
        };
    } catch (error) {
        console.error(`Error getting document ${id} from ${collection}:`, error);
        throw error;
    }
}

// get user by firebaseUID
async function getDocumentByFirebaseUID(collection, firebaseUID) {
    try {
        const querySnapshot = await db.collection(collection).where('firebaseUID', '==', firebaseUID).limit(1).get();
        
        if (querySnapshot.empty) {
            return null;
        }
        
        const doc = querySnapshot.docs[0];
        return {
            id: doc.id,
            ...doc.data()
        };
    } catch (error) {
        console.error(`Error getting document by firebaseUID from ${collection}:`, error);
        throw error;
    }
}

/**
 * Get all documents from a collection
 * @param {string} collection - Collection name
 * @param {Object} [options] - Query options
 * @param {number} [options.limit] - Maximum number of documents to return
 * @param {string} [options.orderBy] - Field to order by
 * @param {string} [options.orderDirection] - 'asc' or 'desc' (default: 'asc')
 * @returns {Promise<Array>} Array of documents with IDs
 */
async function getDocuments(collection, filters = [], options = {}) {
    try {
        let query = db.collection(collection);
        
        // Apply ordering if specified
        if (options.orderBy) {
            query = query.orderBy(
                options.orderBy, 
                options.orderDirection || 'asc'
            );
        }
        
        // Apply limit if specified
        if (options.limit) {
            query = query.limit(options.limit);
        }
        
        const snapshot = await query.get();
        
        if (snapshot.empty) {
            return [];
        }
        
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error(`Error getting documents from ${collection}:`, error);
        throw error;
    }
}

/**
 * Update a document
 * @param {string} collection - Collection name
 * @param {string} id - Document ID
 * @param {Object} data - Data to update
 * @param {boolean} [merge=true] - Whether to merge with existing data (default: true)
 * @returns {Promise<Object>} Updated document data with ID
 */
async function updateDocument(collection, id, data, merge = true) {
    try {
        const docRef = db.collection(collection).doc(id);
        
        const updateData = {
            ...data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };
        
        if (merge) {
            await docRef.set(updateData, { merge: true });
        } else {
            await docRef.update(updateData);
        }
        
        const updatedDoc = await docRef.get();
        
        return {
            id: updatedDoc.id,
            ...updatedDoc.data()
        };
    } catch (error) {
        console.error(`Error updating document ${id} in ${collection}:`, error);
        throw error;
    }
}

/**
 * Delete a document
 * @param {string} collection - Collection name
 * @param {string} id - Document ID
 * @returns {Promise<boolean>} True if deleted successfully
 */
async function deleteDocument(collection, id) {
    try {
        const docRef = db.collection(collection).doc(id);
        await docRef.delete();
        return true;
    } catch (error) {
        console.error(`Error deleting document ${id} from ${collection}:`, error);
        throw error;
    }
}

/**
 * Query documents with filters
 * @param {string} collection - Collection name
 * @param {Array} filters - Array of filter objects {field, operator, value}
 * @param {Object} [options] - Query options
 * @param {number} [options.limit] - Maximum number of documents to return
 * @param {string} [options.orderBy] - Field to order by
 * @param {string} [options.orderDirection] - 'asc' or 'desc' (default: 'asc')
 * @returns {Promise<Array>} Array of matching documents with IDs
 */
async function query(collection, filters = [], options = {}) {
    try {
        let query = db.collection(collection);
        
        // Apply filters
        filters.forEach(filter => {
            const { field, operator, value } = filter;
            query = query.where(field, operator, value);
        });
        
        // Apply ordering if specified
        if (options.orderBy) {
            query = query.orderBy(
                options.orderBy, 
                options.orderDirection || 'asc'
            );
        }
        
        // Apply limit if specified
        if (options.limit) {
            query = query.limit(options.limit);
        }
        
        const snapshot = await query.get();
        
        if (snapshot.empty) {
            return [];
        }
        
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error(`Error querying documents from ${collection}:`, error);
        throw error;
    }
}

/**
 * Batch write operations (create, update, delete)
 * @param {Array} operations - Array of operation objects
 * @param {string} operations[].type - 'create', 'update', or 'delete'
 * @param {string} operations[].collection - Collection name
 * @param {string} operations[].id - Document ID
 * @param {Object} [operations[].data] - Document data (for create/update)
 * @returns {Promise<boolean>} True if batch completed successfully
 */
async function batchWrite(operations) {
    try {
        const batch = db.batch();
        
        operations.forEach(operation => {
            const { type, collection, id, data } = operation;
            const docRef = db.collection(collection).doc(id);
            
            switch (type) {
                case 'create':
                    batch.set(docRef, {
                        ...data,
                        createdAt: admin.firestore.FieldValue.serverTimestamp(),
                        updatedAt: admin.firestore.FieldValue.serverTimestamp()
                    });
                    break;
                case 'update':
                    batch.update(docRef, {
                        ...data,
                        updatedAt: admin.firestore.FieldValue.serverTimestamp()
                    });
                    break;
                case 'delete':
                    batch.delete(docRef);
                    break;
                default:
                    throw new Error(`Unknown operation type: ${type}`);
            }
        });
        
        await batch.commit();
        return true;
    } catch (error) {
        console.error('Error executing batch write:', error);
        throw error;
    }
}

module.exports = {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
    query,
    batchWrite,
    getDocumentByFirebaseUID,
    db // Export db instance for advanced use cases
};
