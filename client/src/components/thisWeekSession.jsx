import SessionCardContainer from "./sessionCardContainer.jsx";

export default function SessionsDisplay({ selectedDay, sessions }) {
  return (
    <section className=" ">
      
        <h2 className="text-2xl font-bold text-lime-500 rounded-xl text-center">
          {/* {selectedDay ? selectedDay.toDateString() : "No Date Selected"} */}
          Nov 11st - Nov 17th
        </h2>
      

      <div className="mt-4 space-y-1 text-sm/6 text-gray-500">
        <SessionCardContainer sessions={sessions} />
      </div>
    </section>
  );
}
