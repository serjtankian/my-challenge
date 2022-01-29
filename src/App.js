import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import OperationForm from "./Components/OperationForm";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/operation_form" element={<OperationForm />} />
      </Routes>
    </div>
  );
}

export default App;
