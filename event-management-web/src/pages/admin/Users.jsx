import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Users.css";

export default function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    api.get("/users")
      .then(res => setUsers(res.data))
      .catch(() => alert("Failed to load users"));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRoleStatus = async (userId, status) => {
    try {
      await api.put(`/users/update-role/${userId}`, { status });
      alert(`User role ${status}`);
      fetchUsers();
    } catch (err) {
      alert("Failed to update user role");
    }
  };

  return (
    <div className="admin-users-page">
      <h2>User Management</h2>

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.user_id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                {user.status === "pending" ? (
                  <>
                    <button
                      className="approve-btn"
                      onClick={() => updateRoleStatus(user.user_id, "approved")}
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => updateRoleStatus(user.user_id, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
