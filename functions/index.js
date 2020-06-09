const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const app = express();

admin.initializeApp();

const firestore = admin.firestore();


const cors = require('cors');


// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

/*
app.get('/comments', (req, res) => {
    let commentRef = firestore.collection('Comment');
    let allComments = citiesRef.get()
  .then(snapshot => {
        snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
    res.send(snapshot);
  })
  .catch(err => {
      res.send('Error getting documents', err);
  });

});
*/
exports.api = functions.https.onRequest(app);
