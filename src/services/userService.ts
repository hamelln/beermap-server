// import { User } from "../models/user";

// export class UserService {
//   async findUserByEmail(email: string) {
//     const usersRef = database.ref("users");
//     const snapshot = await usersRef
//       .orderByChild("email")
//       .equalTo(email)
//       .once("value");
//     const userObj = snapshot.val();

//     if (userObj) {
//       const userKey = Object.keys(userObj)[0];
//       const userData = userObj[userKey];
//       userData.key = userKey;
//       return userData;
//     } else {
//       return null;
//     }
//   }

//   async createUser(userInfo: User) {
//     const newUserRef = await database.ref("users").push({
//       email: userInfo?.email,
//       name: userInfo.name,
//       likes: userInfo.likes,
//     });

//     const newUserSnapshot = await newUserRef.once("value");
//     const newUser = newUserSnapshot.val();
//     newUser.key = newUserRef.key;

//     return newUser;
//   }

//   async findOrCreate(userInfo: User) {
//     const currentUser = await this.findUserByEmail(userInfo.email);

//     if (currentUser) return currentUser;

//     const newUser = await this.createUser(userInfo);
//     return newUser;
//   }

//   async updateByQuery(userKey: string, updatedInfo: Partial<User>) {
//     await database.ref(`users/${userKey}`).update(updatedInfo);
//   }

//   //? 토큰으로 인증하는 함수
//   async verifyToken() {}
// }

// export const userService = new UserService();
