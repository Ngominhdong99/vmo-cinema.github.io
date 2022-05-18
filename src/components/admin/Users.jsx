import React from "react";
import styled from "styled-components";
import {
  addUser,
  setUser,
  updateUser,
  getUser,
} from "../../services/store/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserValidate from "../../validate/UserValidate";

function Users({ userInput }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState({});

  const handleAddUser = (e) => {
    e.preventDefault();
    const validate = UserValidate(userInput);
    if (!Object.values(validate).some((item) => item)) {
      dispatch(addUser(userInput));
      navigate("/admin/list-user");
      dispatch(
        setUser({
          userName: "",
          password: "",
          email: "",
          role: "",
          userImage: "",
        })
      );
    } else {
      setError(validate);
    }
  };
  const handleUpdateUser = () => {
    dispatch(updateUser(userInput));
    navigate("/admin/list-user");
    dispatch(
      setUser({
        userName: "",
        password: "",
        email: "",
        role: "",
        userImage: "",
      })
    );
  };

  const handleClear = (e) => {
    e.preventDefault();
    dispatch(
      setUser({
        userName: "",
        password: "",
        email: "",
        role: "",
        userImage: "",
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
            onChange={(e) => {
              dispatch(
                setUser({
                  ...userInput,
                  userName: e.target.value,
                })
              );
              setError({
                ...error,
                userName: "",
              });
            }}
          />
        </DivElement>
        <ErrorMessage>{error.userName}</ErrorMessage>
        <DivElement>
          <label>User password</label>
          <input
            type="text"
            value={userInput.password}
            onChange={(e) => {
              dispatch(
                setUser({
                  ...userInput,
                  password: e.target.value,
                })
              );
              setError({
                ...error,
                password: "",
              });
            }}
          />
        </DivElement>
        <ErrorMessage>{error.password}</ErrorMessage>
        <DivElement>
          <label>Role</label>
          <input
            type="text"
            value={userInput.role}
            onChange={(e) => {
              dispatch(
                setUser({
                  ...userInput,
                  role: e.target.value,
                })
              );
              setError({
                ...error,
                role: "",
              });
            }}
          />
        </DivElement>
        <ErrorMessage>{error.role}</ErrorMessage>
        <DivElement>
          <label>Email</label>
          <input
            type="text"
            value={userInput.email}
            onChange={(e) =>
              dispatch(
                setUser({
                  ...userInput,
                  email: e.target.value,
                })
              )
            }
          />
        </DivElement>
        <DivElement>
          <label>User photo</label>
          <input
            type="text"
            value={userInput.userImage}
            onChange={(e) =>
              dispatch(
                setUser({
                  ...userInput,
                  userImage: e.target.value,
                })
              )
            }
          />
        </DivElement>
      </FormElement>
      <ButtonDiv>
        <button
          className={userInput?.id ? "btn-inactive" : "btn-active"}
          onClick={(e) => handleAddUser(e)}
        >
          Add
        </button>
        <button
          className={userInput?.id ? "btn-active" : "btn-inactive"}
          onClick={(e) => handleUpdateUser(e)}
        >
          Update
        </button>
        <button className="btn-active" onClick={(e) => handleClear(e)}>
          Clear
        </button>
      </ButtonDiv>
    </>
  );
}

const ErrorMessage = styled.span`
  color: #f83333;
  transform: translateY(0.3rem);
`;

const FormElement = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
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

  & .btn-inactive {
    display: none;
  }
`;

const DivElement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 2.5%;

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
    margin-bottom: 0.3rem;
  }
`;

export default Users;
