import React from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";

import "./App.css";
import Employees from "./components/Employees";
import Employee from "./components/Employee";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Employees />
          </Route>
          <Route path="/employee/:id">
            <Employee />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
