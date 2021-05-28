import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useLocation,
  useHistory,
} from "react-router-dom";

import Toggle from "../component/toggle";
import Plugin from "../plugin/index";
import FileType from "../file-type/index";

import { UIStore } from "../UIStore";

function MainApp() {
  // show the match for Route Main App is in
  // i.e  '/App'
  let { path, url } = useRouteMatch();
  // sentinel for showing back button
  let isBack = false;

  // get actual path
  let location = useLocation();

  // if path is main app dont show back button
  if (url !== location.pathname) {
    isBack = true;
  }

  let history = useHistory();

  return (
    <div className="wrapper">
      <header className="header">
        {isBack ? (
          <button className="back-button" onClick={() => history.push(url)}>
            back
          </button>
        ) : null}
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
  const isDarkMode = UIStore.useState((s) => s.isDarkMode);

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
              selected={isDarkMode}
              toggleSelected={() => {
                UIStore.update((s) => {
                  s.isDarkMode = !isDarkMode;
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainApp;
