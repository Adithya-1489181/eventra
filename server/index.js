const app = require("./src/app");
require("dotenv").config();
const {connectDB,closeDB} = require("./src/services/dbServices/dbServices")

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    process.on("SIGINT", async () => {
      console.log("SIGINT received. Shutting down...");
      await closeDB();
      server.close(() => process.exit(0));
    });

    process.on("SIGTERM", async () => {
      console.log("SIGTERM received. Shutting down...");
      await closeDB();
      server.close(() => process.exit(0));
    });
  } catch (error) {
    console.log("Error Starting the server", error);
    process.exit(1);
  }
})();
