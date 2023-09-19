const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');



// Specify on which port the Express.js server will run
const PORT = process.env.PORT || 3001;

// Static middleware pointing to the public folder
app.use(express.static('public'));
app.use(express.json());
// Create Express.js routes for default '/', '/send' and '/routes' endpoints
app.use('/',htmlRoutes)
app.use('/api',apiRoutes)

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);