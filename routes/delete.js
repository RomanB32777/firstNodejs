
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const models = require('../models');

router.post('/post', async (req, res) =>{


  res.json({
    data: req.body.postId
  });


});

router.post('/image', async (req, res) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;

  console.log(req.body);

  let photo = req.body.photo;
  let postId = req.body.post;
   let pathPhoto = '.' + req.body.path;

   await models.Upload.findOneAndDelete(
       {
         _id: photo,
        // owner: userId
       },
       async function(err) {
        if (!err) {
          const post = await models.Post.findById(postId);

          let uploads = post.uploads;
          uploads.remove(photo);
          post.uploads = uploads;
          await post.save();

   fs.unlinkSync(pathPhoto);

          res.json({
          ok: 'ok',
          data: req.body.photo
          });
        }
        else {
          res.json({
          ok: 'false'
          });
        }
      });

//console.log(delPhoto);
  // res.json({
  // ok: 'ok',
  // data: req.body.photo
  // });
});

module.exports = router;
