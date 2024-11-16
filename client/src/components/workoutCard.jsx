import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function WorkoutCard({ exercise }) {
  const [isWorkoutExpanded, setIsWorkoutExpanded] = useState(false);

  const toggleWorkoutExpand = () => {
    setIsWorkoutExpanded(!isWorkoutExpanded);
  };

  return (
    <div
      className={`p-2 bg-lime-300 rounded-lg shadow-md flex flex-col gap-2 cursor-pointer ${
        !isWorkoutExpanded ? "hover:bg-lime-400" : ""
      }`}
    >
      <div
        onClick={toggleWorkoutExpand}
        className="flex flex-row items-center justify-between font-semibold"
      >
        {exercise.name}
        <ChevronRightIcon
          aria-hidden="true"
          className={`h-5 w-5 flex-none text-black transition-transform duration-300 ${
            isWorkoutExpanded ? "rotate-90" : ""
          }`}
        />
      </div>

      {isWorkoutExpanded && (
        <div className="flex flex-col gap-2">
          {/* Weight and Reps */}
          {exercise.Sets.map((set, index) => (
            <div className="grid grid-cols-4 gap-2" key={index}>
              <div className="col-span-1">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-sm font-sm text-green-700 shadow-md">
                {set.load}kg
                </span>
              </div>
              <div className="col-span-3 flex flex-row gap-2">
                <span>&#x2022;</span>
                {set.rep} reps
              </div>
            </div>
          ))}

          <div>
            <div>Comments</div>
            <div className="p-2 rounded-lg bg-green-100 shadow-md">
              {exercise.comment? exercise.comment : "No Comment"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
