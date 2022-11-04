import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { Login, Signup } from "./Auth";

const WelcomePage = (props) => {
  return <div>Welcome Page Contents!</div>;
};

export const AllRoutes = () => {
  return (
    <Router>
      <div>
        <nav>
          Welcome!
          <ul style={{ listStyle: "none" }}>
            <li>
              <Link to="/">Welcome Page</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              {" "}
              <Link to="/signup">Signup </Link>
            </li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default AllRoutes;
