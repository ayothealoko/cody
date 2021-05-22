import { useState } from "react";
import { Switch, Route, Link, useRouteMatch} from "react-router-dom";

import Toggle from "../component/toggle";
import Plugin from "../plugin/index";
import FileType from "../file-type/index";

function MainApp() {
  let {path, url } = useRouteMatch();
  return (
    <div className="wrapper">
      <header className="header">
        <h1 className="header__h1">Cody</h1>
      </header>
        <Switch>
          <Route path={`${path}/plugin`}>
            <Plugin />
          </Route>
          <Route path={`${path}/file-type`}>
            <FileType />
          </Route>
          <Route exact path={path}>
            <App />
          </Route>
        </Switch>
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState(false);

  return (
    <div>
      <div className="huge-button-group">
        <Link to="/app/file-type" className="no-link-style huge-button">
          File types
        </Link>
        <Link to="/app/plugin" className="no-link-style huge-button">
          Plugins
        </Link>
      </div>
      <div className="huge-button-group">
        <div className="options">
          <div className="options__row">
            <span>Dark mode</span>
            <Toggle
              selected={selected}
              toggleSelected={() => {
                setSelected((s) => !s);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainApp;
