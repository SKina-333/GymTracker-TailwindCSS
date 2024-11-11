import { useState } from "react";
import SessionCard from "./sessionCard";

export default function SessionCardContainer({ sessions }) {
  const [expandedSessionId, setExpandedSessionId] = useState(null);
  
  const handleToggleExpand = (sessionId) => {
    setExpandedSessionId((prevId) => (prevId === sessionId ? null : sessionId));
  };

  return (
    <ul role="list" className="flex flex-col gap-3 overflow-auto h-96">
      {sessions.map((session) => (
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
