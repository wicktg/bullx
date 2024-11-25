import React, { useState } from "react";
import logo from "./assets/bullx.webp"; // Adjust the path if your asset structure differs
import SignUpModal from "./SignUpModal";

const MainSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-black text-white relative">
      {/* 3D Grid Background */}
      <div className="absolute inset-0 grid grid-cols-10 gap-1 opacity-20">
        {[...Array(100)].map((_, index) => (
          <div key={index} className="w-full h-full bg-gray-800"></div>
        ))}
      </div>
      {/* Content */}
      <div className="z-10 text-center">
        {/* Logo */}
        <img
          src={logo}
          alt="BullX Logo"
          className="w-48 h-20 mx-auto mb-6" // Adjust width and height as needed
        />
        <p className="text-lg">Start Trading in seconds</p>
        <p className="mt-2">Connect your Wallet to start trading instantly</p>
        <button
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-500"
          onClick={() => setIsModalOpen(true)} // Show modal when clicked
        >
          Get Started
        </button>
      </div>
      {/* Sign-Up Modal */}
      {isModalOpen && <SignUpModal closeModal={() => setIsModalOpen(false)} />}
    </main>
  );
};

export default MainSection;
