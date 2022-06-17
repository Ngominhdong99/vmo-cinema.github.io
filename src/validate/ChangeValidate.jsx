export default function ChangeValidate(input) {
  let error = {};
  const message = "Vui lòng nhập trường này!";

  if (input.password !== JSON.parse(localStorage.getItem("user")).password) {
    error.password = "Mật khẩu không đúng!" || message;
  }
  if (input.new_password !== input.re_new_password) {
    error.matchPassword = "Mật khẩu mới chưa trùng khớp!" || message;
  }
  if (!input.new_password && !input.re_new_password) {
    error.empty = "Vui lòng nhập đầy đủ các trường!" || message;
  }
  if (input.password === input.new_password) {
    error.password = "Mật khẩu mới trùng với mật khẩu hiện tại!" || message;
  }

  return error;
}
