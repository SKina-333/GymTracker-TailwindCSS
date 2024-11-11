// import { useState } from "react";

// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

// import {
//   add,
//   eachDayOfInterval,
//   endOfMonth,
//   endOfWeek,
//   format,
//   isEqual,
//   isSameMonth,
//   isToday,
//   parse,
//   startOfMonth,
//   startOfToday,
//   startOfWeek,
//   subDays,
// } from "date-fns";

// import SessionCardContainer from "./sessionCardContainer.jsx";

// const dataStructure = {
//   status: "success",
//   data: {
//     sessions: [
//       {
//         id: 1,
//         date: format(subDays(startOfToday(), 7), "dd,MMMM,yyyy"), // Last week
//         workoutType: "push",
//         exercises: [
//           {
//             id: 101,
//             name: "Dumbbell Chest Press",
//             sets: [
//               { load: 27.5, reps: 10 },
//               { load: 30, reps: 8 },
//               { load: 32.5, reps: 8 },
//               { load: 35, reps: 6 },
//             ],
//           },
//           {
//             id: 102,
//             name: "Inclined Dumbbell Chest Press",
//             sets: [
//               { load: 25, reps: 12 },
//               { load: 27.5, reps: 10 },
//               { load: 30, reps: 8 },
//               { load: 32.5, reps: 8 },
//             ],
//           },
//           {
//             id: 103,
//             name: "Cable Chest Fly",
//             sets: [
//               { load: 12.5, reps: 15 },
//               { load: 15, reps: 12 },
//               { load: 17.5, reps: 10 },
//               { load: 20, reps: 10 },
//             ],
//           },
//         ],
//       },
//       {
//         id: 2,
//         date: format(subDays(startOfToday(), 5), "dd,MMMM,yyyy"), // 5 days ago
//         workoutType: "pull",
//         exercises: [
//           {
//             id: 201,
//             name: "Lat-Pulldown",
//             sets: [
//               { load: 55, reps: 12 },
//               { load: 60, reps: 10 },
//               { load: 65, reps: 8 },
//               { load: 70, reps: 8 },
//             ],
//           },
//           {
//             id: 202,
//             name: "Cable Row (Vulcan Grip)",
//             sets: [
//               { load: 50, reps: 10 },
//               { load: 55, reps: 10 },
//               { load: 60, reps: 8 },
//               { load: 65, reps: 8 },
//             ],
//           },
//           {
//             id: 203,
//             name: "Inclined Bicep Cable Curl",
//             sets: [
//               { load: 10, reps: 12 },
//               { load: 12.5, reps: 10 },
//               { load: 15, reps: 8 },
//               { load: 17.5, reps: 6 },
//             ],
//           },
//         ],
//       },
//       {
//         id: 3,
//         date: format(subDays(startOfToday(), 3), "dd,MMMM,yyyy"), // 3 days ago
//         workoutType: "leg",
//         exercises: [
//           {
//             id: 301,
//             name: "Squats",
//             sets: [
//               { load: 60, reps: 10 },
//               { load: 70, reps: 8 },
//               { load: 80, reps: 6 },
//               { load: 90, reps: 4 },
//             ],
//           },
//           {
//             id: 302,
//             name: "Romanian Deadlift",
//             sets: [
//               { load: 50, reps: 12 },
//               { load: 55, reps: 10 },
//               { load: 60, reps: 8 },
//               { load: 65, reps: 8 },
//             ],
//           },
//           {
//             id: 303,
//             name: "Standing Calf Raise",
//             sets: [
//               { load: 20, reps: 20 },
//               { load: 25, reps: 18 },
//               { load: 30, reps: 15 },
//               { load: 35, reps: 15 },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// };
// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Calendar() {
//   let today = startOfToday();
//   const [selectedDay, setSelectedDay] = useState(today);
//   const [currentMonth, setCurrentMonth] = useState(format(today, "MMMM-yyyy"));

//   const thisMonthToday = parse(currentMonth, "MMMM-yyyy", new Date());

//   let currentDisplayMonth = eachDayOfInterval({
//     start: startOfWeek(thisMonthToday),
//     end: endOfWeek(endOfMonth(thisMonthToday)),
//   });

//   function nextMonth() {
//     const nextMonthToday = add(thisMonthToday, { months: 1 });
//     setCurrentMonth(format(nextMonthToday, "MMMM-yyyy"));
//   }
//   function prevMonth() {
//     const lastMonthToday = add(thisMonthToday, { months: -1 });
//     setCurrentMonth(format(lastMonthToday, "MMMM-yyyy"));
//   }

//   return (
//     <div className="md:grid md:grid-cols-2 ">
//       <div className="md:pr-14">
//         <div className=" grid auto-rows-auto lg:grid-cols-2 gap-5">
//           <div className=" flex flex-col md:min-w-60 md:overflow-hidden">
//             <h2 className=" text-md font-semibold text-lime-500">
//               Today's Date
//             </h2>
//             <h2 className=" text-5xl md:text-3xl font-bold text-lime-500">
//               {format(currentMonth, "MMMM yyyy")}
//             </h2>
//           </div>
//           <div className="justify-self-end flex flex-row gap-3">
//             <button
//               onClick={prevMonth}
//               type="button"
//               className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-lime-400 hover:text-lime-500"
//             >
//               <span className="sr-only">Previous month</span>
//               <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
//             </button>
//             <button
//               onClick={nextMonth}
//               type="button"
//               className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-lime-400 hover:text-lime-500"
//             >
//               <span className="sr-only">Next month</span>
//               <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
//             </button>
//           </div>
//         </div>
//         <div className="mt-10 grid grid-cols-7 text-center text-md/6 font-bold text-lime-500">
//           <div>S</div>
//           <div>M</div>
//           <div>T</div>
//           <div>W</div>
//           <div>T</div>
//           <div>F</div>
//           <div>S</div>
//         </div>
//         <div className="mt-2 grid grid-cols-7 text-sm">
//           {currentDisplayMonth.map((day) => (
//             <div key={day.toString()} className="py-2">
//               <button
//                 onClick={() => setSelectedDay(day)}
//                 type="button"
//                 className={classNames(
//                   isEqual(day, selectedDay) && !isToday(day) && "text-lime-500",
//                   !isEqual(day, selectedDay) &&
//                     isToday(day) &&
//                     "text-black font-bold bg-lime-500",
//                   !isEqual(day, selectedDay) &&
//                     !isToday(day) &&
//                     isSameMonth(day, thisMonthToday) &&
//                     "text-lime-500",
//                   !isEqual(day, selectedDay) &&
//                     !isToday(day) &&
//                     !isSameMonth(day, thisMonthToday) &&
//                     "text-gray-400",
//                   isEqual(day, selectedDay) && isToday(day) && "bg-lime-500",
//                   isEqual(day, selectedDay) && !isToday(day) && "bg-gray-800",
//                   !isEqual(day, selectedDay) &&
//                     !isToday(day) &&
//                     "hover:bg-gray-700",
//                   (isEqual(day, selectedDay) || isToday(day)) &&
//                     "font-semibold",
//                   "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
//                 )}
//               >
//                 <time dateTime={format(day, "MMMM-dd-yyyy")} className="">
//                   {format(day, "d")}
//                 </time>
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//       <section className="mt-12 md:mt-0 md:pl-14 ">
//         <div className="flex flex-col items-start">
//           <h2 className="text-md font-semibold text-lime-500">
//             This week sessions from
//           </h2>
//           <h2 className="text-2xl font-bold text-black bg-lime-500 px-3 py-1 rounded-xl">
//             <time dateTime="2022-01-21">January 21</time> -{" "}
//             <time dateTime="2022-01-21">January 27</time>
//           </h2>
//         </div>

//         <div className="mt-4 space-y-1 text-sm/6 text-gray-500">
//           <SessionCardContainer sessions={dataStructure.data.sessions}/>
//         </div>
//       </section>
//     </div>
//   );
// }

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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CalendarComponent({
  currentMonth,
  setCurrentMonth,
  onDaySelect,
  selectedDay
}) {
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

  return (
    <div className="md:pr-14">
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
              onClick={() => onDaySelect(day)}
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
          </div>
        ))}
      </div>
    </div>
  );
}
