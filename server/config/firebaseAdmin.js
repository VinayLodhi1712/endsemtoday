
const admin = require("firebase-admin");
const serviceAccount = require("./talkofcode-firebase-adminsdk-j9133-ea8022ba2f.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;