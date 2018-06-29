const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const request = require("request");
const router = express.Router();

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Profile
const User = require("../../models/User");
// Load Input Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// @route       GET api/profile/test
// @desc        test profile route
// @access      Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route       GET api/profile
// @desc        Get current users profile
// @access      Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.profile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        return res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route       GET api/profile/all
// @desc        Get All profiles
// @access      Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.profiles = "There are no profiles";
        return res.status(404).json;
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json(err));
});

// @route       GET api/profile/handle/:handle
// @desc        Get profile by handle
// @access      Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route       GET api/profile/user/:user_id
// @desc        Get profile by user_id
// @access      Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route       POST api/profile/experience
// @desc        Add Experience to profile
// @access      Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newExp = {};

        if (req.body.title) newExp.title = req.body.title;
        if (req.body.company) newExp.company = req.body.company;
        if (req.body.location) newExp.location = req.body.location;
        if (req.body.from) newExp.from = req.body.from;
        if (req.body.to) newExp.to = req.body.to;
        if (req.body.current) newExp.current = req.body.current;
        if (req.body.description) newExp.description = req.body.description;

        // Add to exp array
        profile.experience.unshift(newExp);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route       DELETE api/profile/experience/:exp_id
// @desc        Delete Experience to profile
// @access      Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const updatedArray = profile.experience.filter(
          exp => exp.id !== req.params.exp_id
        );

        profile.experience = updatedArray;

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route       POST api/profile/education
// @desc        Add Education to profile
// @access      Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newEdu = {};

        if (req.body.school) newEdu.school = req.body.school;
        if (req.body.degree) newEdu.degree = req.body.degree;
        if (req.body.fieldofstudy) newEdu.fieldofstudy = req.body.fieldofstudy;
        if (req.body.from) newEdu.from = req.body.from;
        if (req.body.to) newEdu.to = req.body.to;
        if (req.body.current) newEdu.current = req.body.current;
        if (req.body.description) newEdu.description = req.body.description;

        // Add to exp array
        profile.education.unshift(newEdu);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route       DELETE api/profile/education/:edu_id
// @desc        Delete Education profile
// @access      Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const updatedArray = profile.education.filter(
          edu => edu.id !== req.params.edu_id
        );

        // console.log("AQUI MUDAAaaa CARALHO!!!");
        profile.education = updatedArray;

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route       POST api/profile
// @desc        Create or update current users profile
// @access      Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    // console.log("AQUI AAAAAAA");
    // console.log(req.body);
    // Get filds
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.github) profileFields.github = req.body.github;
    // Skills - Split into array
    if (typeof req.body.skills !== "undefined") {
      let skillsArray = req.body.skills.split(",");
      skillsArray = skillsArray.map(x => x.trim());
      profileFields.skills = skillsArray.filter(Boolean);
    }
    // Social stuff
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    profileFields.company = req.body.company;
    profileFields.github = req.body.github;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(console.log(profile)));
      } else {
        // create
        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }
          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route       DELETE api/profile/
// @desc        Delete user and profile
// @access      Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => User.findOneAndRemove({ _id: req.user.id }))
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json(err));
  }
);

// @route       GET api/profile/github/:username/:count/:sort
// @desc        Get github data from github api
// @access      Public
router.get("/github/:username/:count/:sort", (req, res) => {
  username = req.params.username;
  clientId = "56b5966da49bd288e0a7";
  clientSecret = "d0832bd2962c27e2b8944fcc04309a3b79fd1c3f";
  count = req.params.count;
  sort = req.params.sort;
  const options = {
    url: `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`,
    headers: {
      "User-Agent": "request"
    }
  };
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
      res.json(info);
    }
  }
  request(options, callback);
});

module.exports = router;
