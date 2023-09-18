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
  res.sendFile(path.join(__dirname, '../db/db.json'))
);

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
router.delete('/api/notes/:id',
 (req, res) => {
    console.log(req.params.id)
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
            newNotes=[]
          const parsedData = JSON.parse(data);
          for (let i = 0; i < parsedData.length; i++) {
            console.log(parsedData[i]);
            if (parsedData[i].id !=req.params.id){
                newNotes.push(parsedData[i]);
            }
          }
          console.log(newNotes)
          writeToFile('./db/db.json', newNotes);
        }
      });
  });
  
  ;

module.exports=router