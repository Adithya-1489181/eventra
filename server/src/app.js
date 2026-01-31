//module imports
const express = require("express");
const cors = require("cors");

//service imports
const {fetchUser, addUser} = require("./services/dbServices");

//initialisation of modules
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
        const userCredentials = req.body;
        const uid = userCredentials.uid;

        const isUser = fetchUser(uid);
    } catch (error) {
        console.log("Error:",error);
    }
});

app.post("/api/signup",async (req,res) => {
    try {
        const userCredentials = req.body;
        const isInserted = await addUser(userCredentials);
        if (isInserted) {
            console.log("User added");
        } else {
            console.log("Error");
        }
    } catch (error) {
        console.log("Error:",error);
    }
});

app.post("/api/createEvent",async (req,res) => {
    
});

app.get("/api/events/:eventId",async (req,res) => {
  
});

app.post("/api/events/:eventId/register",async (req,res) => {
  
});

app.get("/api/events/:eventId/tickets/:ticketId",async (req,res) => {
  
});
module.exports = app;
