const { getDB } = require("./dbServices.js")

async function createEvent(eventDetails) {
    try {
        const db = getDB();
        const collection = db.collection("events");

        //Generate Event Id and attach it to eventDetails
        const lastEvent = await collection.findOne({},{sort: {event_id: -1}});
        const currentEventId = lastEvent.event_id+1;
        eventDetails.event_id = currentEventId;

        const result = await collection.insertOne(eventDetails);
        console.log("Event Added Successfully", result);
        return result;
    } catch (error) {
        console.log("Error adding event:", error);
    }
}

async function deleteEvent(eventId) {
     try {
        const db = getDB();
        const collection = db.collection("events");

        const deleteUser = await collection.deleteOne({ event_id: eventId });
        return deleteUser;
    } catch (error) {
        console.log("Error deleting event:", error);
    }
}

async function fetchOneEvent(eventId) {
    try {
        db = getDB();
        const collection = db.collection("events");

        // Finding event by eventId
        const result = collection.findOne({ event_id: eventId });
        return result;
    } catch (error) {
        console.log("Error fetching event:", error);
    }
}

async function fetchMultipleEvent(filter) {
    //How to fetch multiple events with and without filters
    try {
        db = getDB();
        const collection = db.collection("events");
        const allEvents = [];
        if(filter){
            allEvents = await collection.find({}).toArray();
        } else {
            allEvents = await collection.find(filter).toArray();
        }
        return allEvents;
    } catch (error) {
        console.log("Error fetching events:", error);
    }
}

async function updateEvent(eventDetails) {
    try {
        const db = getDB();
        const collection = db.collection("events");

        const allowed_fields = ["event_name", "event_details", "location","isOpen","event_type","duration","capacity","seats_left","organisers_id","ticket_price"];

        const safeDoc = Object.fromEntries(
            Object.entries(eventDetails).filter(([key]) => allowed_fields.includes(key))
        );

        const filter = { event_id: eventDetails.event_id };
        const updateValue = { $set: safeDoc };

        const result = await collection.updateOne(filter, updateValue);
        return result;
    } catch (error) {
        console.log("Error updating user:", error);
    }
}

module.exports = {createEvent, deleteEvent, fetchOneEvent, fetchMultipleEvent, updateEvent};