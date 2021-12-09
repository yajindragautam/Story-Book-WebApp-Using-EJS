const express = require("express");
const Story = require("../models/Story");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const router = express.Router();

// @ desc Login/Landing
//@route  Get /
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

/*
 *! Hi Yajindra
 */
// @ desc Dashbord
//@route  Get /dashbord
router.get("/dashbord", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render("dashbord", {
      name: req.user.firstName,
      stories,
    });
  } catch (error) {
    console.log(error);
    res.render("error/500");
  }
});

// Exporting
module.exports = router;
