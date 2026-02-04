const { getDB } = require("./dbServices.js")

async function fetchRegistration(userId, eventId) {
    try {
        db = getDB();
        const collection = db.collection("registrations");

        const result = collection.findOne({ uid: userId, event_id: eventId });
        console.log(result);
        return result;
    } catch (error) {
        console.log("Error fetching registration:", error);
    }
}

async function addRegistration(registrationDetails) {
    try {
        const db = getDB();
        const collection = db.collection("registrations");

        const result = await collection.insertOne(registrationDetails);
        console.log("User Registered for event successfully", result);
        return result;
    } catch (error) {
        console.log("Error adding registration:", error);
    }
}

async function deleteRegistration(userId, eventId) {
    try {
        const db = getDB();
        const collection = db.collection("registration");

        const result = await collection.deleteOne({ uid: userId, event_id: eventId });
        console.log(result);
        return result;
    } catch (error) {
        console.log("Error deleting registration:", error);
    }
}

module.exports = {fetchRegistration, addRegistration, deleteRegistration}