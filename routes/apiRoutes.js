const router = require("./htmlRoutes");
const path = require('path');

// GET post or delete with api's
router.get('/api/notes', (req, res) => 
  res.sendFile(path.join(__dirname, '/db/db.json'))
);

router.post('/api/notes', (req, res) =>
console.log(req.body)
);

router.delete('/api/notes')

module.exports=router