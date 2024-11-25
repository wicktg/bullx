import React from "react";
import LogoHeader from "./components/LogoHeader";
import MainSection from "./components/MainSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-black min-h-screen">
      <LogoHeader />
      <MainSection />
      <Footer />
    </div>
  );
}

export default App;
