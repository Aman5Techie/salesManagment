import React from "react";
import PropTypes from "prop-types";
import Nav from "./components/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import Homepage from "./pages/homepage";

const App = () => {
  return (
    <>
      <Nav></Nav>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

App.propTypes = {};

export default App;
