import { useState, useEffect } from "react";
import apiClient from "../config/apiClient";

const DataTablePage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient(`/users`);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setErrorMessage("");
  };

  const handleDelete = async (userId) => {
    try {
      await apiClient.delete(`/user/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const { username, email } = e.target;

    if (!username.value || !email.value) {
      setErrorMessage("Username and email are required.");
      return;
    }

    try {
      const response = await apiClient.put(`/user/${editingUser._id}`, {
        username: username.value,
        email: email.value,
      });
      console.log("response : ", response.data);
      setUsers(
        users.map((user) =>
          user._id === response.data.updatedUser._id
            ? response.data.updatedUser
            : user
        )
      );
      setEditingUser(null);
    } catch (error) {
      console.error("Error saving user:", error);
      setErrorMessage("Error updating user.");
    }
  };

  return (
    <div className="p-8">
      <div className="mb-4">
        <h1 className="text-3xl font-semibold">All Users</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Edit User</h2>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <form onSubmit={handleSave}>
            <div>
              <input
                name="username"
                type="text"
                defaultValue={editingUser.username}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Username"
              />
            </div>
            <div>
              <input
                name="email"
                type="email"
                defaultValue={editingUser.email}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DataTablePage;
