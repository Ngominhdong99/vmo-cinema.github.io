export default function LoginValidate(inputValue, users) {
  let error = {};
  const message = "Vui lòng nhập trường này!";
  //   const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!inputValue.userName || inputValue.userName.trim() === "") {
    error.userName = "Vui lòng nhập tên!" || message;
  }
  if (!inputValue.password) {
    error.password = "Vui lòng nhập password!" || message;
  }

  //   else if (user.password !== passwordRegex) {
  //     error.password = "Mật khẩu ít nhất 8 kí tự bao gồm chữ và số!";
  //   }

  return error;
}
