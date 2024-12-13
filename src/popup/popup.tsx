import React from "react";
import Home from "../components/Home";
import { createRoot } from "react-dom/client";
import "./popup.css";

function App() {
  return (
    <>
      <Home />
      {/* <img src="icon.png" /> */}
    </>
  );
}

const root = document.createElement("div");
document.body.appendChild(root);

const rootElement = createRoot(root);
rootElement.render(<App />);

export default App;
