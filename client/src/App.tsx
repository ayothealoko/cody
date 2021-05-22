import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./home/index";
import Onboarding from "./onboarding/index";
import MainApp from "./mainapp/index";

import "./App.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/app">
          <MainApp />
        </Route>
        <Route path="/onboarding">
          <Onboarding />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
