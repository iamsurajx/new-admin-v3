// src/pages/InvestorProfile.js
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const InvestorProfile = () => {
  const { id } = useParams(); // Get the investor ID from the URL
  const [investor, setInvestor] = useState(null);

  const API_URL = `https://backendv3-wmen.onrender.com/api/get-investor/${id}`;

  useEffect(() => {
    const fetchInvestor = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.success) {
          setInvestor(data.investor);
        }
      } catch (error) {
        console.error("Error fetching investor:", error);
      }
    };

    fetchInvestor();
  }, [id]);

  if (!investor) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="p-6 my-10 mx-10  bg-gray-800 text-white max-w-lg-2x mx-auto rounded-lg shadow-lg">
  <div className="text-center mb-6">
    <h1 className="text-3xl font-bold">{investor.name} Profile</h1>
    <p className="text-gray-300 mt-2">{investor.description}</p>
  </div>

  <div className="flex flex-col items-center">
    <img
      src={investor.image}
      alt={investor.name}
      className="w-32 h-32 rounded-full object-cover mb-6 shadow-md"
    />
    <div className="text-lg text-gray-300 text-left w-full px-4">
      <p><strong>Geography:</strong> {investor.geography}</p>
      <p><strong>Investment Stages:</strong> {investor.investmentStages}</p>
      <p><strong>Business Model:</strong> {investor.businessModel}</p>
      <p><strong>Sector Interested:</strong> {investor.sectorInterested}</p>
      <p><strong>Check Size:</strong> {investor.checkSize}</p>
      <p><strong>Headquarter:</strong> {investor.headquarter}</p>
    </div>
    <div className="mt-4">
      <a
        href={`mailto:${investor.contactLink}`}
        className="text-blue-600 hover:underline"
      >
        Contact Investor
      </a>
    </div>
    <div className="mt-4 w-full px-4">
      <h3 className="text-xl font-semibold">Portfolio Companies</h3>
      <ul className="mt-2 list-disc list-inside">
        {investor.portfolioCompanies.map((company) => (
          <li key={company.name} className="my-2">
            <a
              href={company.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {company.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

    {/* <div className="p-6 bg-gray-800 text-white">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{investor.name} Profile</h1>
        <p className="text-gray-300 mt-2">{investor.description}</p>
      </div>

      <div className="flex flex-col items-center">
        <img
          src={investor.image}
          alt={investor.name}
          className="w-32 h-32 rounded-full object-cover mb-6"
        />
        <div className="text-lg text-gray-300">
          <p><strong>Geography:</strong> {investor.geography}</p>
          <p><strong>Investment Stages:</strong> {investor.investmentStages}</p>
          <p><strong>Business Model:</strong> {investor.businessModel}</p>
          <p><strong>Sector Interested:</strong> {investor.sectorInterested}</p>
          <p><strong>Check Size:</strong> {investor.checkSize}</p>
          <p><strong>Headquarter:</strong> {investor.headquarter}</p>
        </div>
        <div className="mt-4">
          <a
            href={`mailto:${investor.contactLink}`}
            className="text-blue-600 hover:underline"
          >
            Contact Investor
          </a>
        </div>
        <div className="mt-4">
          <h3 className="text-xl">Portfolio Companies</h3>
          <ul className="mt-2">
            {investor.portfolioCompanies.map((company) => (
              <li key={company.name} className="my-2">
                <a
                  href={company.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {company.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div> */}
    </>
  );
};

export default InvestorProfile;
