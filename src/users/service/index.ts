import { comparePassword} from "../../utils/helper";
import { IUser } from "../interface";
import User from "../models/user-model";



const createUserService = async(user: IUser) => {
  try {
    const createUser = new User(user);
    const results = await createUser.save();
    return results.errors
      ? {
          code: 500,
          msg: "The server could not process your request at the moment",
        }
      : { code: 201, msg: `You have successfully signed up`, data: results };
  } catch (error:any) {
    if (error.code == 11000)
      return { code: 400, msg: `User with email ${user.email} already exisit` };
      return { code: 400, msg: error.message };
  }
}

//login a user 
const loginUserService = async(data: Partial<IUser>) => {
  try {
    const user = await User.findOne({ email: data.email });
    if (!user)
      return { code: 400, msg: `User with email ${data.email} does not exist` };
    const isMatch = await comparePassword( user.password,data.password as string);
    if (!isMatch)
      return { code: 400, msg: `Password does not match` };
    return { code: 200, msg: `You have successfully logged in`, user: user };
  } catch (error:any) {
    return { code: 400, msg: error.message };
  }
}

const followUser = async (userId: string, targetUserId: string) => {
  try {
    if (userId === targetUserId) {
      return { code: 400, message: "You cannot follow yourself." };
    }
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return { code: 404, message: "The user you are trying to follow does not exist. Please make sure you have entered the correct user ID." };
    }
    await User.findByIdAndUpdate(userId, { $addToSet: { following: targetUser._id } });
    await User.findByIdAndUpdate(targetUserId, { $addToSet: { followers: userId } });
    return {code: 200, message: "Successfully Followed User"}
  } catch (error: any) {
    return {code: 400, message: "Unable to follow user" || error.message}
  }
};

const unFollowUser = async (userId: string, targetUserId: string) => {
  try {
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return { code: 404, message: "The user you are trying to unfollow does not exist. Please make sure you have entered the correct user ID." };
    }

    await User.findByIdAndUpdate(userId, { $pull: { following: targetUserId } });
    await User.findByIdAndUpdate(targetUserId, { $pull: { followers: userId } });
    return {code: 200, message: "Successfully Unfollowed User"}
  } catch (error: any) {
    return {code: 400, message: "Unable to unfollow user" || error.message }
  }
};


export { createUserService, loginUserService, followUser, unFollowUser } 