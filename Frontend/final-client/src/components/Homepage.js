import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="LandingPage">
      <header className="LandingPage-header">
        <h1>Welcome to the Recipe App</h1>
        <p>Discover delicious recipes to try at home.</p>
        <Link to="/recipe/1">
          <button className="cta-button">See Recipe 1</button>
        </Link>
      </header>
    </div>
  );
}

export default LandingPage;