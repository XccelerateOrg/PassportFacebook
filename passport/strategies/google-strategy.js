const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
require("dotenv").config();

const knex = require("knex")({
  client: "postgresql",
  connection: {
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
  },
});
module.exports = (passport) => {
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://localhost:8080/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const google_id = profile.id;
        const email = profile.emails[0].value;
        console.log("id", google_id);
        console.log("email", email);
        const user = await knex("users").where({ google_id }).first();
        if (!user) {
          const newUser = {
            google_id,
            email,
          };
          const id = await knex("users").insert(newUser).returning("id"); //[{id: 1}]
          newUser.id = id[0].id;
          return done(null, newUser);
        } else {
          return done(null, user);
        }
      }
    )
  );
};
