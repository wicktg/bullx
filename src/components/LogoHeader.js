import React from "react";
import logo from "./assets/bullx.webp";

const LogoHeader = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4">
      <img src={logo} alt="BullX Logo" className="h-10" />
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500">
        Contact
      </button>
    </header>
  );
};

export default LogoHeader;
