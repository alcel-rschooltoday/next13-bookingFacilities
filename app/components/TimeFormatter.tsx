import React from "react";

function FormatTime({ value }) {
  const [hours, minutes] = value.split(":");
  const hoursNumeric = parseInt(hours, 10);
  const period = hoursNumeric >= 12 ? "PM" : "AM";
  const hours12 = hoursNumeric > 12 ? hoursNumeric - 12 : hoursNumeric;
  const formattedHours = hours12 < 10 ? `0${hours12}` : hours12;
  const formattedTime = `${formattedHours}:${minutes} ${period}`;

  return <span>{formattedTime}</span>;
}

export default FormatTime;
