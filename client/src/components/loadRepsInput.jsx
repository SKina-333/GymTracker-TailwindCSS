import { useState, useEffect } from "react";

export default function LoadRepsInput({ sets, onSetsUpdate }) {
  const [loadRepsRows, setLoadRepsRows] = useState([]);

  // Handle input change for load and reps
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...loadRepsRows];
    updatedRows[index][field] = value;
    setLoadRepsRows(updatedRows);
    onSetsUpdate(updatedRows);
  };

  // Add a new row
  const addNewRow = () => {
    setLoadRepsRows([...loadRepsRows, { load: "", reps: "" }]);
  };

  // Update the parent component with the current load/reps rows
  useEffect(() => {
    setLoadRepsRows(sets);
  }, [sets]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        {loadRepsRows.map((row, index) => (
          <div key={index} className="flex flex-row justify-between mb-2">
            <label className="flex flex-col font-semibold text-green-950">
              Load
              <input
                type="text"
                className="rounded-lg max-w-20 font-normal"
                value={row.load}
                onChange={(e) =>
                  handleInputChange(index, "load", e.target.value)
                }
                placeholder="10kg"
              />
            </label>
            <label className="flex flex-col font-semibold text-green-950">
              Reps
              <input
                type="text"
                className="rounded-lg max-w-20 font-normal "
                value={row.reps}
                onChange={(e) =>
                  handleInputChange(index, "reps", e.target.value)
                }
                placeholder="10"
              />
            </label>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="bg-lime-300 p-2 shadow-md rounded-lg font-semibold text-green-950"
        onClick={addNewRow}
      >
        Add More Row
      </button>
      
    </div>
  );
}
