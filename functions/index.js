const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();


exports.userJoined = functions.auth.user().onCreate(user => {
    admin.firestore().CollectionReference("users")
    .doc(user.uid).get().then(doc => {
        const newUser = doc.data;
        console.log('newUser', newUser)
    })
})
