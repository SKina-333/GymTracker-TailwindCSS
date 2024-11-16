const express = require('express');
const passport = require("passport");


const {getAllSessions,addOneSession} = require('../controllers/gymSessionController');


const router = express.Router();

router.get("/", passport.authenticate('jwt', { session: false }),getAllSessions);
router.post("/",passport.authenticate('jwt', { session: false }) ,addOneSession);



module.exports = router