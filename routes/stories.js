const express = require("express");
const Story = require("../models/Story");
const { ensureAuth } = require("../middleware/auth");
const router = express.Router();

// @ desc stories/add
//@route  Get /
router.get("/add", ensureAuth, (req, res) => {
  //res.send("You are in Story Add Page");
  res.render("stories/add");
});
// @ desc Process add form
//@route  Post /stories
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    console.log(req.body.user);
    console.log(req.user.id);
    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});
// @desc    Show all stories
// @route   GET /stories
router.get("/", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();

    res.render("stories/index", {
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// @ desc Edit Story By ID
//@route  Get /edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    const story = await Story.findOne({
      _id: req.params.id,
    }).lean();
    // If story Is Not Available
    if (!story) {
      res.render("error/404");
    }
    // Check Uere ID
    if (story.user === req.user.id) {
      res.redirect("/stories");
    } else {
      res.render("stories/edit", {
        story,
      });
    }
  } catch (error) {
    console.log(error);
    return res.render("error/500");
  }
});

// @ desc uPDATE sTORU
//@route  PUT /stories/:id
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).lean();
    // Check Story Availibility
    if (!story) {
      return res.render("error/404");
    }
    // Check User Auth
    if (story.user != req.user.id) {
      res.redirect("/stories");
    } else {
      story = await Story.findOneAndUpdate({ _id: res.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
      res.redirect("/dashbord");
    }
  } catch (error) {
    console.log(error);
    return res.render("error/500");
  }
});

// @ desc Delete Story
//@route  Get /stories/:id
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    await Story.remove({ _id: req.params.id });
    res.redirect("/dashbord");
  } catch (error) {
    console.log(error);
    return res.render("error/500");
  }
});

// @ desc View Single Story Page
//@route  Get /:id
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).populate("user").lean();

    if (!story) {
      return res.render("error/404");
    }
    res.render("stories/show", {
      story,
    });
  } catch (error) {
    console.log(error);
    return res.render("error/404");
  }
});

// @ desc User Stories
//@route  Get /stories/user/:id
router.get("/user/:userId", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({
      user: req.params.userId,
      status: "public",
    })
      .populate("user")
      .lean();

    res.render("stories/index", {
      stories,
    });
  } catch (error) {
    console.log(error);
    res.render("error/500");
  }
});

// Exporting
module.exports = router;
