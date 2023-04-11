const passport = require("passport");

module.exports = (express) => {
  const router = express.Router();

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/signup");
  }

  router.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/index.html");
  });

  router.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["email", "user_gender", "user_link"],
    })
  );
  // Redirect the user to Facebook for authentication.  When complete,
  // Facebook will redirect the user back to the application at
  //     /auth/facebook/callback

  router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/secret",
      failureRedirect: "/login",
    })
  );
  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.

  router.get("/login", (req, res) => {
    res.sendFile(__dirname + "/pages/login.html");
  });

  router.get("/secret", isLoggedIn, (req, res) => {
    console.log(req.user.id);
    console.log(req.session.id);

    // res.send('This is a secret page (or rather message) you will get this on a successful login.');
    res.sendFile(__dirname + "/pages/secret.html");
  });

  router.get("/error", (req, res) => {
    res.send("You've not logged in. Please login.");
  });

  router.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/",
      failureRedirect: "/error",
    })
  );

  router.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/pages/signup.html");
  });

  router.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/",
      failureRedirect: "/error",
    })
  );

  router.get("/logout", (req, res) => {
    req.logout(function (err) {
      if (err) return next(err);
      res.redirect("/login");
    });
  });
  // req.session.destroy((err) => {
  //   if (err) return next(err);

  //   // req.logout();

  //   res.redirect("/login");
  // });
  router.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["email", "profile"],
    })
  );

  router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );

  return router;
};
