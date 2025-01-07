import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ onSignOut }) => {  // onSignOut is passed as a prop here
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const handleDropdown = (option) => {
    setOpenDropdown((prev) => (prev === option ? null : option));
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    onSignOut(); // Call the onSignOut function from props

    

    navigate("/auth"); // Redirect to auth page after signing out
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col fixed top-0 left-0 z-50">
      <h1 className="text-2xl font-bold text-center py-4 border-b border-gray-600">
        Admin Panel
      </h1>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-4">
          <li>
            <button
              onClick={() => handleDropdown("user")}
              className="w-full flex justify-between items-center py-2 px-4 text-left hover:bg-gray-700 rounded"
            >
              User
              <span>{openDropdown === "user" ? "▲" : "▼"}</span>
            </button>
            {openDropdown === "user" && (
              <ul className="ml-4 space-y-2">
                <li>
                  <Link
                    to="/users"
                    className="block py-1 px-2 hover:bg-gray-700 rounded"
                  >
                    Manage Users
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => handleDropdown("investor")}
              className="w-full flex justify-between items-center py-2 px-4 text-left hover:bg-gray-700 rounded"
            >
              Investor
              <span>{openDropdown === "investor" ? "▲" : "▼"}</span>
            </button>
            {openDropdown === "investor" && (
              <ul className="ml-4 space-y-2">
                <li>
                  <Link
                    to="/investors"
                    className="block py-1 px-2 hover:bg-gray-700 rounded"
                  >
                    Manage Investors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-investor"
                    className="block py-1 px-2 hover:bg-gray-700 rounded"
                  >
                    Create Investor
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/admin" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Admin
            </Link>
          </li>
        </ul>
      </nav>
      <button
        onClick={handleSignOut}
        className="w-full py-2 mt-4 text-white bg-red-500 hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Sidebar;



// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Sidebar = () => {
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const navigate = useNavigate();

//   const handleDropdown = (option) => {
//     setOpenDropdown((prev) => (prev === option ? null : option));
//   };

//   const handleSignOut = () => {
//     localStorage.removeItem("token");
//     navigate("/auth");
//   };

//   return (
//     <div className="w-64 h-screen bg-gray-800 text-white flex flex-col fixed top-0 left-0 z-50">
//       <h1 className="text-2xl font-bold text-center py-4 border-b border-gray-600">
//         Admin Panel
//       </h1>
//       <nav className="flex-1 overflow-y-auto">
//         <ul className="space-y-2 p-4">
//           <li>
//             <button
//               onClick={() => handleDropdown("user")}
//               className="w-full flex justify-between items-center py-2 px-4 text-left hover:bg-gray-700 rounded"
//             >
//               User
//               <span>{openDropdown === "user" ? "▲" : "▼"}</span>
//             </button>
//             {openDropdown === "user" && (
//               <ul className="ml-4 space-y-2">
//                 <li>
//                   <Link to="/users" className="block py-1 px-2 hover:bg-gray-700 rounded">
//                     Manage Users
//                   </Link>
//                 </li>
//               </ul>
//             )}
//           </li>
//           <li>
//             <button
//               onClick={() => handleDropdown("investor")}
//               className="w-full flex justify-between items-center py-2 px-4 text-left hover:bg-gray-700 rounded"
//             >
//               Investor
//               <span>{openDropdown === "investor" ? "▲" : "▼"}</span>
//             </button>
//             {openDropdown === "investor" && (
//               <ul className="ml-4 space-y-2">
//                 <li>
//                   <Link to="/investors" className="block py-1 px-2 hover:bg-gray-700 rounded">
//                     Manage Investors
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/create-investor"
//                     className="block py-1 px-2 hover:bg-gray-700 rounded"
//                   >
//                     Create Investor
//                   </Link>
//                 </li>
//               </ul>
//             )}
//           </li>
//           <li>
//             <Link to="/admin" className="block py-2 px-4 hover:bg-gray-700 rounded">
//               Admin
//             </Link>
//           </li>
//         </ul>
//       </nav>
//       <button
//         onClick={handleSignOut}
//         className="w-full py-2 mt-4 text-white bg-red-500 hover:bg-red-600"
//       >
//         Sign Out
//       </button>
//     </div>
//   );
// };

// export default Sidebar;
  



// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Sidebar = () => {
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const handleDropdown = (option) => {
//     setOpenDropdown((prev) => (prev === option ? null : option));
//   };

//   return (
//     <div className="w-64 h-screen bg-gray-800 text-white flex flex-col fixed top-0 left-0 z-50">
//       <h1 className="text-2xl font-bold text-center py-4 border-b border-gray-600">
//         Admin Panel
//       </h1>
//       <nav className="flex-1 overflow-y-auto">
//         <ul className="space-y-2 p-4">
//           {/* User Dropdown */}
//           <li>
//             <button
//               onClick={() => handleDropdown('user')}
//               className="w-full flex justify-between items-center py-2 px-4 text-left hover:bg-gray-700 rounded"
//             >
//               User
//               <span>{openDropdown === 'user' ? '▲' : '▼'}</span>
//             </button>
//             {openDropdown === 'user' && (
//               <ul className="ml-4 space-y-2">
//                 <li>
//                   <Link
//                     to="/users"
//                     className="block py-1 px-2 hover:bg-gray-700 rounded"
//                   >
//                     Manage Users
//                   </Link>
//                 </li>
//               </ul>
//             )}
//           </li>

//           {/* Investor Dropdown */}
//           <li>
//             <button
//               onClick={() => handleDropdown('investor')}
//               className="w-full flex justify-between items-center py-2 px-4 text-left hover:bg-gray-700 rounded"
//             >
//               Investor
//               <span>{openDropdown === 'investor' ? '▲' : '▼'}</span>
//             </button>
//             {openDropdown === 'investor' && (
//               <ul className="ml-4 space-y-2">
//                 <li>
//                   <Link
//                     to="/investors"
//                     className="block py-1 px-2 hover:bg-gray-700 rounded"
//                   >
//                     Manage Investors
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/create-investor"
//                     className="block py-1 px-2 hover:bg-gray-700 rounded"
//                   >
//                     Create Investor
//                   </Link>
//                 </li>
//               </ul>
//             )}
//           </li>

//           {/* Admin Option */}
//           <li>
//             <Link
//               to="/admin"
//               className="block py-2 px-4 hover:bg-gray-700 rounded"
//             >
//               Admin
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
