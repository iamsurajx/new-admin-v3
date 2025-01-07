import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const API_URL = "https://backendv3-wmen.onrender.com/api/users/676fd4d39f5c5a2435c895f3/verified-users";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.success) {
          setUsers(data.data);
        } else {
          setError("Failed to fetch users.");
        }
      } catch (error) {
        setError("An error occurred while fetching users.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    navigate(`/update-user/${userId}`);
  };

  const handleBlockUser = async (userId) => {
    const confirmBlock = window.confirm("Are you sure you want to block this user?");
    if (confirmBlock) {
      try {
        const blockerId = "6770e60a1dca460fc5071b5b"; // Current logged-in user's ID
        const response = await fetch(`https://backendv3-wmen.onrender.com/api/block/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ blockerId }),
        });
        const data = await response.json();
        if (data.success) {
          alert("User blocked successfully!");
          setUsers(users.filter((user) => user._id !== userId));
        } else {
          alert("Failed to block user.");
        }
      } catch (error) {
        alert("Error blocking user.", error);
      }
    }
  };

  const handleReportUser = async (userId) => {
    const reason = prompt("Please enter the reason for reporting this user:");
    if (reason) {
      const confirmReport = window.confirm("Are you sure you want to report this user?");
      if (confirmReport) {
        try {
          const reporterId = "676fd6fb9f5c5a2435c89637"; // Current logged-in user's ID
          const response = await fetch(`https://backendv3-wmen.onrender.com/api/report/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reporterId, reason: reason || "No reason" }),
          });
          const data = await response.json();
          if (data.success) {
            alert("User reported successfully!");
          } else {
            alert("Failed to report user.");
          }
        } catch (error) {
          alert("Error reporting user.", error);
        }
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        const response = await fetch(`https://backendv3-wmen.onrender.com/api/delete-user/${userId}`, { method: "DELETE" });
        const data = await response.json();
        if (data.success) {
          alert("User deleted successfully!");
          setUsers(users.filter((user) => user._id !== userId));
        } else {
          alert("Failed to delete user.");
        }
      } catch (error) {
        alert("Error deleting user.", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-white mb-6">Verified Users</h1>
      
      {loading && <p className="text-center text-white">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div key={user._id} className="bg-gray-800 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <div className="text-center mb-4">
              <img 
                src={user.profile.profilePhoto} 
                alt={`${user.name}'s profile`} 
                className="w-32 h-32 rounded-full mx-auto object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-center">{user.name}</h2>
            <p className="text-center text-gray-300">{user.email}</p>
            <p className="text-center mt-2">{user.status}</p>
            <p className="mt-4 text-sm text-gray-400 text-center">{user.profile.bio}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={() => handleEdit(user._id)}
              >
                Edit
              </button>
              <button 
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg"
                onClick={() => handleBlockUser(user._id)}
              >
                Block
              </button>
              <button 
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                onClick={() => handleReportUser(user._id)}
              >
                Report
              </button>
              <button 
                className="bg-gray-600 text-white px-4 py-2 rounded-lg"
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllUsers;
