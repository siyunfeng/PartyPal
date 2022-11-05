// import React from "react";
// import { connect } from "react-redux";
// import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
// import { logout } from "../store";

// export const Navbar = ({ handleClick, isLoggedIn }) => (
//     <div>
//       <h1>Welcome Page</h1>
//       <nav>
//         {isLoggedIn ? (
//           <div>
//             {/* The navbar will show these links after you log in */}
//             <Link to="/home">Home</Link>
//             <a href="#" onClick={handleClick}>
//               Logout
//             </a>
//           </div>
//         ) : (
//           <div>
//             {/* The navbar will show these links before you log in */}
//             <Link to="/login">Login</Link>
//             <Link to="/signup">Sign Up</Link>
//           </div>
//         )}
//       </nav>
//       <hr />
//     </div>
// );
