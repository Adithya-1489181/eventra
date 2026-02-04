const { getDB } = require("./dbServices.js")

async function createEvent(eventDetails) {
    try {
        const db = getDB();
        const collection = db.collection("events");

        //Generate Event Id and attach it to eventDetails
        const lastEvent = await collection.findOne({},{sort: {event_id: -1}});
        let currentEventId = 1000;
        if (lastEvent) {
            currentEventId = lastEvent.event_id+1;
        }
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
    try {
        const db = getDB();
        const collection = db.collection("events");
        
        // Check if filter has any keys
        const hasFilter = filter && Object.keys(filter).length > 0;
        
        if (hasFilter) {
            Object.keys(filter).forEach(key => {
                const value = filter[key];
                
                if (typeof value !== 'string') return;
                
                if (value === 'true') {
                    filter[key] = true;
                } else if (value === 'false') {
                    filter[key] = false;
                } else if (!isNaN(value) && value.trim() !== '') {
                    filter[key] = value.includes('.') ? parseFloat(value) : parseInt(value);
                } else if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                    const date = new Date(value);
                    if (!isNaN(date.getTime())) {
                        filter[key] = value; 
                    }
                } else if (/^\d{2}:\d{2}$/.test(value)) {
                    filter[key] = value;
                }
            });

            const rangeOperators = { 
                '_gte': '$gte', 
                '_lte': '$lte', 
                '_gt': '$gt', 
                '_lt': '$lt',
                '_ne': '$ne'
            };
            
            Object.keys(filter).forEach(key => {
                Object.entries(rangeOperators).forEach(([suffix, operator]) => {
                    if (key.endsWith(suffix)) {
                        const fieldName = key.replace(suffix, '');
                        const value = filter[key];
                        
                        if (!filter[fieldName] || typeof filter[fieldName] !== 'object' || Array.isArray(filter[fieldName])) {
                            filter[fieldName] = {};
                        }
                        
                        filter[fieldName][operator] = value;
                        delete filter[key];
                    }
                });
            });
        }
        
        let allEvents = [];
        if (!hasFilter) {
            allEvents = await collection.find({}).toArray();
        } else {
            allEvents = await collection.find(filter).toArray();
        }
        
        console.log("Filter used:", JSON.stringify(filter, null, 2));
        console.log("Events found:", allEvents.length);
        return allEvents;
    } catch (error) {
        console.log("Error fetching events:", error);
        throw error;
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