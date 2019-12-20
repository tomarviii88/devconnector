const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');

//@route POST /api/post
//@desc Post of the user
//@access Private

router.post(
  '/',
  auth,
  [
    check('text', 'Text is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      let post = new Post(newPost);
      await post.save();
      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route GET /api/post/:post_id
//@desc Get the post
//@access Private

router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(400).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route GET /api/post/
//@desc Get all posts
//@access Private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route DELETE /api/post/:post_id
//@desc Delete the post
//@access Private

router.delete('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(500).json({ msg: 'Post does not exists' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(500).json({ msg: 'User is not authorized' });
    }

    await post.remove();
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route PUT /api/post/like/:id
//@desc Like the post
//@access Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if the post has been already liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(500).json({ msg: 'Post already been liked' });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route PUT /api/post/unlike/:id
//@desc unlike the post
//@access Private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if the post has been already liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(500).json({ msg: 'Post has not been liked yet' });
    }

    //Get the remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.params.id);
    post.likes.splice(removeIndex, 1);
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route PUT /api/post/comment/:id
//@desc Comment on a post
//@access Private

router.put(
  '/comment/:id',
  auth,
  [
    check('text', 'Text is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        user: req.user.id,
        name: user.name,
        avatar: user.avatar
      };

      post.comments.unshift(newComment);
      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.log(err.message);
      res.status(400).send('Server Error');
    }
  }
);

//@route DELETE /api/post/comment/:id/:comment_id
//@desc Delete the comment of a post
//@access Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Get the comment

    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    //Make sure the comment exists
    if (!comment) {
      return res.status(400).json({ msg: 'Comment does not exists' });
    }

    //Check the user
    if (comment.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: 'User is not authorized ' });
    }

    //Get the remove index
    const removeindex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeindex, 1);

    await post.save();

    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
