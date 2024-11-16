-- CreateTable
CREATE TABLE "Exercises" (
    "id" SERIAL NOT NULL,
    "workout_session_id" INTEGER NOT NULL,
    "name" VARCHAR NOT NULL,
    "comment" TEXT,

    CONSTRAINT "Exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sets" (
    "id" SERIAL NOT NULL,
    "exercise_id" INTEGER NOT NULL,
    "load" DECIMAL NOT NULL,
    "rep" INTEGER NOT NULL,

    CONSTRAINT "Sets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutSessions" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "workout_types_id" INTEGER NOT NULL,
    "time" TEXT,
    "user_id" INTEGER,

    CONSTRAINT "WorkoutSessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutTypes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "WorkoutTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "hash" VARCHAR NOT NULL,
    "salt" VARCHAR NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercises" ADD CONSTRAINT "Exercises_workout_session_id_fkey" FOREIGN KEY ("workout_session_id") REFERENCES "WorkoutSessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Sets" ADD CONSTRAINT "Sets_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercises"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "WorkoutSessions" ADD CONSTRAINT "WorkoutSessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "WorkoutSessions" ADD CONSTRAINT "WorkoutSessions_workout_types_id_fkey" FOREIGN KEY ("workout_types_id") REFERENCES "WorkoutTypes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
