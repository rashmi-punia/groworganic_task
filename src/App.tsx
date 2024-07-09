import React from "react";
import { Route, Routes } from "react-router-dom";
import Form from "./Form";
import Second from "./Second";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/second" element={<Second />} />
      </Routes>
    </>
  );
};

export default App;
