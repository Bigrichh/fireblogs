// Import necessary functions from Firebase Functions SDK
const functions = require("firebase-functions");

// Import Firebase Admin SDK to access Firebase services
const admin = require("firebase-admin");

// Initialize the Firebase Admin SDK
admin.initializeApp();

// Define and export a callable Cloud Function named 'addAdminRole'
exports.addAdminRole = functions.https.onCall((data, context) => {
    // // Check if request is made by an authenticated user
    // if (!context.auth) {
    //     // Return an error message if the user is not authenticated
    //     return {
    //         error: "Request not authorized. User must be authenticated."
    //     };
    // }

    // // Check if the authenticated user making the request is an admin
    // if (context.auth.token.admin !== true) {
    //     // Return an error message if the user is not an admin
    //     return {
    //         error: "Request not authorized. User must be an admin to add another admin."
    //     };
    // }

    // Retrieve the user by their email from the request data
    return admin.auth().getUserByEmail(data.email)
        .then((user) => {
            // Set custom claims for the user to make them an admin
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true,
            });
        })
        .then(() => {
            // Return a success message if the admin role was added successfully
            return {
                message: `Success! ${data.email} has been made an admin.`
            };
        })
        .catch((err) => {
            // Log any errors to the console
            console.error(err);
            // Return an error message if something went wrong
            return {
                error: err.message
            };
        });
});
