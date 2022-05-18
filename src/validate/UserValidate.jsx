export default function UserValidate(user) {
  let error = {};
  const message = "Vui lòng nhập trường này!";
  //   const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (!user.userName || user.userName.trim() === "") {
    error.userName = "Vui lòng nhập tên!" || message;
  }
  if (!user.password || user.userName.trim() === "") {
    error.password = "Vui lòng nhập password!" || message;
  }
  if (!user.role || user.role.trim() === "") {
    error.role = "Vui lòng nhập phân quyền!" || message;
  }
  //   else if (user.password !== passwordRegex) {
  //     error.password = "Mật khẩu ít nhất 8 kí tự bao gồm chữ và số!";
  //   }

  return error;
}
