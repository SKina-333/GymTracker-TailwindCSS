import Calendar from "../calendar.jsx";
import SessionsDisplay from "../thisWeekSession.jsx";

import NewSessionFormContainer from "../newSessionFormContainer.jsx";



export default function Dashboard() {
  

  return (
    <div className="p-14 md:flex lg:flex-row md:flex-col md:justify-center md:gap-10 md:items-center lg:items-start flex-wrap">
      <div className="max-w-96 md:min-w-96 mb-10">
        <Calendar/>
      </div>

      <div className="md:min-w-96 flex flex-col gap-5 mb-10">
        <SessionsDisplay/>
      </div>

      <div className="flex flex-col gap-1 xl:w-1/5 lg:w-3/4  md:min-w-96 ">
        <p className="text-lime-500 font-bold text-2xl text-center">
          Add New Session
        </p>
        <div className=" flex justify-center p-1 rounded-lg ">
          <NewSessionFormContainer/>
        </div>
      </div>
    </div>
  );
}
