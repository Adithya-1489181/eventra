var admin = require("firebase-admin");

var serviceAccount = require("../../firebase_admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
