//importing modules
const dotenv = require("dotenv");
const { MongoClient} = require("mongodb");

//initiating modules
dotenv.config();

//MongoDB connection values
const uri = process.env.MONGO_URI; 
const client = new MongoClient(uri);
const dbName = process.env.MONGO_DB;

//fetch user function
async function fetchUser(uid) {

    try {
        //connecting to database
        await client.connect();
        console.log("Connection Opened");
        
        const db = client.db(dbName);
        const collection = db.collection("users");

        //finding user by uid
        const result = await collection.findOne({uid:uid});
        return result;
    } catch (error) {
        console.log("Error:",error);
    } finally {
        //closing the connection
        await client.close();
        console.log("Connection Closed");
        
    }
}

//add user function
async function addUser(document) {
    try {
        //connecting to database
        await client.connect();
        console.log("Connection Opened");
        
        const db = client.db(dbName);
        const collection = db.collection("users");

        const result = await collection.insertOne(document);
        console.log("User Inserted Successfully",result);
        return result;
    } catch (error) {
        console.log("Error:",error);
    } finally {
        //closing the connection
        await client.close();
        console.log("Connection Closed");
    }
}

async function updateUser(document) {
    try {
        //connecting to database
        await client.connect();
        console.log("Connection Opened");
        
        const db = client.db(dbName);
        const collection = db.collection("users");

        const allowed_feilds = ["username", "phone_number", "role"];

        const safeDoc = Object.fromEntries(
            Object.entries(document).filter(([key]) => allowed_feilds.includes(key))
        )

        const filter = {email:document.email};
        const updateValue = {$set:safeDoc};
        
        const result = await collection.updateOne(filter,updateValue);
        return result;
    } catch (error) {
        console.log("Error:",error);
    }finally{
        //closing the connection
        await client.close();
        console.log("Connection Closed");
    }
}

async function deleteUser(uid) {
    
}
module.exports = {fetchUser, addUser, updateUser}