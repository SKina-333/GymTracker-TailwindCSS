import { useEffect, useState } from "react";
import SessionCard from "./sessionCard";
import { useWorkoutContext } from "./contexts/workoutContext";

export default function SessionCardContainer() {
  const { selectedWeekSessions,fetchSessionsForWeek,workoutSessions,selectedDay } = useWorkoutContext();
  const [expandedSessionId, setExpandedSessionId] = useState(null);
  
  const handleToggleExpand = (sessionId) => {
    setExpandedSessionId((prevId) => (prevId === sessionId ? null : sessionId));
  };
  useEffect(()=>{
    fetchSessionsForWeek(selectedDay);
  },[workoutSessions.length])
  return (
    <ul role="list" className="flex flex-col gap-3 overflow-auto h-96">
      {selectedWeekSessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          isExpanded={expandedSessionId === session.id}
          onToggleExpand={() => handleToggleExpand(session.id)}
        />
      ))}
    </ul>
  );
}
