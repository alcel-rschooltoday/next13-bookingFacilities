import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

function Dashboard() {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <div
        className="flex items-center justify-center"
        style={{ height: "300px;" }}
      >
        <div className="text-6xl text-blue-500">
          <FaCalendarAlt />
        </div>
        <div className="text-5xl text-center font-bold m-5">
          Booking Facilities
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
