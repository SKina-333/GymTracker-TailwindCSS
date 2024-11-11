import WorkoutCard from "./workoutCard";

export default function WorkoutCardContainer({ exercises }) {
  return (
    <ul role="list" className="text-black flex flex-col gap-2 mt-2">
      {exercises.map((exercise) => (
        <WorkoutCard exercise={exercise}/>
      ))}
    </ul>
  );
}
