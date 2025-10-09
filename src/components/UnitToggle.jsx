import React from "react";

export default function UnitToggle({ units, setUnits }) {
  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => setUnits("metric")}
        className={`px-3 py-1 rounded ${units === "metric" ? "bg-blue-600 text-white" : "bg-white/20 text-black"}`}
      >
        Metric
      </button>
      <button
        onClick={() => setUnits("imperial")}
        className={`px-3 py-1 rounded ${units === "imperial" ? "bg-blue-600 text-white" : "bg-white/20 text-black"}`}
      >
        Imperial
      </button>
    </div>
  );
}
