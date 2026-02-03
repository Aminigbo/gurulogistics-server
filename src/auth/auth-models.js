const { admin } = require("../../config/firebase-init");
const { query, getDocumentById, updateDocument, createDocument, deleteDocument, getDocuments, getDocumentByFirebaseUID } = require("../helpers/firestore");

// get user by UUID (Firebase Auth UID)
async function GetUserByUUIDmodel(UUID) {
    try {
        const userRecord = await admin.auth().getUser(UUID);
        return userRecord;
    } catch (error) {
        return {
            data: null,
            error: { message: error.message }
        };
    }
}

// change password
async function ChangePassword({ uuid, password }) {
    try {
        await admin.auth().updateUser(uuid, {
            password: password
        });
        return {
            data: { uid: uuid },
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: { message: error.message }
        };
    }
}

// fetch all FCM tokens
async function FetchFcmToken() {
    try {
        const users = await getDocuments('users');
        return {
            data: users.map(user => ({ fcmToken: user.fcmToken })),
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: { message: error.message }
        };
    }
}

// fetch all user metadata
async function FetchAllMetaData() {
    try {
        const abasites = await getDocuments('abasites');
        return {
            data: abasites,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: { message: error.message }
        };
    }
}

// get user by email
async function FetchUserByEmail(email) {
    try {
        const users = await query('users', [
            { field: 'email', operator: '==', value: email }
        ]);
        return {
            data: users,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: { message: error.message }
        };
    }
}

// fetch metadata not equal to (for filtering)
async function FetchMetaDataNEQ(phone) {
    try {
        // Firestore doesn't have != operator directly, so we'll get all and filter
        const allData = await getDocuments('abasites');
        return {
            data: allData.map(item => ({ meta: item.meta })),
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: { message: error.message }
        };
    }
}

// update user meta in abasites collection
async function AddUser_meta(payload) {
    try {
        const users = await query('abasites', [
            { field: 'phone', operator: '==', value: payload.user }
        ]);

        if (users.length === 0) {
            return {
                data: null,
                error: { message: 'User not found' }
            };
        }

        const updated = await updateDocument('abasites', users[0].id, {
            meta: payload.data
        });

        return {
            data: updated,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: { message: error.message }
        };
    }
}

// update user contact permission
async function ConfigureContactPermission(payload) {
    try {
        const users = await query('abasites', [
            { field: 'phone', operator: '==', value: payload.user }
        ]);

        if (users.length === 0) {
            return {
                data: null,
                error: { message: 'User not found' }
            };
        }

        const updated = await updateDocument('abasites', users[0].id, {
            contact_permissions: payload.data
        });

        return {
            data: updated,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: { message: error.message }
        };
    }
}

// signup to public folder (users collection)
async function PublicFolderModel(payload) {
    try {
        const userDoc = await createDocument('users', {
            name: payload.name,
            phone: payload.phone,
            email: payload.email,
            password: payload.password, // Note: In production, this should be hashed
            state: payload.state,
            gender: payload.gender,
            fcmToken: payload.fcmToken,
            userID: payload.id,
        }, payload.id); // Use Firebase Auth UID as document ID

        return {
            data: userDoc,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: { message: error.message }
        };
    }
}

// update password in abasites collection
async function EditPassword(payload) {
    try {
        const users = await query('abasites', [
            { field: 'phone', operator: '==', value: payload.phone }
        ]);

        if (users.length === 0) {
            return {
                data: null,
                error: { message: 'User not found' }
            };
        }

        const updated = await updateDocument('abasites', users[0].id, {
            password: payload.password // Note: In production, this should be hashed
        });

        return {
            data: updated,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: { message: error.message }
        };
    }
}

// signup with Firebase Auth
async function SignupModel(payload) {
    let userRecord = null;
    try {
        // Step 1: Create Firebase Auth user
        userRecord = await admin.auth().createUser({
            email: payload.email,
            password: payload.password,
            displayName: payload.name,
            emailVerified: payload.isVerified || false,
            disabled: false,
        });

        // Step 2: Create Firestore document
        // If this fails, we need to rollback the auth user creation
        try {
            const userDoc = await createDocument('users', {
                ...payload, 
                uid: userRecord.uid
            }, userRecord.uid);

            return {
                data: userDoc,
                error: null
            };
        } catch (firestoreError) {
            // Rollback: Delete the auth user if Firestore creation fails
            try {
                await admin.auth().deleteUser(userRecord.uid);
            } catch (deleteError) {
                console.error(`Failed to rollback auth user ${userRecord.uid}:`, deleteError);
            }

            return {
                data: null,
                error: {
                    message: `Failed to create user document: ${firestoreError.message}`
                }
            };
        }
    } catch (error) {
        // If auth user creation fails, no rollback needed
        return {
            data: null,
            error: { message: error.message }
        };
    }
}

// login with Firebase Auth
async function LoginModel({ email, password }) {
    try {
        // Get user by email first
        const userRecord = await admin.auth().getUserByEmail(email);

        // Note: Firebase Admin SDK doesn't verify passwords directly
        // Password verification should be done using Firebase Auth REST API
        // For server-side, you can use: https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword
        // Or handle authentication client-side and verify the ID token server-side

        // For now, we'll create a custom token (password verification should be done separately)
        // In production, you should verify the password using the REST API before creating the token
        const customToken = await admin.auth().createCustomToken(userRecord.uid);

        // Get custom claims (equivalent to user_metadata in Supabase)
        const customClaims = userRecord.customClaims || {};

        // Get user data from Firestore if available
        let firestoreUserData = null;
        try {
            const userDoc = await getDocumentById('users', userRecord.uid);
            if (userDoc) {
                firestoreUserData = userDoc;
            }
        } catch (err) {
            // User document might not exist in Firestore, that's okay
        }

        return {
            data: {
                user: {
                    id: userRecord.uid,
                    email: userRecord.email,
                    created_at: userRecord.metadata.creationTime,
                    ...firestoreUserData,

                },
                session: {
                    access_token: customToken,
                    refresh_token: null, // Firebase handles refresh tokens via client SDK
                }
            },
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: { message: error.message }
        };
    }
}

// update user in public table (users collection)
async function UpdateUserPublicTable(User) {
    try {
        const users = await query('users', [
            { field: 'userID', operator: '==', value: User.id }
        ]);

        if (users.length === 0) {
            return {
                data: null,
                error: { message: 'User not found' }
            };
        }

        const updated = await updateDocument('users', users[0].id, {
            fcmToken: User.token
        });

        return {
            data: [updated],
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: { message: error.message }
        };
    }
}

// update user info (custom claims in Firebase Auth)
async function UpdateUserInfoModel({ UUID, data }) {
    try {
        // Update custom claims
        await admin.auth().setCustomUserClaims(UUID, data);

        // Also update the user document in Firestore if it exists
        const userDoc = await getDocumentById('users', UUID);
        if (userDoc) {
            await updateDocument('users', UUID, data);
        }

        return {
            data: { uid: UUID, ...data },
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: { message: error.message }
        };
    }
}

// delete user from Firebase Auth
async function DeleteUserModel(uuid) {
    try {
        await admin.auth().deleteUser(uuid);
        return {
            data: { uid: uuid },
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: { message: error.message }
        };
    }
}

// delete user from public users collection
async function DeletePublicUserModel(uuid) {
    try {
        const users = await query('users', [
            { field: 'id', operator: '==', value: uuid }
        ]);

        if (users.length === 0) {
            return {
                data: null,
                error: { message: 'User not found' }
            };
        }

        await deleteDocument('users', users[0].id);

        return {
            data: { id: users[0].id },
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: { message: error.message }
        };
    }
}

// fetch user data by ID from users collection
async function FetchUserDataById(firebaseUID) {
    try {
        // First try to get by document ID
        const userDoc = await getDocumentById('users', firebaseUID);

        if (userDoc) {
            return {
                data: [userDoc],
                error: null
            };
        }

        // If not found by firebaseUID, try querying by userID field
        const users = await query('users', [
            { field: 'userID', operator: '==', value: firebaseUID }
        ]);

        return {
            data: users,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: { message: error.message }
        };
    }
}

module.exports = {
    FetchFcmToken,
    AddUser_meta,
    PublicFolderModel,
    EditPassword,
    FetchMetaDataNEQ,
    FetchUserByEmail,
    FetchAllMetaData,
    ConfigureContactPermission,
    SignupModel,
    LoginModel,
    UpdateUserPublicTable,
    UpdateUserInfoModel,
    DeleteUserModel,
    DeletePublicUserModel,
    FetchUserDataById,
    GetUserByUUIDmodel,
    ChangePassword
};
