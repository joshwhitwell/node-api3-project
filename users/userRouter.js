//imports
const express = require('express');
const Users = require('./userDb')
const Posts = require('../posts/postDb')

//router
const router = express.Router();

//custom middleware
function validateUserId(req, res, next) {
  const { id } = req.params
  Users.getById(id)
    .then(user => {
      if (user) {
        req.user = user
        next()
      } else {
        next({ code: 404, message: `User not found with ID: ${id}`})
      }
    })
    .catch(() => {
      next({ code: 500, message: `Error validating user with ID: ${id}`})
    })
}

function validateUser(req, res, next) {
  const { body } = req
  const { name } = req.body
  if (!body) {
    next({ code: 400, message: 'missing user data' })
  } else if (!name) {
    next({ code: 400, message: 'missing required name field' })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  const { body } = req
  const { text } = req.body
  if (!body) {
    next({ code: 400, message: 'missing post data' })
  } else if (!text) {
    next({ code: 400, message: 'missing required text field' })
  } else {
    req.body = { ...req.body, user_id: req.user.id }
    next()
  }
}

//routes
router.post('/', [validateUser], (req, res, next) => {
  Users.insert(req.body)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(() => {
      next({ code: 500, message: 'Error posting user' })
    })
});

router.post('/:id/posts', [validateUserId, validatePost], (req, res, next) => {
  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(() => {
      next({ code: 500, message: 'Error posting post' })
    })
});

router.get('/', (req, res, next) => {
  Users.get()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(() => {
      next({ code: 500, message: 'Error getting users' })
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
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


router.use((err, req, res, next) => {
  res.status(err.code).json(err)
})

module.exports = router;
