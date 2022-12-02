import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Here should be a carousel */}
      <h5>Welcome to Party Pal!</h5>
      <div>
        <div>
          <p>
            Have a party coming up? Need venue and catering reccomendations in
            your area? Click Start Planning to find recommendations in your
            area.
          </p>
        </div>
        <Link to="/start">
          <button>Start Planning</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
