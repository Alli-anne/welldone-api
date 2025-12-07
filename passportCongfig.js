// Load environment variables
require('dotenv').config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { getDb } = require('./database/connect'); // your MongoDB connection
const { ObjectId } = require('mongodb');

// Configure Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('=== SUCCESSFUL CALLBACK ===');
      console.log('Profile:', profile.id, profile.displayName);
      try {
        const db = getDb();
        let user = await db.collection('users').findOne({ googleId: profile.id });

        if (!user) {
          const result = await db.collection('users').insertOne({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value
          });
          user = await db.collection('users').findOne({ _id: result.insertedId });
        }

        done(null, user);
      } catch (err) {
        console.error('=== CALLBACK ERROR ===', err);
        done(err, null);
      }
    }
  )
);

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const db = getDb();
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// No need to export passport; just require this file in server.js
module.exports = passport;