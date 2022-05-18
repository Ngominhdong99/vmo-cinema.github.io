export default function MovieValidate(movie) {
  let error = {};
  const message = "Vui lòng nhập trường này!";
  const numberRegex = "^-?\\d*(\\.\\d+)?$";

  if (!movie.movie_title || movie.movie_title.trim() === "") {
    error.movie_title = "Vui lòng nhập tên phim!" || message;
  }

  if (!movie.number_of_chap || movie.number_of_chap.trim() === "") {
    error.number_of_chap = "Vui lòng nhập số tập!" || message;
  } else if (isNaN(movie.number_of_chap)) {
    error.number_of_chap = "Chưa đúng định dạng!";
  }

  if (!movie.director || movie.director.trim() === "") {
    error.director = "Vui lòng nhập đạo diễn!" || message;
  }
  if (!movie.img || movie.img.trim() === "") {
    error.img = "Vui lòng thêm ảnh cho phim!" || message;
  }

  if (!movie.nation || movie.nation.trim() === "") {
    error.nation = "Vui lòng nhập quốc gia!" || message;
  }

  if (!movie.duration || movie.duration.trim() === "") {
    error.duration = "Vui lòng nhập thời lượng phim!" || message;
  } else if (isNaN(movie.duration)) {
    error.duration = "Chưa đúng định dạng!";
  }

  if (!movie.year || movie.year.trim() === "") {
    error.year = "Vui lòng nhập năm sản xuất!" || message;
  } else if (isNaN(movie.year)) {
    error.year = "Chưa đúng định dạng!";
  }

  if (!movie.nation || movie.nation.trim() === "") {
    error.nation = "Vui lòng nhập quốc gia!" || message;
  }

  if (!movie.category || movie.category.trim() === "") {
    error.category = "Vui lòng nhập thể loại!" || message;
  }

  if (!movie.status || movie.status.trim() === "") {
    error.status = "Vui lòng nhập trạng thái!" || message;
  }

  if (!movie.movie_description || movie.movie_description.trim() === "") {
    error.movie_description = "Vui lòng nhập miêu tả!" || message;
  }

  if (!movie.link || movie.link.trim() === "") {
    error.link = "Vui lòng nhập đường dẫn phim!" || message;
  }

  return error;
}
