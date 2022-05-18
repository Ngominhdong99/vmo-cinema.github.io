import React, { useRef } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../../services/store/action";
import { BiArrowBack } from "react-icons/bi";
import RegisterValidate from "../../validate/RegisterValidate";

import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const [newAcc, setNewAcc] = React.useState({
    userName: "",
    password: "",
    role: "member",
    userImage: "",
  });
  const [error, setError] = React.useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();

  const handleRegister = (e) => {
    e.preventDefault();
    const validate = RegisterValidate(newAcc);
    if (!Object.values(validate).some((item) => item)) {
      toast.success("Register Success!");
      dispatch(addUser(newAcc));
      navigate("/login");
      setNewAcc({
        userName: "",
        password: "",
      });
    } else {
      setError(validate);
      inputRef.current.focus();
    }
  };

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <FormContainer type="submit">
      <div className="icon-back" onClick={() => navigate("/login")}>
        <BiArrowBack />
        <span>Back to login</span>
      </div>
      <h1>Register</h1>
      <p>Please enter your Username and Password</p>
      <div>
        <AiOutlineUser className="icon" />
        <input
          ref={inputRef}
          className={error.userName ? "error-input" : ""}
          type="text"
          placeholder="Enter your Username or E-mail"
          required
          value={newAcc.userName}
          onChange={(e) => {
            setNewAcc({
              ...newAcc,
              userName: e.target.value,
            });
            setError({
              ...error,
              userName: "",
            });
          }}
        />
      </div>
      <ErrorMessage className="error">{error.userName}</ErrorMessage>
      <div>
        <BsKey className="icon" />
        <input
          type="text"
          placeholder="Enter your password"
          value={newAcc.password}
          required
          onChange={(e) => {
            setNewAcc({
              ...newAcc,
              password: e.target.value,
            });
            setError({
              ...error,
              password: "",
            });
          }}
        />
      </div>
      <ErrorMessage className="error">{error.password}</ErrorMessage>
      {/* <div>
        <BsKey className="icon" />
        <input type="password" placeholder="Re-enter your password" />
      </div> */}

      <button
        className="button"
        type="submit"
        onClick={(e) => {
          handleRegister(e);
        }}
      >
        Register
      </button>
    </FormContainer>
  );
}

const ErrorMessage = styled.span`
  color: #f83333;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ad00a5;
  font-family: "Roboto", sans-serif;
  margin-top: 10%;
  border-radius: 1rem;
  box-shadow: 1px 10px 15px 1px #e008d6;

  & h1 {
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    font-size: 32px;
    color: #ff9d2d;
  }

  & p {
    margin-bottom: 2rem;
  }

  & div {
    display: flex;
    justify-content: center;
    align-items: center;

    & .icon {
      font-size: 24px;
    }

    & input {
      margin: 0.5rem;
      height: 3rem;
      width: 25rem;
      border-radius: 5px;
      border: none;
      outline: none;
      padding-left: 1rem;

      &::placeholder {
        color: #a1a1a1;
      }
    }

    & i > a {
      text-decoration: none;
      margin-left: 15rem;
      color: #f1f1f1;

      &:hover {
        color: #000000;
      }
    }
  }

  .button {
    margin-top: 2rem;
    margin-bottom: 2rem;
    height: 2.5rem;
    width: 15rem;
    font-size: 18px;
    background-color: transparent;
    border: 1px solid #ff9d2d;
    color: #f1f1f1;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      transition: all 0.3s linear;
      color: #000000;
    }
  }

  #sign-with-google {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: #ff9d2d;
    border-radius: 5px;
    height: 2.5rem;
    width: 15rem;
    margin-bottom: 1rem;
    cursor: pointer;

    & a {
      text-decoration: none;
      color: #f1f1f1;
    }
  }

  .icon-back {
    font-size: 18px;
    margin-left: -80%;
    margin-top: 1rem;
    cursor: pointer;
    padding: 0.2rem;

    &:hover {
      background-color: #ff9d2d;
      color: #000000;
      border-radius: 5px;
    }
  }
`;

export default LoginForm;
