const functions = require('firebase-functions');

const admin = require('firebase-admin');
const app = admin.initializeApp();
const db = admin.firestore();

exports.postComment =  functions.https.onRequest((req,res) =>{
    db.collection("Comments").add({name: req.body.name, comment: req.body.comment})
    .then(function(docRef) 
    {
        console.log("Document written with ID: ", docRef.id);
        return res;
    })
    .catch(function(error) 
    {
        console.error("Error adding document: ", error);
    });
});
