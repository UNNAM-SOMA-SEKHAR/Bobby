import React, { useEffect, useState } from 'react';
import NewUser from './Newuser';

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetch('https://mocki.io/v1/a6a0fb6b-a84a-4934-b3f2-5c92cc77c44e')
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const updateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.username === updatedUser.username ? updatedUser : user))
    );
    setEditingUser(null);
  };

  const deleteUser = (username) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.username !== username));
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  return (
    <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
      {/* Render the New User form */}
      <NewUser addUser={addUser} updateUser={updateUser} editingUser={editingUser} />

      {/* Render the table of users */}
      <table className="table table-hover" style={{ borderCollapse: 'collapse', marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '2px solid black', padding: '8px' }}>S.No</th>
            <th style={{ border: '2px solid black', padding: '8px' }}>Username</th>
            <th style={{ border: '2px solid black', padding: '8px' }}>First Name</th>
            <th style={{ border: '2px solid black', padding: '8px' }}>Last Name</th>
            <th style={{ border: '2px solid black', padding: '8px' }}>Age</th>
            <th style={{ border: '2px solid black', padding: '8px' }}>Marital Status</th>
            <th style={{ border: '2px solid black', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td style={{ border: '2px solid black', padding: '8px' }}>{index + 1}</td>
              <td style={{ border: '2px solid black', padding: '8px' }}>{user.username}</td>
              <td style={{ border: '2px solid black', padding: '8px' }}>{user.first_name}</td>
              <td style={{ border: '2px solid black', padding: '8px' }}>{user.last_name}</td>
              <td style={{ border: '2px solid black', padding: '8px' }}>{user.age}</td>
              <td style={{ border: '2px solid black', padding: '8px' }}>{user.marital_status}</td>
              <td style={{ border: '2px solid black', padding: '8px' }}>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => deleteUser(user.username)}
                  style={{ backgroundColor: 'red', borderColor: 'red' }}
                >
                  Delete
                </button>
                
                <button
                  className="btn btn-danger"
                  onClick={() => handleEditClick(user)}
                  style={{ backgroundColor: 'red', borderColor: 'red' }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDetails;
