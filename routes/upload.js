const express = require('express');
const router = express.Router();
const path = require('path');

const multer = require('multer');
const models = require('../models');

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, 'uploads');
  },
  filename: async (req, file, cb) => {
      const userId = req.session.userId;
      const fileName = Date.now().toString(36) + path.extname(file.originalname);

    //  const dir = req.dir; // ??????

      //console.log(dir);


console.log(req.body); // { postId: '5b059790979c832a1215016a' }

// find post
const post = await models.Post.findById(req.body.postId);
if (!post) {
  const err = new Error('No Post');
  err.code = 'NOPOST';
  return cb(err);
}

// upload
const upload = await models.Upload.create({
  owner: userId,
  path: '/uploads' + '/' + fileName
});

// write to post
const uploads = post.uploads;
uploads.unshift(upload.id);
post.uploads = uploads;
await post.save();

 req.filePath = '/uploads' + '/' + fileName;

    cb(null, fileName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      const err = new Error('Extention');
      err.code = 'EXTENTION';
      return cb(err);
    }
    cb(null, true);
  }
}).single('file');

// POST is add
router.post('/image', (req, res) => {
  upload(req, res, err => {
    let error = '';
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        error = 'Картинка не более 1mb!';
      }
      if (err.code === 'EXTENTION') {
        error = 'Только jpeg и png!';
      }
      if (err.code === 'NOPOST') {
  error = 'Обнови страницу!';
}
    }

    res.json({
      ok: !error,
      error,
      filePath: req.filePath
    });
  });
});

module.exports = router;
