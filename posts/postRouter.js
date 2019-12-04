// Import Express and external middleware
const express = require('express');

// Import Express middleware
const router = express.Router();

// Import database access
const pdb = require('../posts/postDb');

// ********************************************************
// ********************************************************
router.get('/', (req, res) => {
  // do your magic!
  pdb.get()
    .then(posts=>{
      // console.log(posts);
      res.status(200).json(posts);
    })
    .catch(err=>{
      console.log("Error in pdb.get in GET /posts ");
      res.status(500)
        .json({error: "The posts could not be accessed."});
    });
});


// ********************************************************
// ********************************************************
router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.post);  
});


// ********************************************************
// ********************************************************
router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  pdb.remove(req.params.id)
    .then(count=>{
      // console.log(count);
      if(count===1) {
        res.status(200).json(`Post with id ${req.params.id} has been deleted`);
      }
      else {
        console.log("Error in pdb.remove in DELETE /posts/:id");
        res.status(500)
          .json({error: "Post could not be deleted."});
      }
    })
    .catch(err=>{
      console.log("Error in pdb.remove in DELETE /posts/:id");
      res.status(500)
        .json({error: "Post could not be deleted."});
    })
});


// ********************************************************
// ********************************************************
router.put('/:id', validatePostId, validatePost, (req, res) => {
  // do your magic!
  const newPost = req.post;
  newPost.text = req.body.text;
  pdb.update(req.params.id,newPost)
    .then(count=>{
      console.log(count);
      if(count===1) {
        res.status(200).json(`Post with id ${req.params.id} has been updated`);
      }
      else {
        console.log("Error in pdb.update in PUT /posts/:id");
        res.status(500)
          .json({error: "The post could not be accessed."});
      }
    })
    .catch(err=>{
      console.log("Error in pdb.update in PUT /posts/:id");
      res.status(500)
        .json({error: "The post could not be accessed."});
    });
});


// ********************************************************
// custom middleware
// ********************************************************
function validatePostId(req, res, next) {
  // do your magic!
  pdb.getById(req.params.id)
    .then(post=>{
      // console.log(post);
      if(post) {
        req.post = post;
        next();
      }
      else {
        res.status(400).json({ message: "invalid post id" });
      }
    })
    .catch(err=>{
      console.log("Error in pdb.getById in validatePostId");
      res.status(500)
        .json({error: "The post could not be accessed."});
    })
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
