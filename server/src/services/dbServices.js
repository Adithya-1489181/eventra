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
async function fetchUser(email) {

    try {
        //connecting to database
        await client.connect();
        console.log("Connection Opened");
        
        const db = client.db(dbName);
        const collection = db.collection("users");

        //finding user by uid
        const result = await collection.findOne({email:email});
        return result;
    } catch (error) {
        console.log("Error fetching user:",error);
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
        console.log("Error adding user:",error);
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
        console.log("Error updating user:",error);
    }finally{
        //closing the connection
        await client.close();
        console.log("Connection Closed");
    }
}

async function deleteUser(email) {
   try {
        //connecting to database
        await client.connect();
        console.log("Connection Opened");
        
        const db = client.db(dbName);
        const collection = db.collection("users");

        const deleteUser = await collection.deleteOne({email:email});
        return deleteUser
    } catch (error) {
        console.log("Error Deleting user:",error);
    }finally{
        //closing the connection
        await client.close();
        console.log("Connection Closed");
    }
}
module.exports = {fetchUser, addUser, updateUser}