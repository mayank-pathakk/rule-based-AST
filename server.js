require('express-async-errors');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const ruleRoutes = require('./routes/ruleRoutes');
const connectDB = require('./database/connect');

//Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(err.message);
  console.log(`Server is shutting down due to uncaught exception`);
  process.exit(1);
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
mongoose.set("strictQuery", true);
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for serving the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'));
});
app.use('/api/rules', ruleRoutes);


//initializing server port 
const port = process.env.PORT || 3000;

//starting the server and connecting to db
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        const server = app.listen(port, () => {
            console.log(`Server running on port ${port}`);
          });
    } catch (err) {
        console.log(err);
    }
}

//Start the server
start();

//Handling unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(err.message);
    console.log(`Server is shutting down due to unhandled promise rejection`);
    server.close(() => {
      process.exit(1);
    });
});