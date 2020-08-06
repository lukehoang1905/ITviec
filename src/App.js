import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import Detail from "./pages/Detail";

function App() {
  let [user] = useState({ isAuthenticated: true });
  const ProtectedRoute = (props) => {
    if (user.isAuthenticated === true) {
      return <Route {...props} />;
    } else {
      console.log("here");
      return <Redirect to="/login" />;
    }
  };

  return (
    <>
      <Switch>
        <Route exact path="/" component={Jobs} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/jobs" component={Jobs} />
        <ProtectedRoute
          path="/jobs/:id"
          render={(props) => <Detail {...props} />}
        />
      </Switch>
    </>
  );
}

export default App;
