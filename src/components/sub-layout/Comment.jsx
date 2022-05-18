import React from "react";
import { useDispatch } from "react-redux";
import "../../scss/sub-layout/Comment.scss";
import { useParams, Link } from "react-router-dom";
import { addComment, deleteComment } from "../../services/store/action";
import StarRating from "./StarRating";
import styled from "styled-components";
// import { user } from "../../Firebase/user";

function Comment({ users, currentUser, currentUserRating }) {
  const dispatch = useDispatch();
  const params = useParams();
  const [reload, setReload] = React.useState(false);
  const [filterComment, setFilterComment] = React.useState("comment-section");
  const [movieComment, setMovieComment] = React.useState([]);
  const [commentInput, setCommentInput] = React.useState({
    movieId: null,
    userId: null,
    movieId: null,
    content: "",
  });

  const fetchComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/comment?movieId=${params.id}`
      );
      const data = await response.json();
      setMovieComment(data);
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleSendComment = (e) => {
    e.preventDefault();
    setReload(!reload);
    if (localStorage.getItem("user")) {
      dispatch(
        addComment({
          ...commentInput,
          movieId: params.id,
          userId: JSON.parse(localStorage.getItem("user")).id,
          date: new Date().toLocaleString(),
        })
      );
      setCommentInput({
        userId: null,
        movieId: null,
        movieId: null,
        content: "",
      });
    } else {
      alert("Vui long dang nhap de binh luan");
    }
  };

  const handleDeleteComment = (id) => {
    setReload(!reload);
    if (localStorage.getItem("user")) {
      dispatch(deleteComment(id));
    }
  };
  React.useEffect(() => {
    fetchComment();
  }, [handleDeleteComment]);

  if (localStorage.getItem("user")) {
    return (
      <div className="comment-container">
        <div>
          <div className="comment-filter">
            <p>{movieComment.length} bình luận</p>
            <select
              onChange={(e) => {
                if (e.target.value === "Mới nhất") {
                  setFilterComment("comment-section");
                } else if (e.target.value === "Cũ nhất") {
                  setFilterComment("comment-section reverse");
                }
              }}
            >
              <option>Mới nhất</option>
              <option>Cũ nhất</option>
            </select>
          </div>
          <StarRating
            currentUser={currentUser}
            movieComment={movieComment}
            params={params}
            currentUserRating={currentUserRating}
          />
        </div>
        <form className="input-section">
          <input
            type="text"
            placeholder="Viết bình luận..."
            value={commentInput.content}
            onChange={(e) =>
              setCommentInput({
                ...commentInput,
                content: e.target.value,
              })
            }
          />
          <button onClick={(e) => handleSendComment(e)}>Gửi bình luận</button>
        </form>
        <div className={filterComment}>
          {movieComment.map((item, index) => {
            return (
              <div className="comment-item" key={index}>
                <img src="/images/user.png" alt="user" />
                <div className="content">
                  {users.map((user, index) => {
                    if (user.id === item.userId) {
                      return (
                        <div key={index} className="name-date">
                          <h3>{user.userName}</h3>
                          <span>at: {item.date}</span>
                        </div>
                      );
                    }
                  })}
                  <p>{item.content}</p>
                  {JSON.parse(localStorage.getItem("user"))?.id ===
                    item.userId ||
                  JSON.parse(localStorage.getItem("user"))?.role === "admin" ? (
                    <button
                      className="btn-delete-comment"
                      onClick={() => handleDeleteComment(item.id)}
                    >
                      Xóa bình luận
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <H1Element>
          Vui lòng{" "}
          <Link to="/login" className="login-link">
            {" "}
            đăng nhập{" "}
          </Link>{" "}
          để đánh giá và bình luận
        </H1Element>
        <div className="comment-container">
          {movieComment.map((item, index) => {
            return (
              <div className="comment-item" key={index}>
                <img src="/images/user.png" alt="user" />
                <div className="content">
                  {users.map((user, index) => {
                    if (user.id === item.userId) {
                      return (
                        <div key={index} className="name-date">
                          <h3>{user.userName}</h3>
                          <span>at: {item.date}</span>
                        </div>
                      );
                    }
                  })}
                  <p>{item.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const H1Element = styled.h1`
  height: 5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  margin-top: 4rem;
  font-family: "roboto";
`;

export default Comment;
