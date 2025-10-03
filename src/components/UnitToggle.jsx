// src/components/UnitToggle.jsx
export default function UnitToggle({ units, setUnits }) {
  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={() => setUnits("metric")}
        className={`px-4 py-2 rounded-xl ${units === "metric" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
      >
        Metric
      </button>
      <button
        onClick={() => setUnits("imperial")}
        className={`px-4 py-2 rounded-xl ${units === "imperial" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
      >
        Imperial
      </button>
    </div>
  );
}
