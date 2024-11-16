const express = require('express');
const passport = require("passport");

const {createUser,loginUser,verifyUser} = require('../controllers/userController')


const router = express.Router();


router.post("/register", createUser);
router.post("/login",loginUser);
router.get("/protected",passport.authenticate('jwt', { session: false }),verifyUser);



module.exports = router