import React from "react";

function ListUser({ users }) {
  return (
    <>
      <table className="table">
        <thead>
          <tr className="tr">
            <th scope="col">STT</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Password</th>
            <th scope="col">Role</th>
            <th scope="col">Comment</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        <tbody id="movie">
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.id}</td>
              <td>{user.userName}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
              <td>[Object]</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ListUser;
