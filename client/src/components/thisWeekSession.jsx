import { format, startOfWeek, endOfWeek } from "date-fns";
import SessionCardContainer from "./sessionCardContainer.jsx";
import { useWorkoutContext } from "./contexts/workoutContext.jsx";


export default function SessionsDisplay() {
  const { selectedDay, selectedWeekSessions, loading } = useWorkoutContext();
  
  if (loading) return <p>Loading...</p>;
 
  return (
    <section className=" ">
      <h2 className="text-2xl font-bold text-lime-500 rounded-xl text-center">
        {selectedDay
          ? `${format(startOfWeek(selectedDay), "MMM do")} - ${format(
              endOfWeek(selectedDay),
              "MMM do"
            )}`
          : "No Date Selected"}
      </h2>

      <div className="mt-4 space-y-1 text-sm/6 text-gray-500">
        {selectedWeekSessions.length ? (
          <SessionCardContainer/>
        ) : (
          <div className="text-center">No Sessions for this week</div>
        )}
      </div>
    </section>
  );
}
