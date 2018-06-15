const express = require("express");
const router = express.Router();

// @route       GET api/posts/test
// @desc        test profile route
// @access      Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

module.exports = router;
