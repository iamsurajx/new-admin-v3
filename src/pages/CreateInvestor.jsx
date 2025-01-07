import { useState } from "react";
import { useNavigate } from "react-router-dom";
import countries from "./Countries";

const CreateInvestor = () => {
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
    portfolioCompanies: [],
  });

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
      const response = await fetch(
        "https://backendv3-wmen.onrender.com/api/create-investor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(investor),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Investor created successfully!");
        navigate("/investors"); // Redirect to the investors list page
      } else {
        alert("Failed to create investor.");
      }
    } catch (error) {
      console.error("Error creating investor:", error);
    }
  };


  const addPortfolioCompany = () => {
    setInvestor({
      ...investor,
      portfolioCompanies: [
        ...investor.portfolioCompanies,
        { name: "", logo: "", link: "" }, // Initial empty object for the new portfolio company
      ],
    });
  };

  
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
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Create Investor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={investor.name}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Investor Name"
              required
            />
          </div>

          {/* Grouped Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "website",
              "image",
              "description",
              "sectorInterested",
              "headquarter",
              "contactLink",
            ].map((field) => (
              <div key={field} className="mb-5">
                <label
                  htmlFor={field}
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  {field.charAt(0).toUpperCase() +
                    field.slice(1).replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={investor[field]}
                  onChange={handleChange}
                  className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}

            {/* Geography Dropdown */}
            <div className="mb-5">
              <label
                htmlFor="geography"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Geography
              </label>
              <select
                id="geography"
                name="geography"
                value={investor.geography}
                onChange={handleChange}
                className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Select a Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Check Size Dropdown */}
            <div className="mb-5">
              <label
                htmlFor="checkSize"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Check Size
              </label>
              <select
                id="checkSize"
                name="checkSize"
                value={investor.checkSize}
                onChange={handleChange}
                className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Select Check Size</option>
                <option value="$10,000 - $100,000">$10,000 - $100,000</option>
                <option value="$100,000 - $500,000">$100,000 - $500,000</option>
                <option value="$500,000 - $2 million">
                  $500,000 - $2 million
                </option>
                <option value="$2 million - $10 million">
                  $2 million - $10 million
                </option>
                <option value="$10 million - $25 million">
                  $10 million - $25 million
                </option>
                <option value="$25 million - $100 million+">
                  $25 million - $100 million+
                </option>
                <option value="$100,000 - $500,000">$100,000 - $500,000</option>
                <option value="$500,000 - $50 million+">
                  $500,000 - $50 million+
                </option>
                <option value="$10 million - $100 million+">
                  $10 million - $100 million+
                </option>
              </select>
            </div>

            {/* Investment Stages Dropdown */}
            <div className="mb-5">
              <label
                htmlFor="investmentStages"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Investment Stages
              </label>
              <select
                id="investmentStages"
                name="investmentStages"
                value={investor.investmentStages}
                onChange={handleChange}
                className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Select an Investment Stage</option>
                <option value="idea stage">Idea Stage</option>
                <option value="pre-seed">Pre-Seed</option>
                <option value="seed">Seed</option>
                <option value="series a">Series A</option>
                <option value="series b">Series B</option>
                <option value="series c">Series C</option>
                <option value="series d">Series D (and beyond)</option>
                <option value="ipo">IPO (Initial Public Offering)</option>
                <option value="growth stage">Growth Stage</option>
              </select>
            </div>

            {/* Business Model Dropdown */}
            <div className="mb-5">
              <label
                htmlFor="businessModel"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Business Model
              </label>
              <select
                id="businessModel"
                name="businessModel"
                value={investor.businessModel}
                onChange={handleChange}
                className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Select a Business Model</option>
                <option value="C2B">C2B (Consumer to Business)</option>
                <option value="D2C">D2C (Direct to Consumer)</option>
                <option value="B2G">B2G (Business to Government)</option>
                <option value="G2B">G2B (Government to Business)</option>
                <option value="G2C">G2C (Government to Consumer)</option>
                <option value="P2P">P2P (Peer to Peer)</option>
                <option value="B2B SaaS">
                  B2B SaaS (Software as a Service for Businesses)
                </option>
                <option value="C2C SaaS">
                  C2C SaaS (Consumer to Consumer Software)
                </option>
                <option value="B2E">B2E (Business to Employee)</option>
                <option value="B2B Marketplace">B2B Marketplace</option>
                <option value="B2C Marketplace">B2C Marketplace</option>
                <option value="B2B2G">
                  B2B2G (Business to Business to Government)
                </option>
                <option value="Franchise Model">Franchise Model</option>
                <option value="Subscription Model">Subscription Model</option>
                <option value="Freemium Model">Freemium Model</option>
                <option value="On-Demand Model">On-Demand Model</option>
                <option value="Aggregator Model">Aggregator Model</option>
                <option value="Ad-Based Model">Ad-Based Model</option>
                <option value="Retail Model">Retail Model</option>
                <option value="Wholesale Model">Wholesale Model</option>
                <option value="Direct Sales">Direct Sales</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Investor Type Dropdown */}
            <div className="mb-5">
              <label
                htmlFor="investorType"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Investor Type
              </label>
              <select
                id="investorType"
                name="investorType"
                value={investor.investorType}
                onChange={handleChange}
                className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Select Investor Type</option>
                <option value="Venture Capital">Venture Capital</option>
                <option value="Private Equity">Private Equity</option>
                <option value="Angel Investors">Angel Investors</option>
                <option value="Family Offices">Family Offices</option>
                <option value="Sovereign Wealth Funds">
                  Sovereign Wealth Funds
                </option>
                <option value="Government Grants and Funds">
                  Government Grants and Funds
                </option>
                <option value="Strategic Investors">Strategic Investors</option>
                <option value="Banks">Banks (Debt Financing)</option>
                <option value="Friends and Family">Friends and Family</option>
                <option value="Bootstrap">Bootstrap (Self-Funding)</option>
                <option value="Fund of Funds">Fund of Funds (FoF)</option>
                <option value="Social Impact Investors">
                  Social Impact Investors
                </option>
                <option value="Pension Funds">Pension Funds</option>
              </select>
            </div>
          </div>

          {/* Portfolio Companies
          // <div className="mb-5">
          //   <label className="block mb-2 text-sm font-medium text-gray-300">
          //     Portfolio Companies
          //   </label>
          //   {investor.portfolioCompanies.map((company, index) => (
          //     <div key={index} className="space-y-4 mb-4">
          //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          //         <div className="mb-5">
          //           <input
          //             type="text"
          //             placeholder="Company Name"
          //             value={company.name}
          //             onChange={(e) =>
          //               handlePortfolioChange(index, "name", e.target.value)
          //             }
          //             className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          //           />
          //         </div>
          //         <div className="mb-5">
          //           <input
          //             type="text"
          //             placeholder="Logo URL"
          //             value={company.logo}
          //             onChange={(e) =>
          //               handlePortfolioChange(index, "logo", e.target.value)
          //             }
          //             className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          //           />
          //         </div>
          //       </div>
          //       <div className="mb-5">
          //         <input
          //           type="url"
          //           placeholder="Website Link"
          //           value={company.link}
          //           onChange={(e) =>
          //             handlePortfolioChange(index, "link", e.target.value)
          //           }
          //           className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          //         />
          //       </div>
          //     </div>
          //   ))}
          // </div> */}

  {/* Portfolio Companies */}
  <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Portfolio Companies
            </label>
            {investor.portfolioCompanies.map((company, index) => (
              <div key={index} className="space-y-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-5">
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={company.name}
                      onChange={(e) =>
                        handlePortfolioChange(index, "name", e.target.value)
                      }
                      className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div className="mb-5">
                    <input
                      type="text"
                      placeholder="Logo URL"
                      value={company.logo}
                      onChange={(e) =>
                        handlePortfolioChange(index, "logo", e.target.value)
                      }
                      className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <input
                    type="url"
                    placeholder="Website Link"
                    value={company.link}
                    onChange={(e) =>
                      handlePortfolioChange(index, "link", e.target.value)
                    }
                    className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
              </div>
            ))}
            {/* Button to add more portfolio companies */}
            <button
              type="button"
              onClick={addPortfolioCompany}
              className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Add More Portfolio Companies
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create Investor
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateInvestor;
