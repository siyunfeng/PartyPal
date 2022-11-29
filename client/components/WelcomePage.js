import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { Login, Signup } from "./Auth";
import EventSummary from "./EventSummary";
// import { Navbar } from "./NavBar";

const WelcomePage = (props) => {
  return (
    <div>
      {/* <Navbar /> */}
      <p>Welcome Page Contents!</p>
    </div>
  );
};

export const AllRoutes = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link style={{ textDecoration: "none" }} to="/">
            <h1>Cool Website name</h1>
          </Link>
          <ul style={{ listStyle: "none", textDecoration: "none" }}>
            <li>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                Main Page
              </Link>
            </li>
            <li>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  backgroundColor: "green",
                  padding: "8px",
                  borderRadius: "30px",
                }}
                to="/login"
              >
                Login
              </Link>
            </li>
            <li>
              {" "}
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  backgroundColor: "blue",
                  padding: "8px",
                  borderRadius: "30px",
                }}
                to="/signup"
              >
                Signup{" "}
              </Link>
            </li>
          </ul>
          <div className=".hr"></div>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/eventSummary" element={<EventSummary />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default AllRoutes;
