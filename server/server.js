//Imports
require("dotenv").config();


const express = require("express");



//Middleware imports
const corsConfig = require('./configs/cors');
const sessionConfig = require("./configs/express-session");


//Application
const app = express();
const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});



//Middleware
const passport = require("passport");
require('./configs/passportConfig')(passport);
app.use(passport.initialize());
app.use(corsConfig);
app.use(sessionConfig);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers
const gymRouter = require('./routers/gymSessionRouter');
app.use('/gym',gymRouter);

const userRouter = require('./routers/userRouter');
app.use('/user',userRouter);






//Routers
app.get("/", (req, res) => {
  res.json({ message: "Hello from Express!" });
});







