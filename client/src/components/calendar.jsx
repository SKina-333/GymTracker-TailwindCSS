import { useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";

const dataStructure = {
  sessions: {
    
  },
  push: {
    chestGroups: [
      {
        name: "Dumbbell Chest Press",
        topSet: 27,
      },
      {
        name: "Inclined Dumbbell Chest Press",
        topSet: 27,
      },
      {
        name: "Cable Chest Fly",
        topSet: 15,
      },
    ],
    tricepGroups: [
      {
        name: "Unilateral Longhead Extension",
        topSet: 5,
      },
      {
        name: "Overhead Easy-bar Longhead Extension",
        topSet: 20,
      },
      {
        name: "Easy-bar Tricep Pushdown",
        topSet: 30,
      },
    ],
  },
  pull: {
    backGroups: [
      {
        name: "Lat-Pulldown",
        topSet: 57.5,
      },
      {
        name: "Cable Row (Vulcan Grip)",
        topSet: 65,
      },
      {
        name: "T-bar Vertical Row",
        topSet: 40,
      },
      {
        name: "High to low Hammer Pulldown",
        topSet: 35,
      },
    ],
    bicepGroups: [
      {
        name: "Inclined Bicep Cable Curl",
        topSet: 10,
      },
      {
        name: "Machine Preacher Curl",
        topSet: 32,
      },
    ],
  },
  leg: {
    quadGroups: [
      {
        name: "Leg Extension",
        topSet: 80,
      },
      {
        name: "Squats",
        topSet: 70,
      },
      {
        name: "hack squats",
        topSet: 80,
      },
    ],
    hamstringGroups: [
      {
        name: "Romanian Deadlift",
        topSet: 70,
      },
      {
        name: "Seated Leg Curl",
        topSet: 45,
      },
      {
        name: "Hip Extension",
        topSet: 120,
      },
    ],
    calfGroups: [
      {
        name: "Standing Calf",
        topSet: 45,
      },
    ],
  },
};
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Calendar() {
  let today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMMM-yyyy"));

  const thisMonthToday = parse(currentMonth, "MMMM-yyyy", new Date());

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

  return (
    <div className="md:grid md:grid-cols-2 md:divide-x md:divide-lime-200">
      <div className="md:pr-14">
        <div className=" grid auto-rows-auto lg:grid-cols-2 gap-5">
          <div className=" flex flex-col">
            <h2 className=" text-md font-semibold text-lime-500">
              Today's Date
            </h2>
            <h2 className=" text-5xl font-bold text-lime-500">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
          </div>
          <div className="justify-self-end flex flex-row gap-3">
            <button
              onClick={prevMonth}
              type="button"
              className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-lime-400 hover:text-lime-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={nextMonth}
              type="button"
              className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-lime-400 hover:text-lime-500"
            >
              <span className="sr-only">Next month</span>
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
                onClick={() => setSelectedDay(day)}
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
                  (isEqual(day, selectedDay) || isToday(day)) &&
                    "font-semibold",
                  "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                )}
              >
                <time dateTime={format(day, "MMMM-dd-yyyy")} className="">
                  {format(day, "d")}
                </time>
              </button>
            </div>
          ))}
        </div>
      </div>
      <section className="mt-12 md:mt-0 md:pl-14 ">
        <div className="flex flex-col items-start">
          <h2 className="text-md font-semibold text-lime-500">
            This week sessions from
          </h2>
          <h2 className="text-2xl font-bold text-black bg-lime-500 px-3 py-1 rounded-xl">
            <time dateTime="2022-01-21">January 21</time> -{" "}
            <time dateTime="2022-01-21">January 27</time>
          </h2>
        </div>

        <ol className="mt-4 space-y-1 text-sm/6 text-gray-500">
          {/* {meetings.map((meeting) => (
            <li
              key={meeting.id}
              className="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100"
            >
              <img
                src={meeting.imageUrl}
                alt=""
                className="h-10 w-10 flex-none rounded-full"
              />
              <div className="flex-auto">
                <p className="text-gray-900">{meeting.name}</p>
                <p className="mt-0.5">
                  <time dateTime={meeting.startDatetime}>{meeting.start}</time>{" "}
                  - <time dateTime={meeting.endDatetime}>{meeting.end}</time>
                </p>
              </div>
              
            </li>
          ))} */}
        </ol>
      </section>
    </div>
  );
}
