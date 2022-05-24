import React from "react";
import { deleteUser, getUser, setUser } from "../../services/store/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ListUser({ users, datas }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reload, setReload] = React.useState(false);

  const handleEditUser = (user) => {
    dispatch(setUser(user));
    navigate("/admin/users");
  };
  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
    setReload(!reload);
  };

  React.useEffect(() => {
    dispatch(getUser());
  }, [reload]);

  return (
    <>
      <table className="table">
        <thead>
          <tr className="tr">
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Photos</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Role</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        <tbody id="movie">
          {datas?.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.userName}</td>
              <td>
                <img
                  style={{ width: "50%", height: "100%" }}
                  src={user.userImage}
                  alt={user.userName}
                />
              </td>
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
