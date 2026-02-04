//module imports
const express = require("express");
const cors = require("cors");

//service imports
const {fetchUser, addUser, updateUser, deleteUser, promoteUser} = require("./services/dbServices/users.js");
const {createEvent, fetchOneEvent, fetchMultipleEvent, updateEvent, deleteEvent} = require("./services/dbServices/events.js");
const { generateTicket } = require("./services/ticket/ticket-base.js");
const { verifyToken } = require("./services/firebase/authorisation.js");
const {sendTicket} = require('./services/ticket/mail-ticket')
const {fetchRegistration, addRegistration, deleteRegistration} = require('./services/dbServices/tickets.js')

//initialisation of modules
const app = express();
app.use(cors());
app.use(express.json());

//api's for development/testing purposes only
app.post("/test",async (req,res) => {
    try {
        const eventDetails = req.body.eventDetails;
        const userId = req.body.uid;

        eventDetails.createdBy = userId
        const user = await fetchUser(userId);
        let result = {};
        if (user.role==='organiser'||user.role==='admin') {
            result = await createEvent(eventDetails);
            console.log("excecuted createEvent");
        }else{
            throw new Error("User cannot create event");
        }
        return result;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/test",async (req,res) => {
    try {
        const filter = req.query;
        console.log(filter);
        const eventDetails = await fetchMultipleEvent(filter);
        res.json({eventDetails})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch("/test",async (req,res) => {
    
});

app.delete("/test",async (req,res) => {
    try {
        const eventId = req.body.eventId;
        const userId = req.body.uid;
        
        const existingEvent = await fetchOneEvent(eventId);
        
        if (existingEvent.createdBy !== userId) {
            return res.status(403).json({ 
                error: "Forbidden", 
                message: "You can only delete your own events" 
            });
        }
        
        const result = await deleteEvent(eventId);
        res.json({ message: "Event deleted successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Public Endpoints
app.post("/api/auth/login",async(req, res)=>{
try {
        const userCredentials = req.body;
        const email = userCredentials.email;
        const result = fetchUser(email);
        return result;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/signup",async (req,res) => {
    try {
        const userCredentials = req.body;
        const result = await addUser(userCredentials);
        return result;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/events",async (req,res) => {
    try {
        const filter = req.query;
        console.log(filter);
        const eventDetails = await fetchMultipleEvent(filter);
        res.json({eventDetails})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/events/:eventId",async (req,res) => {
    try {
        const eventId = req.params.eventId;
        const eventDetails = await fetchOneEvent(eventId);
        return eventDetails;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//Personal Private Endpoints
app.get("/api/profile",verifyToken,async (req,res) => {
    try {
        const userId = req.user.uid; 
        
        const result = await fetchUser(uid);
        res.json({ data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.patch("/api/profile",verifyToken,async (req,res) => {
    try {
        const userId = req.user.uid;
        const userCredentials = req.body;
        
        const result = await updateUser(userId, userCredentials);
        res.json({ message: "User updated successfully", data: result });
        return result;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/api/profile",verifyToken,async (req,res) => {
    try {
        const userId = req.user.uid;

        const result = await deleteUser(userId);
        res.json({message:"Account deleted successfully",data: result});
        return result;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
});

app.get("/api/profile/tickets",verifyToken,async (req,res) => {
    try {
        const userId = req.user.uid;

        const result = await fetchRegistration(userId, null);
        res.json({message:"All tickets fetched",data: result})
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})


//Organisers Private endpoints
app.post("/api/createEvent",verifyToken, async (req,res) => {
    try {
        const eventDetails = req.body.eventdetails;
        const userId = req.user.uid;

        eventDetails.createdBy = userId
        const user = await fetchUser(userId);
        const result = {};
        if (user.role==='organiser'||user.role==='admin') {
            result = await createEvent(eventDetails);
        }else{
            throw new Error("User cannot create event");
        }
        return result;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch("/api/events/:eventId", verifyToken, async (req,res) => {
    try {
        const eventId = req.params.eventId;
        const eventDetails = req.body;
        const userId = req.user.uid;

        const existingEvent = await fetchOneEvent(eventId);

        if(existingEvent.createdBy!==userId){
            return res.status(403).json({ 
                error: "Forbidden", 
                message: "You can only update your own events" 
            });
        }

        const result = await updateEvent(eventId, eventDetails);
        return result;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/api/events/:eventId", verifyToken, async (req,res) => {
    try {
        const eventId = req.params.eventId;
        const userId = req.user.uid;
        
        const existingEvent = await fetchOneEvent(eventId);
        
        if (existingEvent.createdBy !== userId) {
            return res.status(403).json({ 
                error: "Forbidden", 
                message: "You can only delete your own events" 
            });
        }
        
        const result = await deleteEvent(eventId);
        res.json({ message: "Event deleted successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//Authenticated users event related endpoints
app.post("/api/events/:eventId/register", verifyToken, async (req,res) => {
    try {

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/:eventId/ticket",verifyToken, async (req,res) => {
 try {
        const eventId = req.params.eventId;
        const userId = req.user.uid;
        const userData = await fetchUser(userId);
        const eventData = await fetchOneEvent(eventId);
        const ticketData = await fetchRegistration(userId, eventId);

        ticketData = {ticketData,userData,eventData};
        //Verify the registration using uid

        const pdfBuffer = await generateTicket(ticketData);
        const ticketDetails = {
            eventname: ticketData.eventName,
            username: ticketData.holderName
        };

        await sendTicket(
            ticketData.email, 
            pdfBuffer, 
            ticketDetails
        );
        
        res.json({ status: "success", message: "Ticket sent successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ status: "error", message: error.message });
    }
});

//special admin endpoints
app.post("/api/admin",verifyToken,async (req,res) => {
    
});
module.exports = app;
