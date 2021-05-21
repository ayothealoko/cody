import React from "react";
import { Link } from "react-router-dom";

function Onboarding() {
  return (
    <div className="wrapper">
      <header className="header">
        <h1 className="header__h1">Cody</h1>
      </header>
      <div>
        <div className="tutorial"></div>
        <Link to="/app" className="large-button center-block no-link-style">
          Go to app
        </Link>
      </div>
    </div>
  );
}

export default Onboarding;
