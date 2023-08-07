/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
// import google from "./strategies/google";

const passportConfig = () => {
  passport.initialize();

  passport.serializeUser((user: any, done: any) => {
    done(null, user);
  });

  passport.deserializeUser((obj: any, done: any) => {
    done(null, obj);
  });

  // passport.use("google", google);
};

export default passportConfig;
