import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <h1>App</h1>
    </BrowserRouter>
  );
};

export default App;
