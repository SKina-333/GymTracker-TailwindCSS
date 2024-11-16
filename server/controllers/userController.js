const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const utils = require("../configs/libs/utils");
const prisma = new PrismaClient();

const createUser = async (req, res) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }
  const saltHash = utils.genPassword(password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  try {
    const newUser = await prisma.Users.create({
      data: {
        username: username,
        hash: hash,
        salt: salt,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Failed to add user:", error);
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }
  try {
    const user = await prisma.Users.findFirst({
      where: {
        username: username
      },
    });
    
    if (!user) {
      res.status(401).json({ success: false, msg: "could not find user" });
    }
    const isValid = utils.validPassword(password, user.hash, user.salt);

    

    if (isValid) {
      const tokenObject = utils.issueJWT(user);
      res.status(200).json({
        success: true,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
      });
    } else {
      res.status(401).json({ success: false, msg: "you entered the wrong password" });
    }
  } catch (error) {
    console.error("Failed to access DB:", error)
  }
};

const verifyUser = (req, res) => {
  res.status(200).json({
    success: true,
    msg: "You are successfully authenticated to this route!",
  });
};

module.exports = {
  createUser,
  loginUser,
  verifyUser
};
