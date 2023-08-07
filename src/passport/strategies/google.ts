// import {
//   Strategy as GoogleStrategy,
//   StrategyOptions,
// } from "passport-google-oauth20";
// import { userService } from "../../services/user.service";

// const passportConfig: StrategyOptions = {
//   clientID: process.env.GOOGLE_CLIENT_ID!,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//   callbackURL: "http://localhost:3008/auth/google/callback",
// };

// // 이 부분에서 사용자를 데이터베이스에서 가져 오거나 생성합니다.
// // 여기서는 User 모델의 인터페이스를 사용하여 예를 들겠습니다.
// export default new GoogleStrategy(
//   passportConfig,
//   async (accessToken, refreshToken, profile, done) => {
//     if (!profile) {
//       return done(null, undefined, {
//         message: "Error",
//       });
//     }

//     const userInfo = {
//       email: profile.emails?.[0].value as string,
//       name: ((profile.name?.familyName as string) +
//         profile.name?.givenName) as string,
//       likes: [],
//     };

//     const { _id } = await userService.findOrCreate(userInfo);
//     return done(null, { _id });
//   }
// );
