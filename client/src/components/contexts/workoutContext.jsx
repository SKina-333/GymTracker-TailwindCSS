import React, { createContext, useContext, useState, useEffect } from "react";
import {
  compareAsc,
  endOfWeek,
  format,
  isWithinInterval,
  parseISO,
  startOfToday,
  startOfWeek,

} from "date-fns";

import axiosInstance from "../../routers/configs/axiosIntercepter";

const WorkoutContext = createContext();


export const WorkoutProvider = ({ children }) => {
  
  const [workoutSessions, setWorkoutSessions] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(
    format(startOfToday(), "MMMM-yyyy")
  );
  const [selectedDay, setSelectedDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWeekSessions, setSelectedWeekSessions] = useState([]);

 
  const handleDaySelect = (day) => {
    setSelectedDay(day);
    fetchSessionsForWeek(day);
  };

  const fetchWorkoutData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("https://gymtracker-tailwindcss.onrender.com/gym", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setWorkoutSessions(response.data);
        
      }
    } catch (err) {
      console.error("Error fetching workout data:", err);
      setError(err.message || "Failed to fetch workout data");
    } finally {
      setLoading(false);
    }
  };
  const fetchSessionsForWeek = (selectedDay) => {
    const startOfSelectedWeek = startOfWeek(selectedDay);
    const endOfSelectedWeek = endOfWeek(selectedDay);

    const sessionsInWeek = workoutSessions.filter((session) => {
      const sessionDate = parseISO(session.date);

      return isWithinInterval(sessionDate, {
        start: startOfSelectedWeek,
        end: endOfSelectedWeek,
      });
    });

    const sortedSessions = sessionsInWeek.sort((a, b) => {
      const dateA = parseISO(a.date);
      const dateB = parseISO(b.date);
      return compareAsc(dateA, dateB);
    });
    console.log(sortedSessions);
    setSelectedWeekSessions(sortedSessions);
  };

  useEffect(() => {
    fetchWorkoutData();
  }, []);

  return (
    <WorkoutContext.Provider
      value={{
        workoutSessions,
        currentMonth,
        setCurrentMonth,
        selectedDay,
        handleDaySelect,
        loading,
        error,
        selectedWeekSessions,
        fetchSessionsForWeek,
        refetchSessions: fetchWorkoutData, 
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => {
  return useContext(WorkoutContext);
};
