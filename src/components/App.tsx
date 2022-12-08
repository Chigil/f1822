import React, { useState } from "react";
import Navigation from "./Navigation";
import AppRoutes from "./AppRoutes";
import Context from "../context/context";

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <Context.Provider value={{ isLogin, setIsLogin }}>
      <div className="App">
        <Navigation />
        <div className="container">
          <AppRoutes />
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
