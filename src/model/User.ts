import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
  username: string;
  password: string;
}

interface UserModel extends mongoose.Model<IUser> {
  hashPassword(clearPassword: string): Promise<string>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      toLowerCase: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: [6, "Password must be at least 6 characters long"],
    },
  },
  {
    timestamps: true,
    statics: {
      hashPassword: async function (clearPassword: string) {
        return bcrypt.hash(clearPassword, 10);
      },
    },
  }
);

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
