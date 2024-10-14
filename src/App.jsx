import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "./queries";
import ContentFilter from "./components/ContentFilter";

function App() {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <div className="container mx-auto">
        <Navbar />
        <ContentFilter />
        <div className="text-center mb-5 mt-16">
          <div className="text-gray-400 font-medium">
            Miniproyecto Funval Nivel 2
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
