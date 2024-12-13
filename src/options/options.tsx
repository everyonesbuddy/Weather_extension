// import React from "react";
// import ReactDom from "react-dom";

// const popup = () => {
//   return <div>test</div>;
// };

// export default popup;

import React from "react";
// import Home from "../components/Home";
import { createRoot } from "react-dom/client";
import "./options.css";

function App() {
  return (
    <>
      Hello
      {/* <Home /> */}
      {/* <img src="Black_and_White_Modern_Vintage_Badge_Brand_Logo__2_-removebg-preview.png" /> */}
    </>
  );
}

const root = document.createElement("div");
document.body.appendChild(root);

const rootElement = createRoot(root);
rootElement.render(<App />);

export default App;
