const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const app = express();

admin.initializeApp();

const firestore = admin.firestore();


const cors = require('cors');


// Allow all CORS request
app.use(cors());

app.get('/getComments', (req, res) => {
    let commentRef = firestore.collection('Comments');
    let allComments = commentRef.get()
  .then(snapshot => {
        snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
    res.send(snapshot);
    return null;
  })
  .catch(err => {
      res.send('Error getting documents', err);
  });
});

app.post('/postComments', (req, res) => {
  firestore.collection("Comments").add({
    name: req.body.name,
    comment: req.body.comment
   })
   .then(function(docRef) {
    res.end('Document written');
    return null;
   })
   .catch(function(error) {
    res.end('Error');
  });
});

exports.api = functions.https.onRequest(app);
