const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const router = express.Router();

// Load Post Model
const Post = require("../../models/Post");
// Load User Model
const User = require("../../models/User");
// Load Profile Model
const Profile = require("../../models/Profile");
// Load Input Validation
const validatePostInput = require("../../validation/post");
const validateCommentInput = require("../../validation/comment");

// @route       GET api/posts/test
// @desc        test posts route
// @access      Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route       GET api/posts/:post_id
// @desc        Get one posts
// @access      Public
router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ message: "No post found" }));
});

// @route       GET api/posts/
// @desc        Read all posts
// @access      Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ message: "No post found" }));
});

// @route       POST api/posts/
// @desc        create new post
// @access      Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route       DELETE api/posts/:post_id
// @desc        test posts route
// @access      Private
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // check for post owner
    Post.findById(req.params.post_id)
      .then(post => {
        // post.user eh obj req.user.id eh string
        if (post.user == req.user.id) {
          post
            .remove()
            .then(() => res.json({ post_id: req.params.post_id }))
            .catch(err => res.status(404).json(err));
        } else {
          return res.status(401).json({ message: "User not authorized" });
        }
      })
      .catch(err => res.status(404).json({ message: "Post not found" }));
  }
);

// @route       POST api/posts/like/:post_id
// @desc        Toggle like posts route
// @access      Private
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // check for post owner
    Post.findById(req.params.post_id)
      .then(post => {
        // const jaLiked = post.likes.filter(
        //   like => like.user.toString() === req.user.id
        // );
        const jaLiked = post.likes.find(x => x.user == req.user.id);
        if (jaLiked) {
          filterLiked = post.likes.filter(
            like => like.user.toString() !== req.user.id
          );
          post.likes = filterLiked;
          post.save().then(post => res.json(post));
        } else {
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        }
      })
      .catch(err => res.status(404).json({ message: "Post not found" }));
  }
);

// @route       POST api/posts/unlike/:post_id
// @desc        unlike posts route
// @access      Private
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // check for post owner
    Post.findById(req.params.post_id)
      .then(post => {
        filterLiked = post.likes.filter(
          like => like.user.toString() !== req.user.id
        );
        post.likes = filterLiked;
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ message: "Post not found" }));
  }
);

// @route       POST api/posts/comment/:post_id
// @desc        Comment posts route
// @access      Private
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.post_id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ message: "Post not found" }));
  }
);

// @route       DELETE api/posts/comment/:post_id/:comment_id
// @desc        Delete post comments
// @access      Private
router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        filterComment = post.comments.filter(
          cmt => cmt._id.toString() !== req.params.comment_id
        );
        post.comments = filterComment;
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ message: "Post not found" }));
  }
);

module.exports = router;
