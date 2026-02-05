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




module.exports = {connectDB,getDB,closeDB};