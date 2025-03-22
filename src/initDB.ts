import debug from "debug";
import * as mongoose from "./lib/mongooseManager";
import User from "./model/User";
import Product from "./model/Product";

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

const initProducts = async () => {
  // Find all users using find
  const users = await User.find({});

  // Create array of products
  const products = [
    {
      name: "product1",
      description: "description1",
      price: 100,
      quantity: 10,
      image: "https://no-image.jpg",
      tags: ["work"],
      owner: users[0]._id,
    },
    {
      name: "product2",
      description: "description2",
      price: 200,
      quantity: 20,
      image: "https://no-image.jpg",
      tags: ["work"],
      owner: users[1]._id,
    },
    {
      name: "product3",
      description: "description3",
      price: 300,
      quantity: 30,
      image: "https://no-image.jpg",
      tags: ["work"],
      owner: users[2]._id,
    },
  ];

  // Delete previous products using deleteMany
  log("Deleting previous products...");
  const deleted = await Product.deleteMany({});
  log(deleted.deletedCount, " products deleted");

  // Insert new products using insertMany
  log("Adding products...");
  const added = await Product.insertMany(products);
  log(added.length, " products added");
};

const initDB = async () => {
  await mongoose.connect();

  await initUsers();

  await initProducts();

  await mongoose.disconnect();
};

initDB();
