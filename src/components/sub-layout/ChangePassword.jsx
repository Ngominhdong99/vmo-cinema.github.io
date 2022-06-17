import React, { useRef, memo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateUser } from "../../services/store/action";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import ChangeValidate from "../../validate/ChangeValidate";

import "react-toastify/dist/ReactToastify.css";

function ChangePassword() {
  const [newAcc, setNewAcc] = React.useState({
    password: "",
    new_password: "",
    re_new_password: "",
  });
  const [isHidePass, setIsHidePass] = React.useState(true);

  const [error, setError] = React.useState({});
  const dispatch = useDispatch();
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleChangePassword = (e) => {
    e.preventDefault();

    const validate = ChangeValidate(newAcc);
    if (!Object.values(validate).some((item) => item)) {
      toast.success("Password Changed Success!");
      dispatch(
        updateUser({
          ...JSON.parse(localStorage.getItem("user")),
          password: newAcc.re_new_password,
        })
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("user")),
          password: newAcc.re_new_password,
        })
      );
      setNewAcc({
        password: "",
        new_password: "",
        re_new_password: "",
      });
    } else {
      setError(validate);
      inputRef.current.focus();
    }
  };

  return (
    <FormContainer type="submit">
      <ToastContainer position="top-right" />
      <div className="icon-back" onClick={() => navigate("/user-info")}>
        <BiArrowBack />
        <span>Back</span>
      </div>
      <h1>Management account</h1>
      <p>Please enter your Password and New Password</p>

      <div>
        <input
          ref={inputRef}
          type={isHidePass ? "password" : "text"}
          placeholder="Enter your password!"
          value={newAcc.password}
          onChange={(e) => {
            setNewAcc({
              ...newAcc,
              password: e.target.value,
            });
            setError({
              ...error,
              password: "",
              empty: "",
            });
          }}
        />
        {isHidePass ? (
          <AiOutlineEyeInvisible
            className="eye-icon"
            onClick={() => setIsHidePass(false)}
          />
        ) : (
          <AiOutlineEye
            className="eye-icon"
            onClick={() => setIsHidePass(true)}
          />
        )}
      </div>
      <ErrorMessage className="error">
        {error.password || error.empty}
      </ErrorMessage>
      <div>
        <input
          type="text"
          placeholder="Enter new password!"
          value={newAcc.new_password}
          onChange={(e) => {
            setNewAcc({
              ...newAcc,
              new_password: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Confirm your new password!"
          value={newAcc.re_new_password}
          onChange={(e) => {
            setNewAcc({
              ...newAcc,
              re_new_password: e.target.value,
            });
            setError({
              ...error,
              password: "",
              matchPassword: "",
              empty: "",
            });
          }}
        />
      </div>
      <ErrorMessage className="error">{error.matchPassword}</ErrorMessage>
      <button
        className="button"
        type="submit"
        onClick={(e) => {
          handleChangePassword(e);
        }}
      >
        Change Password
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
  background-color: #333;
  font-family: "Roboto", sans-serif;
  margin-top: 10%;
  border-radius: 1rem;
  box-shadow: 5px 5px 10px #333;

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

    .eye-icon {
      margin-left: -1rem;
      transform: translateX(-1.5rem);
      color: black;
      user-select: none;
      cursor: pointer;
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

export default memo(ChangePassword);
