import React, { useRef } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import getInformation from "../../Firebase/Firebase";
import { useDispatch } from "react-redux";
import { getUser, setCurrentUser, addUser } from "../../services/store/action";
import firebase, { auth, db } from "../../Firebase/config";
import { addDocument } from "../../Firebase/services";
import LoginValidate from "../../validate/LoginValidate";

function LoginForm({ users, currentUser }) {
  const [inputValue, setInputValue] = React.useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = React.useState({});
  const inputRef = useRef();

  const handleLoginAcc = () => {
    const validate = LoginValidate(inputValue, users);
    if (!Object.values(validate).some((item) => item)) {
      users.map((user) => {
        if (
          user.userName === inputValue.userName.trim() &&
          user.password === inputValue.password.trim() &&
          user.role !== "admin"
        ) {
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
          dispatch(setCurrentUser(user));
        }
        if (
          user.userName === inputValue.userName.trim() &&
          user.password === inputValue.password.trim() &&
          user.role === "admin"
        ) {
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/admin");
          dispatch(setCurrentUser(user));
        }
      });
    } else {
      setError(validate);
      inputRef.current.focus();
    }
    users.map((person) => {
      if (
        person.userName !== inputValue.userName ||
        person.password !== inputValue.password
      ) {
        error.notify = "Tài khoản hoặc mật khẩu không đúng!";
      }
      return error;
    });
  };

  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const ggProvider = new firebase.auth.GoogleAuthProvider();
  const loginWithGoogle = async (e) => {
    e.preventDefault();
    const { additionalUserInfo, user } = await auth.signInWithPopup(ggProvider);

    if (additionalUserInfo.isNewUser) {
      addDocument("user", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
      });
      dispatch(
        addUser({
          userName: user.displayName,
          email: user.email,
          userImage: user.photoURL,
          createdAt: user.createdAt,
          role: "member",
          id: user.uid,
        })
      );
    }
  };
  const loginWithFacebook = async (e) => {
    e.preventDefault();
    const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);

    if (additionalUserInfo.isNewUser) {
      addDocument("user", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
      });
      dispatch(
        addUser({
          userName: user.displayName,
          email: user.email,
          userImage: user.photoURL,
          createdAt: user.createdAt,
          role: "member",
          id: user.uid,
        })
      );
    }
  };

  React.useEffect(() => {
    const unsubcribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        navigate("/");
        dispatch(setCurrentUser({ displayName, email, uid, photoURL }));
        localStorage.setItem(
          "user",
          JSON.stringify({
            userName: displayName,
            email: email,
            picture: photoURL,
            id: uid,
          })
        );
        return;
      }

      navigate("/login");
    });

    return () => {
      unsubcribed();
    };
  }, [navigate]);

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <FormContainer>
      <ToastContainer position="top-right" />
      <h1>Login</h1>
      <p>Please enter your Username and Password</p>
      <div>
        <AiOutlineUser className="icon" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your Username or E-mail"
          onChange={(e) => {
            setInputValue({
              ...inputValue,
              userName: e.target.value,
            });
            setError({
              ...error,
              userName: "",
              notify: "",
            });
          }}
        />
      </div>
      <ErrorMessage>{error.userName}</ErrorMessage>
      <div>
        <BsKey className="icon" />
        <input
          required
          type="password"
          placeholder="Enter your password"
          onChange={(e) => {
            setInputValue({
              ...inputValue,
              password: e.target.value,
            });
            setError({
              ...error,
              password: "",
              notify: "",
            });
          }}
        />
      </div>
      <ErrorMessage>{error.password}</ErrorMessage>
      <ErrorMessage>{error.notify}</ErrorMessage>
      {/* <div>
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
      </div> */}
      <button
        className="button"
        onClick={(e) => {
          e.preventDefault();
          dispatch(getUser());
          handleLoginAcc();
        }}
      >
        Login
      </button>
      <div id="sign-with-google">
        <FcGoogle className="icon" />
        <a href="/" onClick={(e) => loginWithGoogle(e)}>
          Or sign-in with Google
        </a>
      </div>
      <div id="sign-with-google">
        <FaFacebookF className="icon" color="blue" />
        <a href="/" onClick={(e) => loginWithFacebook(e)}>
          Or sign-in with Facebook
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

export default LoginForm;
