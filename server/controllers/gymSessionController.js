const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
var jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const pathToKey = path.join(__dirname, "../configs/keys", "id_rsa_pub.pem");

const PUB_KEY = fs.readFileSync(pathToKey, "utf8");


const authenticateToken = async (req) => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, PUB_KEY, (err, decoded) => {
        if (err) {
          reject(new Error("Invalid token"));
        }
        resolve(decoded);
      });
    });

    return decoded;
  } catch (err) {
    console.error(err.message);
    throw new Error("Failed to authenticate token");
  }
};

const getAllSessions = async (req, res) => {
  try {
    const decoded = await authenticateToken(req);

    const Sessions = await prisma.WorkoutSessions.findMany({
      where:{user_id: decoded.sub},
      include: {
        WorkoutTypes: true,
        Exercises: {
          include: {
            Sets: true,
          },
        },
      },
    });

    res.status(200).json(Sessions);
  } catch (err) {
    res.status(401).json({ error: err.message || "Unauthorized" });
  }
};

const addOneSession = async (req, res) => {
  const { workoutType, exercises, time } = req.body;

  try {
    const decoded = await authenticateToken(req);
    const workoutTypeRecord = await prisma.WorkoutTypes.findFirst({
      where: { name: workoutType },
    });
    if (!workoutTypeRecord) {
      return res.status(400).json({ error: "Invalid workout type" });
    }

    const newSession = await prisma.WorkoutSessions.create({
      data: {
        date: new Date(),
        workout_types_id: workoutTypeRecord.id,
        time: time,
        user_id: decoded.sub
      },
    });

    const sessionId = newSession.id;

    // Loop through the exercises and create them
    for (const exercise of exercises) {
      const newExercise = await prisma.Exercises.create({
        data: {
          name: exercise.name,
          comment: exercise.comment || "",
          workout_session_id: sessionId,
        },
      });
      const exerciseId = newExercise.id;

      // Map the sets data and create them
      const setsData = exercise.sets.map((set) => ({
        load: parseFloat(set.load),
        rep: parseInt(set.reps),
        exercise_id: exerciseId,
      }));
      await prisma.sets.createMany({
        data: setsData,
      });
    }

    res.status(201).json({ message: "Workout session added successfully" });
  } catch (error) {
    console.error("Error adding workout session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAllSessions, addOneSession };
