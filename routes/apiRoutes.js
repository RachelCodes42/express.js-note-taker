const router = require("./htmlRoutes");
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };
  const { Router } = require('express');
  
// GET post or delete with api's
router.get('/api/notes', (req, res) => 
  res.sendFile(path.join(__dirname, './db/db.json'))
);
router.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  // GET Route for a specific note
router.get('/:router_id', (req, res) => {
    const routerId = req.params.router_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((tip) => router.router_id === routerId);
        return result.length > 0
          ? res.json(result)
          : res.json('No route with that ID');
      });
  });

// POST Route for a new UX/UI router
router.post('/api/notes', (req, res) => {
    console.log(req.body);
  
    const { title, text} = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Router added successfully`);
    } else {
      res.error('Error in adding router');
    }
  });

// DELETE Route for a specific router
router.delete('/api/notes')
router.delete('/:router_id', (req, res) => {
    const routerId = req.params.router_id;
    readFromFile('./db/router.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all routers except the one with the ID provided in the URL
        const result = json.filter((router) => router.router_id !== routerId);
  
        // Save that array to the filesystem
        writeToFile('./db/router.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${routerId} has been deleted 🗑️`);
      });
  });
  
  ;

module.exports=router