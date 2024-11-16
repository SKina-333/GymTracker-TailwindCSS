import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";

import { useWorkoutContext } from "./contexts/workoutContext.jsx";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CalendarComponent() {
  const {
    selectedDay,
    currentMonth,
    setCurrentMonth,
    handleDaySelect,
    workoutSessions,
    refetchSessions,
  } = useWorkoutContext();
  let today = startOfToday();
  const thisMonthToday = parse(currentMonth, "MMMM-yyyy", today);

  let currentDisplayMonth = eachDayOfInterval({
    start: startOfWeek(thisMonthToday),
    end: endOfWeek(endOfMonth(thisMonthToday)),
  });

  function nextMonth() {
    const nextMonthToday = add(thisMonthToday, { months: 1 });
    setCurrentMonth(format(nextMonthToday, "MMMM-yyyy"));
  }

  function prevMonth() {
    const lastMonthToday = add(thisMonthToday, { months: -1 });
    setCurrentMonth(format(lastMonthToday, "MMMM-yyyy"));
  }

  useEffect(()=>{
    refetchSessions();
  },[workoutSessions.length])

  return (
    <div className="md:px-5">
      <div className=" grid auto-rows-auto lg:grid-cols-2 gap-5">
        <div className="flex flex-col md:min-w-60 md:overflow-hidden">
          <h2 className="text-md font-semibold text-lime-500">Today's Date</h2>
          <h2 className="text-3xl md:text-3xl font-bold text-lime-500">
            {format(parse(currentMonth, "MMMM-yyyy", new Date()), "MMMM yyyy")}
          </h2>
        </div>
        <div className="justify-self-end flex flex-row gap-3">
          <button
            onClick={prevMonth}
            type="button"
            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-lime-400 hover:text-lime-500"
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            onClick={nextMonth}
            type="button"
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-lime-400 hover:text-lime-500"
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-7 text-center text-md/6 font-bold text-lime-500">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className="mt-2 grid grid-cols-7 text-sm">
        {currentDisplayMonth.map((day) => (
          <div key={day.toString()} className="py-2">
            <button
              onClick={() => {
                handleDaySelect(day);
              }}
              type="button"
              className={classNames(
                isEqual(day, selectedDay) && !isToday(day) && "text-lime-500",
                !isEqual(day, selectedDay) &&
                  isToday(day) &&
                  "text-black font-bold bg-lime-500",
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  isSameMonth(day, thisMonthToday) &&
                  "text-lime-500",
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  !isSameMonth(day, thisMonthToday) &&
                  "text-gray-400",
                isEqual(day, selectedDay) && isToday(day) && "bg-lime-500",
                isEqual(day, selectedDay) && !isToday(day) && "bg-gray-800",
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  "hover:bg-gray-700",
                (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
                "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
              )}
            >
              {format(day, "d")}
            </button>
            <div className="w-1 h-1 mx-auto mt-1">
              {workoutSessions.some((session) =>
                isSameDay(parseISO(session.date), day)
              ) && (
                <div className="w-1 h-1 rounded-full bg-lime-500"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
