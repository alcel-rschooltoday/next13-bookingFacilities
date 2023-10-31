import Link from "next/link";
import React from "react";
import { FaCalendarAlt, FaCalendar, FaPlus } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-3">
      <Link href={"/"} className="flex items-center text-white font-bold">
        <FaCalendarAlt className="mr-2" /> Booking Facilities
      </Link>
      <div className="flex space-x-4">
        <Link
          href={"/bookings"}
          className="flex items-center bg-yellow-500 p-2"
        >
          <FaCalendar className="mr-2" /> Bookings
        </Link>
        <Link
          href={"/createBooking"}
          className="flex items-center bg-green-500 p-2 ml-auto"
        >
          <FaPlus className="mr-2" /> Create Booking
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
