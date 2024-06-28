require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToMongo = require("./database/db.js");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page');
});

// Define other routes
require("./routes/auth.routes.js")(app);

(async () => {
  try {
     connectToMongo(); // Ensure the connection is established before starting the server
  } catch (error) {
    console.log("Error:", error);
  }
})();

// Export the app module

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
module.exports = app;
