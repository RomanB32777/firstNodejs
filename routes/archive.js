const express = require('express');
const router = express.Router();
const moment = require('moment');
moment.locale('ru');

const config = require('../config');
const models = require('../models');

async function posts(req, res) {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const perPage = +config.PER_PAGE;
  const page = req.params.page || 1;

  try {
    const posts = await models.Post.find({
       status: 'published'
    })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate('owner')
      .sort({ createdAt: -1 });

    const count = await models.Post.count();

    res.render('index', {
      posts,
      current: page,
      pages: Math.ceil(count / perPage),
      user: {
        id: userId,
        login: userLogin
      }
    });
  } catch (error) {
    throw new Error('Server Error');
  }
}

// routers
router.get('/', (req, res) => posts(req, res));
router.get('/archive/:page', (req, res) => posts(req, res));

router.get('/posts/:post', async (req, res, next) => {
  const url = req.params.post.trim().replace(/ +(?= )/g, '');
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;

  if (!url) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  } else {
    try {
      const post = await models.Post.findOne({
        url
      }).populate('uploads');

      if (!post) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
      } else {
        const comments = await models.Comment.find({
          post: post.id,
          parent: { $exists: false }
        });
        //.populate('children');
        // .populate({
        //   path: 'children',
        //   populate: {
        //     path: 'children',
        //     populate: {
        //       path: 'children'
        //     }
        //   }
        // });

        console.log(comments);

        res.render('post/post', {
          post,
          comments,
          moment,
          user: {
            id: userId,
            login: userLogin
          }
        });
      }
    } catch (error) {
      throw new Error('Server Error');
    }
  }
});

// users posts
router.get('/users/:login/:page*?', async (req, res) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const perPage = +config.PER_PAGE;
  const page = req.params.page || 1;
  const login = req.params.login;

  try {
    const user = await models.User.findOne({
      login
    });

    const posts = await models.Post.find({
      owner: user.id
    })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate('owner')
      .sort({ createdAt: -1 });

    const count = await models.Post.count({
      owner: user.id
    });

    res.render('archive/user', {
      posts,
      _user: user,
      current: page,
      pages: Math.ceil(count / perPage),
      user: {
        id: userId,
        login: userLogin
      }
    });
  } catch (error) {
    throw new Error('Server Error');
  }
});

module.exports = router;


// const express = require('express');
// const router = express.Router();
//
// const config = require('../config');
// const models = require('../models');
//
// function posts(req, res) {
// const userId = req.session.userId;
// const userLogin = req.session.userLogin;
// const perPage = 1;
// const page = req.params.page || 1;
//
// models.Post.find({})
// .skip(perPage * page - perPage)
// .limit(perPage)
// .then(posts => {
//   models.Post.count()
//     .then(count => {
//       res.render('index', {
//         posts,
//         current: page,
//         pages: Math.ceil(count / perPage),
//         user: {
//           id: userId,
//           login: userLogin
//         }
//       });
//     })
//     .catch(() =>{
//       throw new Error('Server error');
//     });
// })
// .catch(() =>{
//   throw new Error('Server error');
// });
// }
//
// // routers
// router.get('/', (req, res) => posts(req, res));
// router.get('/archive/:page', (req, res) => posts(req, res));
//
// router.get('/posts/:post', (req, res, next) => {
//   const url = req.params.post.trim().replace(/ +(?= )/g, '');
//   const userId = req.session.userId;
//   const userLogin = req.session.userLogin;
//
//   if (!url){
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
//   }
//   else {
//     models.Post.findOne({
//       url
//     }).then(post => {
//       if (!post){
//         const err = new Error('Not Found');
//         err.status = 404;
//         next(err);
//       }
//       else{
// const comments = models.Comment.find({
//   post: post.id
// });
//
//         res.render('post/post', {
//           post,
//           comments,
//           user: {
//             id: userId,
//             login: userLogin
//           }
//         });
//       }
//     })
//     .catch(() =>{
//         throw new Error('Server error');
//       });
//   }
// });
//
// module.exports = router;
