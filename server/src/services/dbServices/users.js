const { getDB } = require("./dbServices.js")

//fetch user function
async function fetchUser(uid) {
    try {
        db = getDB();
        const collection = db.collection("users");

        // Finding user by email
        const result = await collection.findOne({ uid: uid });
        console.log(result);
        return result;
    } catch (error) {
        console.log("Error fetching user:", error);
    }
}

async function fetchAllUser() {
    try {
        db = getDB();
        const collection = db.collection("users");

        // Finding user by email
        const result = await collection.find({}).toArray();
        console.log(result);
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
async function updateUser(userId, document) {
    try {
        const db = getDB();
        const collection = db.collection("users");

        const allowed_fields = ["username", "phone_number", "email"];

        const safeDoc = Object.fromEntries(
            Object.entries(document).filter(([key]) => allowed_fields.includes(key))
        );

        const filter = { uid: userId };
        const updateValue = { $set: safeDoc };

        const result = await collection.updateOne(filter, updateValue);
        console.log(result)
        return result;
    } catch (error) {
        console.log("Error updating user:", error);
    }
}

async function promoteUser(userId, role) {
    try {
        const db = getDB();
        const collection = db.collection("users");

        const filter = { uid: userId };
        const updateValue = { role: role };

        const result = await collection.updateOne(filter, updateValue);
        console.log(result)
        return result;
    } catch (error) {
        console.log("Error promoting user:", error);
    }
}

// Delete user function
async function deleteUser(uid) {
    try {
        const db = getDB();
        const collection = db.collection("users");

        const deletedUser = await collection.deleteOne({ uid: uid });
        console.log(deletedUser);
        return deletedUser;
    } catch (error) {
        console.log("Error deleting user:", error);
    }
}


module.exports = { fetchUser, addUser, updateUser, deleteUser, promoteUser, fetchAllUser};