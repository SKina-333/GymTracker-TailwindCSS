import { useState, useEffect } from "react";
import LoadRepsInput from "./loadRepsInput";

export default function NewSessionFormContainer({ previousSessions }) {
  const [exercises, setExercises] = useState([]);
  const [sessionType, setSessionType] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [hasPreviousData, setHasPreviousData] = useState(false);
  

  const handleSessionTypeChange = (e) => {
    const selectedType = e.target.value;
    setSessionType(selectedType);

    const previousSession = previousSessions.find(
      (session) =>
        session.workoutType.toLowerCase() === selectedType.toLowerCase()
    );
    setHasPreviousData(!!previousSession);
    setIsCopied(false);
  };
  const copyPreviousSessionData = () => {
    if (sessionType === "") return;

    const previousSession = previousSessions.find(
      (session) =>
        session.workoutType.toLowerCase() === sessionType.toLowerCase()
    );

    if (previousSession) {
      const copiedExercises = previousSession.exercises.map((exercise) => ({
        name: exercise.name,
        id: Date.now() + Math.random(), // Unique ID for each copied exercise
        sets: exercise.sets.length
        ? exercise.sets
        : [{ load: "", reps: "" }],
        comment: exercise.comment || "",
      }));

      setExercises(copiedExercises);
      setIsCopied(true); 
    }
  };

  const handleExerciseAttributeChange = (index, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].name = value;
    setExercises(updatedExercises);
  };

  // Add new exercise
  const addNewExercise = () => {
    setExercises([
      ...exercises,
      { name: "", id: Date.now(), sets: [{ load: "", reps: "" }], comment: "" },
    ]);
  };

  // Remove exercise
  const removeExercise = (id) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  };

  // Handle sets update from LoadRepsInput
  const handleSetsUpdate = (exerciseIndex, sets) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets = sets;
    setExercises(updatedExercises);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      sessionType,
      exercises: exercises.map((exercise) => ({
        name: exercise.name,
        sets: exercise.sets,
      })),
    };

    console.log("Form Data:", formData);
  };
  useEffect(()=>{
    if(exercises.length == 0 ){
        setIsCopied(false)
    }
  },[exercises])

  return (
    <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
      <select
        className="mt-3 rounded-lg border bg-lime-500 text-green-950 py-1.5 px-3 font-semibold"
        value={sessionType}
        onChange={handleSessionTypeChange}
      >
        <option value="">Select session</option>
        <option value="push">Push</option>
        <option value="pull">Pull</option>
        <option value="leg">Legs</option>
        <option value="shoulder">Shoulder</option>
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
            <div className="flex flex-row gap-3">
              <input
                type="text"
                className="rounded-lg w-full"
                value={exercise.name}
                onChange={(e) =>
                  handleExerciseAttributeChange(index, e.target.value)
                }
                placeholder="Enter exercise name"
              />
            </div>
          </label>

          
          <LoadRepsInput
            sets={exercise.sets}
            onSetsUpdate={(sets) => handleSetsUpdate(index, sets)}
          />
          <label className="flex flex-col font-semibold text-base gap-2 text-green-950">
            Comment
            <div className="flex flex-row gap-3">
              <input
                type="text"
                className="rounded-lg w-full"
                value={exercise.comment}
                onChange={(e) =>
                  handleExerciseAttributeChange(index, e.target.value)
                }
                placeholder="Optional Notes"
              />
            </div>
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
