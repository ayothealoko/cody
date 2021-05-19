import React from "react";

import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="wrapper">
      <h1 className="large-logo">Cody</h1>
      <div className="button-group">
        <Link className="large-button no-link-style" to="/onboarding">
          Start a tour
        </Link>
        <Link className="large-button no-link-style" to="/app">
          Go to app
        </Link>
      </div>
    </div>
  );
}

export default Home;
