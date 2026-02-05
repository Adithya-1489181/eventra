//module imports
const express = require("express");
const cors = require("cors");

//initialize Firebase Admin
require("./config/firebase");

//service imports
const {fetchUser, addUser, updateUser, deleteUser, promoteUser, fetchAllUser} = require("./services/dbServices/users.js");
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
        res.json({message:"SignUp Successfull", data: result})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/signup",async (req,res) => {
    try {
        const userCredentials = req.body;
        const result = await addUser(userCredentials);
        res.json({message:"SignUp Successfull", data: result})
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
        res.json(eventDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//Personal Private Endpoints
app.get("/api/profile",verifyToken,async (req,res) => {
    try {
        const userId = req.user.uid; 
        
        const result = await fetchUser(userId);
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

        const registrations = await fetchRegistration(userId, null);
        
        // Enrich registrations with event details
        if (registrations && registrations.length > 0) {
            const enrichedTickets = await Promise.all(
                registrations.map(async (reg) => {
                    const event = await fetchOneEvent(reg.event_id);
                    return {
                        _id: reg._id,
                        uid: reg.uid,
                        event_id: reg.event_id,
                        registration_date: reg.registration_date,
                        event_name: event?.event_name || 'Unknown Event',
                        location: event?.location?.venue || event?.location?.type || 'TBD',
                    };
                })
            );
            res.json({message:"All tickets fetched", data: enrichedTickets});
        } else {
            res.json({message:"No tickets found", data: []});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})


//Organisers Private endpoints
app.post("/api/createEvent",verifyToken, async (req,res) => {
    try {
        const eventDetails = req.body.eventdetails;
        const userId = req.user.uid;

        eventDetails.createdBy = userId;
        const user = await fetchUser(userId);
        
        if (user.role==='organiser'||user.role==='admin') {
            const result = await createEvent(eventDetails);
            res.json({ message: "Event created successfully", data: result });
        }else{
            return res.status(403).json({ error: "User cannot create event" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch("/api/events/:eventId", verifyToken, async (req,res) => {
    try {
        const eventId = req.params.eventId;
        const eventDetails = req.body;
        const userId = req.user.uid;

        const user = await fetchUser(userId);
        const existingEvent = await fetchOneEvent(eventId);

        if(existingEvent.createdBy!==userId && user.role !== "admin"){
            return res.status(403).json({ 
                error: "Forbidden", 
                message: "You can only update your own events" 
            });
        }

        // Add event_id to eventDetails for updateEvent
        eventDetails.event_id = parseInt(eventId);
        const result = await updateEvent(eventDetails);
        res.json({ message: "Event updated successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/api/events/:eventId", verifyToken, async (req,res) => {
    try {
        const eventId = req.params.eventId;
        const userId = req.user.uid;
        
        const user = await fetchUser(userId);
        const existingEvent = await fetchOneEvent(eventId);
        
        if (existingEvent.createdBy !== userId && user.role !== "admin") {
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
        const eventId = parseInt(req.params.eventId);
        const userId = req.user.uid;

        console.log(`Registration attempt - User: ${userId}, Event: ${eventId}`);

        // Check if event exists
        const event = await fetchOneEvent(eventId);
        if (!event) {
            console.log(`Event ${eventId} not found`);
            return res.status(404).json({ error: "Event not found" });
        }

        // Check if already registered
        const existingRegistration = await fetchRegistration(userId, eventId);
        if (existingRegistration) {
            console.log(`User ${userId} already registered for event ${eventId}`);
            return res.status(400).json({ error: "Already registered for this event" });
        }

        // Check if seats available
        const seatsLeft = parseInt(event.seats_left);
        if (seatsLeft <= 0) {
            return res.status(400).json({ message: 'Event is full' });
        }

        // Fetch user details
        const user = await fetchUser(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('Creating registration for user:', user.email);

        // Create registration record
        const registrationDetails = {
            uid: userId,
            event_id: eventId,
            registration_date: new Date().toISOString()
        };

        const registrationResult = await addRegistration(registrationDetails);
        console.log('Registration created:', registrationResult);

        // Update seats left
        const updatedSeatsLeft = seatsLeft - 1;
        await updateEvent({
            event_id: eventId,
            seats_left: updatedSeatsLeft
        });

        // Prepare ticket data for email
        const ticketData = {
            eventName: event.event_name,
            date: event.duration?.start_date || 'TBD',
            venue: event.location?.venue || event.location?.type || 'Online',
            ticketId: registrationResult.insertedId.toString(),
            holderName: user.name || user.email
        };

        // Generate PDF ticket
        const pdfBuffer = await generateTicket(ticketData);
        
        // Send ticket via email
        await sendTicket(user.email, pdfBuffer, {
            eventname: event.event_name,
            username: user.name || user.email
        });

        console.log('Seats updated. Remaining:', updatedSeatsLeft);
        console.log('Ticket email sent successfully');

        res.json({
            success: true,
            message: 'Registration successful! Ticket sent to your email.',
            registrationId: registrationResult.insertedId
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: 'Registration failed', 
            error: error.message 
        });
    }
});

app.post("/api/events/:eventId/generate-ticket",verifyToken, async (req,res) => {
    try {
        const eventId = parseInt(req.params.eventId);
        const userId = req.user.uid;
        
        // Fetch user, event, and registration data
        const user = await fetchUser(userId);
        const event = await fetchOneEvent(eventId);
        const registration = await fetchRegistration(userId, eventId);

        if (!registration) {
            return res.status(404).json({ 
                status: "error", 
                message: "No registration found for this event" 
            });
        }

        // Prepare ticket data
        const ticketData = {
            eventName: event.event_name,
            date: event.duration?.start_date || 'TBD',
            venue: event.location?.venue || event.location?.type || 'Online',
            ticketId: registration._id?.toString() || 'N/A',
            holderName: user.name || user.email
        };

        // Generate PDF ticket
        const pdfBuffer = await generateTicket(ticketData);
        
        // Send ticket via email
        await sendTicket(user.email, pdfBuffer, {
            eventname: event.event_name,
            username: user.name || user.email
        });
        
        res.json({ 
            status: "success", 
            message: "Ticket sent to mail, please check" 
        });
    } catch (error) {
        console.error("Error generating ticket:", error);
        res.status(500).json({ 
            status: "error", 
            message: "Failed to generate ticket" 
        });
    }
});

//special admin endpoints
app.post("/api/admin/promoteUser",verifyToken,async (req,res) => {
    try {
        const userId = req.user.uid;
        const personId = req.body.uid;
        const personRole = req.body.role;
        
        const user = await fetchUser(userId);
        if (user.role!=='admin') {
            return res.status(403).json({ 
                error: "Forbidden", 
                message: "You can only delete your own events" 
            });
        }

        result = await promoteUser(personId,personRole);
        return res.json({message:"User Promoted to expected role", data:result});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/admin/allUsers",verifyToken,async (req,res) => {
        
    try {
        const userId = req.user.uid;
        const user = await fetchUser(userId);
        if (user.role!=='admin') {
            return res.status(403).json({ 
                error: "Forbidden", 
                message: "You can only delete your own events" 
            });
        }

        const usersList = await fetchAllUser();
        return res.json({message:"User Promoted to expected role", data: usersList});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})
module.exports = app;
