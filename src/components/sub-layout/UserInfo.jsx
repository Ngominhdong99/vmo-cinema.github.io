import React, { memo } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";

function UserInfo() {
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!JSON.parse(localStorage.getItem("user"))?.id > 0) {
      navigate("/");
    }
  }, [JSON.parse(localStorage.getItem("user"))]);

  return (
    <DivElement>
      <div className="image-section">
        <img src={user?.userImage} alt={user?.userName} />
        <p>{user.userName.toUpperCase()}</p>
        <input type="file" />
      </div>
      <div className="line"></div>
      <div className="info-section">
        <div className="info">
          <b>Định danh: </b>
          <p>{user.id}</p>
        </div>
        <div className="info">
          <b>Tên người dùng: </b>
          <p>{user.userName}</p>
        </div>
        <div className="info">
          <b>Email: </b>
          <p>{user.email}</p>
        </div>
        <div className="info">
          <b>Chức vụ: </b>
          <p>{user.role}</p>
        </div>
        <button onClick={() => navigate("/change-password")}>
          Đổi mật khẩu
        </button>
      </div>
    </DivElement>
  );
}

const DivElement = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 30rem;
  margin-top: 5%;
  background-color: #333;
  border-radius: 0.5rem;
  font-family: "roboto";

  .image-section {
    flex-basis: 30%;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    justify-content: space-evenly;
    align-items: center;

    & img {
      height: 15rem;
      width: 15rem;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .line {
    height: 100%;
    width: 2px;
    background-color: #fff;
  }

  .info-section {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex-basis: 70%;

    & .info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-left: 10rem;
      margin-right: 10rem;

      & span {
        font-size: 24px;
      }
      & p {
        text-align: center;
        margin-left: 5rem;
        font-size: 16px;
      }
    }
    & button {
      width: 20%;
      height: 2rem;
      margin-left: auto;
      margin-right: auto;
      border-radius: 5px;
      border: none;
      cursor: pointer;
      transition: all 0.3s linear;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
`;

export default memo(UserInfo);
