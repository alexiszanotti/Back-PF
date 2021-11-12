const { User, conn } = require("../db");

const usersM = [
  (user1 = {
    UUID: "0345frsde23",
    userName: "Jorge",
    type: "user",
    password: "1234",
  }),

  (user2 = {
    UUID: "0345frsde30",
    userName: "Abraham",
    type: "Admin",
    password: "1234admin",
  }),

  (user3 = {
    UUID: "0345frsde40",
    userName: "Pablo",
    type: "user",
    password: "1234",
  }),

  (user4 = {
    UUID: "0345frsde58",
    userName: "Ezequiel",
    type: "user",
    password: "1234",
  }),
];

const getAllUsers = async () => {
  let allUser = await User.findAll({
    attributes: ["id", "userName", "password", "isLoggedIn", "type"],
  });

  return allUser;
};

module.exports = getAllUsers;
