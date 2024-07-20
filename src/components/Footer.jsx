import React from 'react'
const Footer = () => {
  return (
    <>
    
    {/* ========================= FOOTER ========================= */}
    <footer className="section-footer bg-secondary">
      <div className="container">
        <section className="footer-top padding-y-lg text-white">
          <div className="row">
            <aside className="col-md col-6">
              <h6 className="title">Thương hiệu</h6>
              <ul className="list-unstyled">
                <li>
                  {" "}
                  <a href="#">Adidas</a>
                </li>
                <li>
                  {" "}
                  <a href="#">Puma</a>
                </li>
                <li>
                  {" "}
                  <a href="#">Reebok</a>
                </li>
                <li>
                  {" "}
                  <a href="#">Nike</a>
                </li>
              </ul>
            </aside>
            <aside className="col-md col-6">
              <h6 className="title">Công ty</h6>
              <ul className="list-unstyled">
                <li>
                  {" "}
                  <a href="#">Về chúng tôi</a>
                </li>
                <li>
                  {" "}
                  <a href="#">Career</a>
                </li>
                <li>
                  {" "}
                  <a href="#">Các chi nhánh</a>
                </li>
                <li>
                  {" "}
                  <a href="#">Rules and terms</a>
                </li>
                <li>
                  {" "}
                  <a href="#">Địa chỉ</a>
                </li>
              </ul>
            </aside>
            <aside className="col-md col-6">
              <h6 className="title">Giúp đỡ</h6>
              <ul className="list-unstyled">
                <li>
                  {" "}
                  <a href="#">Liên hệ chúng tôi</a>
                </li>
                <li>
                  {" "}
                  <a href="#">Chính sách hoàn tiền</a>
                </li>
                <li>
                  {" "}
                  <a href="#">Trạng thái đơn hàng</a>
                </li>
                <li>
                  {" "}
                  <a href="#">Thông tin giao hàng</a>
                </li>
                <li>
                  {" "}
                  <a href="#">Open dispute</a>
                </li>
              </ul>
            </aside>
            <aside className="col-md col-6">
              <h6 className="title">Tài khoản</h6>
              <ul className="list-unstyled">
                <li>
                  {" "}
                  <a href="#"> Đăng nhập tài khoản </a>
                </li>
                <li>
                  {" "}
                  <a href="#"> Đăng ký người dùng </a>
                </li>
                <li>
                  {" "}
                  <a href="#"> Cài đặt tài khoản </a>
                </li>
                <li>
                  {" "}
                  <a href="#"> Đơn hàng của tôi </a>
                </li>
              </ul>
            </aside>
            <aside className="col-md">
              <h6 className="title">Mạng xã hội</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="#">
                    {" "}
                    <i className="fab fa-facebook" /> Facebook{" "}
                  </a>
                </li>
                <li>
                  <a href="#">
                    {" "}
                    <i className="fab fa-twitter" /> Twitter{" "}
                  </a>
                </li>
                <li>
                  <a href="#">
                    {" "}
                    <i className="fab fa-instagram" /> Instagram{" "}
                  </a>
                </li>
                <li>
                  <a href="#">
                    {" "}
                    <i className="fab fa-youtube" /> Youtube{" "}
                  </a>
                </li>
              </ul>
            </aside>
          </div>{" "}
          {/* row.// */}
        </section>{" "}
        {/* footer-top.// */}
        <section className="footer-bottom text-center">
          <p className="text-white">
            Privacy Policy - Terms of Use - User Information Legal Enquiry Guide
          </p>
          <p className="text-muted"> © 2019 Company name, All rights reserved </p>
          <br />
        </section>
      </div>
      {/* //container */}
    </footer>
    {/* ========================= FOOTER END // ========================= */}
    </>
  )
}

export default Footer