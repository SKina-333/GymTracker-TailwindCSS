import { useState, useEffect } from "react";
import LoadRepsInput from "./loadRepsInput";
import { useWorkoutContext } from "./contexts/workoutContext.jsx";
import { format } from "date-fns";


import axiosInstance from "../routers/configs/axiosIntercepter.jsx";

export default function NewSessionFormContainer() {
  const { workoutSessions, refetchSessions } = useWorkoutContext();
  const [exercises, setExercises] = useState([]);
  const [sessionType, setSessionType] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [hasPreviousData, setHasPreviousData] = useState(false);

  const handleSessionTypeChange = (e) => {
    const selectedType = e.target.value;
    setSessionType(selectedType);

    const previousSession = workoutSessions.find(
      (session) =>
        session.WorkoutTypes.name.toLowerCase() === selectedType.toLowerCase()
    );
    setHasPreviousData(!!previousSession);
    setIsCopied(false);
  };

  const copyPreviousSessionData = () => {
    if (sessionType === "") return;

    const previousSession = workoutSessions
      .filter(
        (session) =>
          session.WorkoutTypes.name.toLowerCase() === sessionType.toLowerCase()
      )
      .sort(
        (a, b) => b.id - a.id 
      )[0]; 

    if (previousSession) {
      const copiedExercises = previousSession.Exercises.map((exercise) => ({
        name: exercise.name,
        id: exercise.id,
        sets: exercise.Sets.length ? exercise.Sets : [{ load: "", reps: "" }],
        comment: exercise.comment || "",
      }));
      setExercises(copiedExercises);
      setIsCopied(true);
    }
  };

  const handleExerciseAttributeChange = (index, attribute, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][attribute] = value;
    setExercises(updatedExercises);
  };

  const addNewExercise = () => {
    setExercises([
      ...exercises,
      { name: "", id: Date.now(), sets: [{ load: "", reps: "" }], comment: "" },
    ]);
  };

  const removeExercise = (id) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  };

  const handleSetsUpdate = (exerciseIndex, sets) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets = sets;
    setExercises(updatedExercises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get current time
    const currentTime = format(new Date(), "hh:mm a");

    const formData = {
      workoutType: sessionType,
      exercises: exercises.map((exercise) => ({
        name: exercise.name,
        sets: exercise.sets.map((set) => ({
          load: set.load,
          reps: set.reps,
        })), // Make sure `load` and `reps` are present
        comment: exercise.comment || "",
      })),
      time: currentTime,
    };

    try {
      const response = await axiosInstance.post("https://gymtracker-tailwindcss.onrender.com/gym", formData, {
        withCredentials: true,
      });
      if (response.status === 201) {
        console.log("Response message:", response.data);
        setExercises([]);
        setIsCopied(false);
        refetchSessions();
      }
    } catch (err) {
      console.error("Error adding session to server:", err);
    }
  };

  // Check if copied data should be reset
  useEffect(() => {
    if (exercises.length === 0) {
      setIsCopied(false);
    }
  }, [exercises]);

  return (
    <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
      <select
        className="mt-3 rounded-lg border bg-lime-500 text-green-950 py-1.5 px-3 font-semibold"
        value={sessionType}
        onChange={handleSessionTypeChange}
      >
        <option value="">Select session</option>
        <option value="Push">Push</option>
        <option value="Pull">Pull</option>
        <option value="Leg">Leg</option>
        <option value="Shoulder">Shoulder</option>
      </select>

      {hasPreviousData && !isCopied && (
        <button
          type="button"
          className="bg-lime-400 p-2 shadow-md rounded-lg mt-2 font-semibold text-green-950"
          onClick={copyPreviousSessionData}
        >
          Copy Previous Session
        </button>
      )}

      {exercises.map((exercise, index) => (
        <div
          key={exercise.id}
          className="bg-lime-100 p-4 rounded-xl shadow-md flex flex-col gap-2"
        >
          <label className="flex flex-col font-semibold text-base gap-2 text-green-950">
            Exercise Name
            <input
              type="text"
              className="rounded-lg w-full"
              value={exercise.name}
              onChange={(e) =>
                handleExerciseAttributeChange(index, "name", e.target.value)
              }
              placeholder="Enter exercise name"
            />
          </label>

          <LoadRepsInput
            sets={exercise.sets}
            onSetsUpdate={(sets) => handleSetsUpdate(index, sets)}
          />

          <label className="flex flex-col font-semibold text-base gap-2 text-green-950">
            Comment
            <input
              type="text"
              className="rounded-lg w-full"
              value={exercise.comment}
              onChange={(e) =>
                handleExerciseAttributeChange(index, "comment", e.target.value)
              }
              placeholder="Optional Notes"
            />
          </label>

          <button
            type="button"
            className="bg-lime-500 p-2 shadow-md rounded-lg mt-2 font-semibold text-green-950"
            onClick={() => removeExercise(exercise.id)}
          >
            Remove Exercise
          </button>
        </div>
      ))}

      <button
        type="button"
        className="bg-lime-300 p-2 shadow-md rounded-lg mt-1 font-bold"
        onClick={addNewExercise}
      >
        Add New Exercise
      </button>

      {exercises.length > 0 && (
        <button
          type="submit"
          className="bg-lime-600 p-2 shadow-md rounded-lg mt-5 text-black font-bold"
        >
          Submit
        </button>
      )}
    </form>
  );
}
