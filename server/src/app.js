const { auth } = require("./config/firebase")
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/auth/login",async(req, res)=>{
  
});

app.post("/api/signup",async (req,res) => {

});

app.get("/api/events/:eventId",async (req,res) => {
  
});

app.post("/api/events/:eventId/register",async (req,res) => {
  
});

app.get("/api/events/:eventId/tickets/:ticketId",async (req,res) => {
  
});
module.exports = app;
