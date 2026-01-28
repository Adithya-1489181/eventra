const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/login", (req, res) => {
  console.log("Working...");
  res.json({ status: "Eventra backend running" });
});

app.post("/api/auth/login",async(req, res)=>{
try {
    //Check the header and find authorization token
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });
    
    //decode the token and verify it through firebase-admin module
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    //
    const user = await User.findOne({ firebaseUid: uid });
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.json({
      id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = app;
