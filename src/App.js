import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import Detail from "./pages/Detail";

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const ProtectedRoute = (props) => {
    if (isAuthenticated === true) {
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
