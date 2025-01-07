import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateInvestor = () => {
  const { id } = useParams(); // Get investor ID from URL
  const navigate = useNavigate();

  const [investor, setInvestor] = useState({
    name: "",
    website: "",
    image: "",
    description: "",
    geography: "",
    investmentStages: "",
    businessModel: "",
    investorType: "",
    sectorInterested: "",
    checkSize: "",
    headquarter: "",
    contactLink: "",
    portfolioCompanies: [], // Array of portfolio companies
  });

  const API_URL = `https://backendv3-wmen.onrender.com/api/update-investor/${id}`;
  const FETCH_API_URL = `https://backendv3-wmen.onrender.com/api/get-investor/${id}`;

  // Fetch the investor details when the component loads
  useEffect(() => {
    const fetchInvestor = async () => {
      try {
        const response = await fetch(FETCH_API_URL);
        const data = await response.json();
        if (data.success) {
          setInvestor(data.investor);
        } else {
          console.error("Failed to fetch investor details.");
        }
      } catch (error) {
        console.error("Error fetching investor details:", error);
      }
    };

    fetchInvestor();
  }, [FETCH_API_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvestor({ ...investor, [name]: value });
  };

  const handlePortfolioChange = (index, key, value) => {
    const updatedPortfolio = [...investor.portfolioCompanies];
    updatedPortfolio[index][key] = value;
    setInvestor({ ...investor, portfolioCompanies: updatedPortfolio });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(investor),
      });
      const data = await response.json();
      if (data.success) {
        alert("Investor updated successfully!");
        navigate("/"); // Redirect to the main page
      } else {
        alert("Failed to update investor.");
      }
    } catch (error) {
      console.error("Error updating investor:", error);
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md p-6 bg-gray-800 text-white">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Investor Management</h1>
          <p className="text-gray-300 mt-2">Manage and track your investor database</p>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Update Investor Profile
        </h1>
        <form className="max-w-6xl mx-auto mt-5 p-6 bg-gray-800 text-white" onSubmit={handleSubmit}>
          {/* Grouped Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "name",
              "website",
              "image",
              "description",
              "geography",
              "investmentStages",
              "businessModel",
              "investorType",
              "sectorInterested",
              "checkSize",
              "headquarter",
              "contactLink",
            ].map((field) => (
              <div key={field} className="relative z-0 w-full mb-5 group">
                <input
                  type={field === "contactLink" ? "email" : "text"}
                  name={field}
                  id={`floating_${field}`}
                  value={investor[field]}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor={`floating_${field}`}
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
                </label>
              </div>
            ))}
          </div>

          {/* Portfolio Companies Section */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              Portfolio Companies
            </label>
            {investor.portfolioCompanies.map((company, index) => (
              <div key={index} className="space-y-2 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={company.name}
                      onChange={(e) => handlePortfolioChange(index, "name", e.target.value)}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      required
                    />
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      placeholder="Logo URL"
                      value={company.logo}
                      onChange={(e) => handlePortfolioChange(index, "logo", e.target.value)}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                  </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="url"
                    placeholder="Website Link"
                    value={company.link}
                    onChange={(e) => handlePortfolioChange(index, "link", e.target.value)}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Update Investor
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateInvestor;
