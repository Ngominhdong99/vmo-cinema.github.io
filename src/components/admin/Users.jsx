import React from "react";
import styled from "styled-components";
import { addUser } from "../../services/store/action";
import { useDispatch } from "react-redux";

const FormElement = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 2%;

  & button {
    height: 3rem;
    width: 8rem;
    margin-left: 1rem;
    margin-right: 1rem;
    font-size: 16px;
    background: transparent;
    border-radius: 10px;
    border-color: #fff;
    cursor: pointer;

    &:hover {
      transition: all 0.3s linear;
      background-color: #cc6d00;
    }
  }
`;

const DivElement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 5%;

  & input {
    outline: none;
    height: 3rem;
    width: 25rem;
    border-radius: 10px;
    border: none;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  & label {
    color: #000000;
  }
`;
function Users() {
  const [user, setUser] = React.useState({
    userName: "",
    password: "",
    role: "",
    comment: [],
  });
  const dispatch = useDispatch();

  const handleAddUser = (e) => {
    e.preventDefault();
    dispatch(addUser(user));
    setUser({
      userName: "",
      password: "",
      role: "",
      comment: [],
    });
  };
  return (
    <>
      <FormElement>
        <DivElement>
          <label>User name</label>
          <input
            type="text"
            value={user.userName}
            onChange={(e) =>
              setUser({
                ...user,
                userName: e.target.value,
              })
            }
          />
        </DivElement>
        <DivElement>
          <label>User password</label>
          <input
            type="text"
            value={user.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value,
              })
            }
          />
        </DivElement>
        <DivElement>
          <label>Role</label>
          <input
            type="text"
            value={user.role}
            onChange={(e) =>
              setUser({
                ...user,
                role: e.target.value,
              })
            }
          />
        </DivElement>
      </FormElement>
      <ButtonDiv>
        <button onClick={(e) => handleAddUser(e)}>Add</button>
        <button>Update</button>
      </ButtonDiv>
    </>
  );
}

export default Users;
