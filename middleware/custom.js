// Import database access
const udb = require('../users/userDb');
const pdb = require('../posts/postDb');


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

  module.exports = {validateUserId, validateUser, validatePost, validatePostId};