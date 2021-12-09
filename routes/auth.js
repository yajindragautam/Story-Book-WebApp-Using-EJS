const express = require("express");
const passport = require("passport");
const router = express.Router();

// @ desc Auth with Google
//@route  Get /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

/*
 *! Hi Yajindra
 */
// @ desc Google auth callback
//@route  Get /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashbord");
  }
);
// @ desc User Logout
//@route  Get /auth/logout
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect('/')
});

// Exporting
module.exports = router;
