// Import Express and external middleware
const express = require('express');

// Import Express middleware
const router = express.Router();

// Import database access
const udb = require('./userDb');


router.post('/', validateUser, (req, res) => {
  // do your magic!
  udb.insert(req.body)
  .then(user=>{
    // console.log(user);
    res.status(200).json(user);
  })
  .catch(err=>{
    console.log("Error in udb.insert in POST /users");
    res.status(500)
      .json({error: "Could not add new user to database."});
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  udb.get()
    .then(users=>{
      res.status(200).json(users);
    })
    .catch(err=>{
      console.log("Error in udb.get in GET /users");
      res.status(500)
        .json({error: "Information on users could not be retrieved."});
    })
}); //End of router.get

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  udb.getById(req.params.id)
    .then(user=>{
      // console.log(user);
      if(user) {
        req.user = user;
        next();
      }
      else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(err=>{
      console.log("Error in udb.getById in validateUserId");
      res.status(500)
        .json({error: "The user could not be accessed."});
    })
}

function validateUser(req, res, next) {
  // do your magic!
  const body = req.body;
  // console.log(body);
  if(Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing user data" });
  } 
  else if(!body.name) {
    res.status(400).json({ message: "missing required name field" });
  }
  next();
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
