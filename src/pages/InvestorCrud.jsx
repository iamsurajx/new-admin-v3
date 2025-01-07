import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link for navigation

const InvestorCrud = () => {
  const [investors, setInvestors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const API_URL = "https://backendv3-wmen.onrender.com/api/get-investors";
  const DELETE_API_URL =
    "https://backendv3-wmen.onrender.com/api/delete-investor/";

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.success) {
          setInvestors(data.investors);
        }
      } catch (error) {
        console.error("Error fetching investors:", error);
      }
    };
    fetchInvestors();
  }, []);

  const handleEdit = (id) => {
    console.log("Navigating to edit investor with ID:", id);
    navigate(`/api/update-investor/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this investor?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`${DELETE_API_URL}${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (data.success) {
          setInvestors(investors.filter((investor) => investor._id !== id));
        } else {
          alert("Failed to delete investor");
        }
      } catch (error) {
        console.error("Error deleting investor:", error);
      }
    }
  };

  // Filter investors based on the search query
  const filteredInvestors = investors.filter((investor) => {
    return investor.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <div className="relative overflow-x-auto shadow-md p-6 bg-gray-800 text-white">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Investor Management</h1>
          <p className="text-gray-300 mt-2">
            Manage and track your investor database
          </p>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Investors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Investors Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Geography
                </th>
                <th scope="col" className="px-6 py-3">
                  Investment Stages
                </th>
                <th scope="col" className="px-6 py-3">
                  Website
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredInvestors.length > 0 ? (
                filteredInvestors.map((investor) => (
                  <tr
                    key={investor._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <img
                        src={investor.image}
                        alt={investor.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <Link
                        to={`/investor/${investor._id}`} // Navigate to investor profile page
                        className="text-blue-600 hover:underline"
                      >
                        {investor.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{investor.description}</td>
                    <td className="px-6 py-4">{investor.geography}</td>
                    <td className="px-6 py-4">{investor.investmentStages}</td>
                    <td className="px-6 py-4">
                      <a
                        href={investor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        {investor.website}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEdit(investor._id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(investor._id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No investors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default InvestorCrud;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const InvestorCrud = () => {
//   const [investors, setInvestors] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   const API_URL = "https://backendv3-wmen.onrender.com/api/get-investors";
//   const DELETE_API_URL =
//     "https://backendv3-wmen.onrender.com/api/delete-investor/";

//   useEffect(() => {
//     const fetchInvestors = async () => {
//       try {
//         const response = await fetch(API_URL);
//         const data = await response.json();
//         if (data.success) {
//           setInvestors(data.investors);
//         }
//       } catch (error) {
//         console.error("Error fetching investors:", error);
//       }
//     };
//     fetchInvestors();
//   }, []);

//   const handleEdit = (id) => {
//     console.log("Navigating to edit investor with ID:", id);
//     navigate(`/api/update-investor/${id}`);
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this investor?"
//     );
//     if (confirmDelete) {
//       try {
//         const response = await fetch(`${DELETE_API_URL}${id}`, {
//           method: "DELETE",
//         });
//         const data = await response.json();
//         if (data.success) {
//           setInvestors(investors.filter((investor) => investor._id !== id));
//         } else {
//           alert("Failed to delete investor");
//         }
//       } catch (error) {
//         console.error("Error deleting investor:", error);
//       }
//     }
//   };

//   // Filter investors based on the search query
//   const filteredInvestors = investors.filter((investor) => {
//     return investor.name.toLowerCase().includes(searchQuery.toLowerCase());
//   });

//   return (
//     <>
//       <div className="relative overflow-x-auto shadow-md p-6 bg-gray-800 text-white">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold">Investor Management</h1>
//           <p className="text-gray-300 mt-2">
//             Manage and track your investor database
//           </p>
//         </div>
//       </div>

//       <div className="w-full max-w-6xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
//         {/* Search Input */}
//         <div className="mb-6">
//           <input
//             type="text"
//             placeholder="Search Investors..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full px-4 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>

//         {/* Investors Table */}
//         <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6">
//           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//               <tr>
//                 <th scope="col" className="p-4">
//                   Image
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Name
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Description
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Geography
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Investment Stages
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Website
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredInvestors.length > 0 ? (
//                 filteredInvestors.map((investor) => (
//                   <tr
//                     key={investor._id}
//                     className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//                   >
//                     <td className="w-4 p-4">
//                       <img
//                         src={investor.image}
//                         alt={investor.name}
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                     </td>
//                     <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                       {investor.name}
//                     </td>
//                     <td className="px-6 py-4">{investor.description}</td>
//                     <td className="px-6 py-4">{investor.geography}</td>
//                     <td className="px-6 py-4">{investor.investmentStages}</td>
//                     <td className="px-6 py-4">
//                       <a
//                         href={investor.website}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//                       >
//                         {investor.website}
//                       </a>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleEdit(investor._id)}
//                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(investor._id)}
//                         className="font-medium text-red-600 dark:text-red-500 hover:underline"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="text-center py-4 text-gray-500">
//                     No investors found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default InvestorCrud;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const InvestorCrud = () => {
//   const [investors, setInvestors] = useState([]);
//   const navigate = useNavigate();

//   const API_URL = "https://backendv3-wmen.onrender.com/api/get-investors";
//   const DELETE_API_URL =
//     "https://backendv3-wmen.onrender.com/api/delete-investor/";

//   useEffect(() => {
//     const fetchInvestors = async () => {
//       try {
//         const response = await fetch(API_URL);
//         const data = await response.json();
//         if (data.success) {
//           setInvestors(data.investors);
//         }
//       } catch (error) {
//         console.error("Error fetching investors:", error);
//       }
//     };
//     fetchInvestors();
//   }, []);

//   const handleEdit = (id) => {
//     console.log("Navigating to edit investor with ID:", id);
//     navigate(`/api/update-investor/${id}`);
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this investor?"
//     );
//     if (confirmDelete) {
//       try {
//         const response = await fetch(`${DELETE_API_URL}${id}`, {
//           method: "DELETE",
//         });
//         const data = await response.json();
//         if (data.success) {
//           setInvestors(investors.filter((investor) => investor._id !== id));
//         } else {
//           alert("Failed to delete investor");
//         }
//       } catch (error) {
//         console.error("Error deleting investor:", error);
//       }
//     }
//   };

//   return (
//     <>
//       <div className="relative overflow-x-auto shadow-md p-6 bg-gray-800 text-white">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold">Investor Management</h1>
//           <p className="text-gray-300 mt-2">
//             Manage and track your investor database
//           </p>
//         </div>
//       </div>

//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6">
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="p-4">
//                 Image
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Name
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Description
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Geography
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Investment Stages
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Website
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {investors.map((investor) => (
//               <tr
//                 key={investor._id}
//                 className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//               >
//                 <td className="w-4 p-4">
//                   <img
//                     src={investor.image}
//                     alt={investor.name}
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                 </td>
//                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                   {investor.name}
//                 </td>
//                 <td className="px-6 py-4">{investor.description}</td>
//                 <td className="px-6 py-4">{investor.geography}</td>
//                 <td className="px-6 py-4">{investor.investmentStages}</td>
//                 <td className="px-6 py-4">
//                   <a
//                     href={investor.website}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//                   >
//                     {investor.website}
//                   </a>
//                 </td>
//                 <td className="px-6 py-4">
//                   <button
//                     onClick={() => handleEdit(investor._id)}
//                     className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(investor._id)}
//                     className="font-medium text-red-600 dark:text-red-500 hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default InvestorCrud;
