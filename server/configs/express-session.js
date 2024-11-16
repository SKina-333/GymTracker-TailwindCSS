require("dotenv").config();

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const database = require("./db-connection");


const sessionConfig = {
    store: new pgSession({
        pool: database,        
        createTableIfMissing : true 
    }),
    secret: process.env.COOKIE_SECRET,  
    resave: false, 
    saveUninitialized: false,                          
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,    // 7 days
        
    },
}

module.exports = session(sessionConfig);

