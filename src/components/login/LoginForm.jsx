import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

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
    margin-bottom: 1rem;
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
`;

function LoginForm() {
  const navigate = useNavigate();

  return (
    <FormContainer>
      <ToastContainer position="top-right" />

      <h1>Login</h1>
      <p>Please enter your Username and Password</p>
      <div>
        <AiOutlineUser className="icon" />
        <input type="text" placeholder="Enter your Username or E-mail" />
      </div>
      <div>
        <BsKey className="icon" />
        <input type="password" placeholder="Enter your password" />
      </div>
      <div>
        <i>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Forgot password?
          </a>
        </i>
      </div>
      <button
        className="button"
        onClick={() => {
          navigate("/home-movie");
        }}
      >
        Login
      </button>
      <div id="sign-with-google">
        <FcGoogle className="icon" />
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Or sign-in with Google
        </a>
      </div>
      <div>
        <p>
          Not a member yet?
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
          >
            Register!
          </a>
        </p>
      </div>
    </FormContainer>
  );
}

export default LoginForm;
