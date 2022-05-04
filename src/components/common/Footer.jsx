import React from "react";
import "../../scss/common/Footer.scss";

function Footer() {
  return (
    <div className="footer-container">
      <img src="/images/motchill.png" alt="logo" />
      <div className="status-section">
        <ul className="">
          <li>Hành Động</li>
          <li>Hài Hước</li>
          <li>Tình Cảm</li>
          <li>Anime</li>
        </ul>
      </div>
      <div className="nation-section">
        <ul className="">
          <li>Mỹ</li>
          <li>Nhật Bản</li>
          <li>Hàn Quốc</li>
          <li>Thái Lan</li>
        </ul>
      </div>
      <div className="web-info-section">
        <ul className="">
          <li>Điều khoản sử dụng</li>
          <li>Chính sách riêng tư</li>
          <li>Khiếu nại bản quyền</li>
          <li>© 2022 Ngominhdong99.github.io</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
