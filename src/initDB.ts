import debug from "debug";
import * as mongoose from "./lib/mongooseManager";
import User from "./model/User";

const log = debug("app:initDB");

const initUsers = async () => {
  const users = [
    {
      username: "admin@gmail.com",
      password: await User.hashPassword("123456"),
    },
    {
      username: "user1@gmail.com",
      password: await User.hashPassword("654321"),
    },
    {
      username: "user2@gmail.com",
      password: await User.hashPassword("135791"),
    },
  ];

  log("Deleting all users...");
  const deleted = await User.deleteMany({});
  log(deleted.deletedCount, " users deleted");

  log("Adding users...");
  const added = await User.insertMany(users);
  log(added.length, " users added");
};

const initDB = async () => {
  await mongoose.connect();

  await initUsers();

  await mongoose.disconnect();
};

initDB();
