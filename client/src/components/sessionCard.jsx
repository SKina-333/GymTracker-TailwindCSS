
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import WorkoutCardContainer from "./workoutCardContainer";
import { format } from "date-fns";



export default function SessionCard({ session, isExpanded, onToggleExpand }) {




  return (
    
      <div className={`py-3 px-4 bg-lime-100 rounded-xl ${
        !isExpanded ? "hover:bg-lime-200" : ""
      }`} >
        <div
          onClick={onToggleExpand}
          className="flex flex-row justify-between items-center cursor-pointer"
        >
          <div className="flex flex-col gap-0 justify-between text-black">
            <h3 className="text-xl font-semibold">{format(session.date,'EEEE do')}</h3>
            <div className="flex flex-col">
              <p className="text-sm text-gray-600">Session - {session.time}</p>
              <div className="">
                <p className="font-semibold text-sm ">{session.WorkoutTypes.name}</p>
              </div>
            </div>
          </div>
          <ChevronRightIcon
            aria-hidden="true"
            className={`h-5 w-5 flex-none text-black transition-transform duration-300 ${
              isExpanded  ? "rotate-90" : ""
            }`}
          />
        </div>

        {/* Expanded Exercise Details */}
        {isExpanded && (
          <WorkoutCardContainer exercises={session.Exercises} />
        )}
      </div>
    
  );
}
