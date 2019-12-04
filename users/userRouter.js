// Import Express and external middleware
const express = require('express');

// Import Express middleware
const router = express.Router();

// Import database access
const udb = require('./userDb');
const pdb = require('../posts/postDb');

// ********************************************************
// ********************************************************
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


// ********************************************************
// ********************************************************
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const body = req.body;
  body.user_id = req.params.id;
  pdb.insert(body)
    .then(post=>{
      // console.log(post);
      res.status(200).json(post);
    })
    .catch(err=>{
      console.log("Error in pdb.insert in POST /users/:id/posts");
      res.status(500)
        .json({error: "Could not add new post to database."});
    })
});


// ********************************************************
// ********************************************************
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


// ********************************************************
// ********************************************************
router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});


// ********************************************************
// ********************************************************
router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  udb.getUserPosts(req.params.id)
    .then(posts=>{
      // console.log(posts);
      res.status(200).json(posts);
    })
    .catch(err=>{
      console.log("Error in udb.getUserPosts in GET /users/:id/posts");
      res.status(500)
        .json({error: "User's posts could not be retrieved."});
    });
});


// ********************************************************
// ********************************************************
router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  udb.remove(req.params.id)
    .then(count=>{
      // console.log(count);
      if(count===1) {
        res.status(200).json(`User ${req.user.name} has been deleted`);
      }
      else {
        console.log("Error in udb.remove in DELETE /users/:id");
        res.status(500)
          .json({error: "User could not be deleted."});
      }
    })
    .catch(err=>{
      console.log("Error in udb.remove in DELETE /users/:id");
      res.status(500)
        .json({error: "User could not be deleted."});
    });
});


// ********************************************************
// ********************************************************
router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  udb.update(req.params.id,req.body)
    .then(count=>{
      // console.log(count);
      if(count===1) {
        res.status(200).json(`User with id ${req.user.id} has been updated`);
      }
      else {
        console.log("Error in udb.update in PUT /users/:id");
        res.status(500)
          .json({error: "User could not be updated."});
      }
    })
    .catch(err=>{
      console.log("Error in udb.update in PUT /users/:id");
      res.status(500)
        .json({error: "User could not be updated."});
    });
});


// ********************************************************
// custom middleware
// ********************************************************
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
  else {
    next();
  }
  
}

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body;
  // console.log(body);
  if(Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing post data" });
  } 
  else if(!body.text) {
    res.status(400).json({ message: "missing required text field" });
  } 
  else {
    next();
  }
}

module.exports = router;
