//importing modules
const dotenv = require("dotenv");
const { MongoClient} = require("mongodb");

//initiating modules
dotenv.config();

//MongoDB connection values
const uri = process.env.MONGO_URI; 
const client = new MongoClient(uri);
const dbName = process.env.MONGO_DB;
let db;

//Connecting to the db
async function connectDB() {
    if (!db) {
        await client.connect();
        console.log("MongoDB connected");
        db = client.db(dbName);
    }
    return db;
}

function getDB() {
    if (!db) {
        throw new Error("Database not initialized. Call connectDB first.");
    }
    return db;
}

async function closeDB() {
    if (client) {
        await client.close();
        console.log("MongoDB connection closed");
    }
}

//fetch user function
async function fetchUser(email) {
    try {
        db = getDB();
        const collection = db.collection("users");

        // Finding user by email
        const result = collection.findOne({ email: email });
        return result;
    } catch (error) {
        console.log("Error fetching user:", error);
    }
}

//add user function
async function addUser(document) {
    try {
        const db = getDB();
        const collection = db.collection("users");

        const result = await collection.insertOne(document);
        console.log("User Inserted Successfully", result);
        return result;
    } catch (error) {
        console.log("Error adding user:", error);
    }
}

// Update user function
async function updateUser(document) {
    try {
        const db = getDB();
        const collection = db.collection("users");

        const allowed_fields = ["username", "phone_number", "role"];

        const safeDoc = Object.fromEntries(
            Object.entries(document).filter(([key]) => allowed_fields.includes(key))
        );

        const filter = { email: document.email };
        const updateValue = { $set: safeDoc };

        const result = await collection.updateOne(filter, updateValue);
        return result;
    } catch (error) {
        console.log("Error updating user:", error);
    }
}

// Delete user function
async function deleteUser(email) {
    try {
        const db = getDB();
        const collection = db.collection("users");

        const deleteUser = await collection.deleteOne({ email: email });
        return deleteUser;
    } catch (error) {
        console.log("Error deleting user:", error);
    }
}

module.exports = { fetchUser, addUser, updateUser, deleteUser, connectDB,closeDB };