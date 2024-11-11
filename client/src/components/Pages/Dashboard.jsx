import Calendar from "../calendar.jsx";
import SessionsDisplay from "../thisWeekSession.jsx";

import NewSessionFormContainer from "../newSessionFormContainer.jsx";

import { useState } from "react";
import { format, startOfToday, subDays } from "date-fns";

export default function Dashboard() {
  const dataStructure = {
    status: "success",
    data: {
      sessions: [
        {
          id: 1,
          date: format(subDays(startOfToday(), 7), "dd,MMMM,yyyy"), // Last week
          workoutType: "push",
          exercises: [
            {
              id: 101,
              name: "Dumbbell Chest Press",
              sets: [
                { load: 27.5, reps: 10 },
                { load: 30, reps: 8 },
                { load: 32.5, reps: 8 },
                { load: 35, reps: 6 },
              ],
              comment: "LKJNADF"
            },
            {
              id: 102,
              name: "Inclined Dumbbell Chest Press",
              sets: [
                { load: 25, reps: 12 },
                { load: 27.5, reps: 10 },
                { load: 30, reps: 8 },
                { load: 32.5, reps: 8 },
              ],
              comment: "aljkhdg"
            },
            {
              id: 103,
              name: "Cable Chest Fly",
              sets: [
                { load: 12.5, reps: 15 },
                { load: 15, reps: 12 },
                { load: 17.5, reps: 10 },
                { load: 20, reps: 10 },
              ],
              comment: "ajkldgh"
            },
          ],
        },
        {
          id: 2,
          date: format(subDays(startOfToday(), 5), "dd,MMMM,yyyy"), // 5 days ago
          workoutType: "pull",
          exercises: [
            {
              id: 201,
              name: "Lat-Pulldown",
              sets: [
                { load: 55, reps: 12 },
                { load: 60, reps: 10 },
                { load: 65, reps: 8 },
                { load: 70, reps: 8 },
              ],
              comment: "HAHAHA"
            },
            {
              id: 202,
              name: "Cable Row (Vulcan Grip)",
              sets: [
                { load: 50, reps: 10 },
                { load: 55, reps: 10 },
                { load: 60, reps: 8 },
                { load: 65, reps: 8 },
              ],
              comment: "a;kjdg"
            },
            {
              id: 203,
              name: "Inclined Bicep Cable Curl",
              sets: [
                { load: 10, reps: 12 },
                { load: 12.5, reps: 10 },
                { load: 15, reps: 8 },
                { load: 17.5, reps: 6 },
              ],
              comment: ";aodg"
            },
          ],
        },
        {
          id: 3,
          date: format(subDays(startOfToday(), 3), "dd,MMMM,yyyy"), // 3 days ago
          workoutType: "leg",
          exercises: [
            {
              id: 301,
              name: "Squats",
              sets: [
                { load: 60, reps: 10 },
                { load: 70, reps: 8 },
                { load: 80, reps: 6 },
                { load: 90, reps: 4 },
              ],
              comment: "asfasf"
            },
            {
              id: 302,
              name: "Romanian Deadlift",
              sets: [
                { load: 50, reps: 12 },
                { load: 55, reps: 10 },
                { load: 60, reps: 8 },
                { load: 65, reps: 8 },
              ],
              comment: "asfagf"
            },
            {
              id: 303,
              name: "Standing Calf Raise",
              sets: [
                { load: 20, reps: 20 },
                { load: 25, reps: 18 },
                { load: 30, reps: 15 },
                { load: 35, reps: 15 },
              ],
              comment: "agadgadsg"
            },
          ],
        },
        {
          id: 4,
          date: format(subDays(startOfToday(), 7), "dd,MMMM,yyyy"), // Last week
          workoutType: "shoulder",
          exercises: [
            {
              id: 11,
              name: "Military Raise",
              sets: [
                { load: 27.5, reps: 10 },
                { load: 30, reps: 8 },
                { load: 32.5, reps: 8 },
                { load: 35, reps: 6 },
              ],
              comment: "YOOO"
            },
            {
              id: 12,
              name: "Unilateral Cable lateral Raise",
              sets: [
                { load: 25, reps: 12 },
                { load: 27.5, reps: 10 },
                { load: 30, reps: 8 },
                { load: 32.5, reps: 8 },
              ],
              comment: "adf"
            },
            {
              id: 103,
              name: "Unilateral Reverse pec dec",
              sets: [
                { load: 12.5, reps: 15 },
                { load: 15, reps: 12 },
                { load: 17.5, reps: 10 },
                { load: 20, reps: 10 },
              ],
              comment: "UMM"
            },
          ],
        },
      ],
    },
  };

  const [currentMonth, setCurrentMonth] = useState(
    format(startOfToday(), "MMMM-yyyy")
  );
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className="p-14 md:flex lg:flex-row md:flex-col md:justify-center md:gap-10 md:items-center lg:items-start flex-wrap">
      <div className="max-w-96 md:min-w-96 mb-10">
        <Calendar
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          onDaySelect={handleDaySelect}
          selectedDay={selectedDay}
        />
      </div>

      <div className="md:min-w-96 flex flex-col gap-5 mb-10">
      
        
        <SessionsDisplay
          selectedDay={selectedDay}
          sessions={dataStructure.data.sessions}
        />
      
      </div>

      <div className="flex flex-col gap-1 xl:w-1/5 lg:w-3/4  md:min-w-96 ">
        <p className="text-lime-500 font-bold text-2xl text-center">Add New Session</p>
        <div className=" flex justify-center p-1 rounded-lg ">
          <NewSessionFormContainer previousSessions={dataStructure.data.sessions}/>
        </div>
      </div>
    </div>
  );
}
