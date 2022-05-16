import React from "react";
import styled from "styled-components";
import { addUser, setUser, updateUser } from "../../services/store/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    border: none;
    background-color: #6060bd;
    color: #fff;
    cursor: pointer;

    &:hover {
      transition: all 0.3s linear;
      background-color: #2929bb;
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
function Users({ userInput }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddUser = (e) => {
    e.preventDefault();
    dispatch(addUser(userInput));
    dispatch(
      setUser({
        userName: "",
        password: "",
        role: "",
        userImage: "",
      })
    );
  };
  const handleUpdateUser = () => {
    dispatch(updateUser(userInput));
    navigate("/admin/list-user");
    dispatch(
      setUser({
        userName: "",
        password: "",
        role: "",
        comment: [],
      })
    );
  };
  return (
    <>
      <FormElement>
        <DivElement>
          <label>User name</label>
          <input
            type="text"
            value={userInput.userName}
            onChange={(e) =>
              dispatch(
                setUser({
                  ...userInput,
                  userName: e.target.value,
                })
              )
            }
          />
        </DivElement>
        <DivElement>
          <label>User password</label>
          <input
            type="text"
            value={userInput.password}
            onChange={(e) =>
              dispatch(
                setUser({
                  ...userInput,
                  password: e.target.value,
                })
              )
            }
          />
        </DivElement>
        <DivElement>
          <label>Role</label>
          <input
            type="text"
            value={userInput.role}
            onChange={(e) =>
              dispatch(
                setUser({
                  ...userInput,
                  role: e.target.value,
                })
              )
            }
          />
        </DivElement>
      </FormElement>
      <ButtonDiv>
        <button onClick={(e) => handleAddUser(e)}>Add</button>
        <button onClick={(e) => handleUpdateUser(e)}>Update</button>
      </ButtonDiv>
    </>
  );
}

export default Users;
