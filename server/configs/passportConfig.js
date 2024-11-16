const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Go up one directory, then look for file name
const pathToKey = path.join(__dirname, "./keys", "id_rsa_pub.pem");

// The verifying public key
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
  // The JWT payload is passed into the verify callback
  passport.use(
    new JwtStrategy(options, async function (jwt_payload, done) {
      // Since we are here, the JWT is valid!
      try {
        const user = await prisma.Users.findUnique({
          where: {
            id: jwt_payload.sub,
          },
        });

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }

      } catch (error) {
        return done(error,false);
      }
    })
  );
};
