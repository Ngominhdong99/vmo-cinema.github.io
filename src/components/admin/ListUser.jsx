import React from "react";
import { deleteUser, getUser, setUser } from "../../services/store/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ListUser({ users }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditUser = (user) => {
    dispatch(setUser(user));
    navigate("/admin/users");
  };
  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  React.useEffect(() => {
    dispatch(getUser());
  }, [handleDeleteUser]);
  return (
    <>
      <table className="table">
        <thead>
          <tr className="tr">
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Role</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        <tbody id="movie">
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ListUser;
