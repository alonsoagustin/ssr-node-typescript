import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
  email: string;
  password: string;
  comparePassword(clearPassword: string): Promise<boolean>;
}

interface UserModel extends mongoose.Model<IUser> {
  hashPassword(clearPassword: string): Promise<string>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
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
    methods: {
      comparePassword: async function (clearPassword: string) {
        return bcrypt.compare(clearPassword, this.password);
      },
    },
  }
);

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
