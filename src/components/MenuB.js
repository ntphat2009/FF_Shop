import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const MenuB = () => {
  const handleLogout = () => {
    // Xóa token khỏi session storage
    localStorage.removeItem('token');

    // Điều hướng người dùng đến trang login (hoặc trang chính của ứng dụng)
    window.location.href = '/login';
};
  return (
    <body className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <Link to={`/`}  className="brand-link">
        <img
          src="http://localhost:3000/assetad/dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">FFShop</span>
      </Link>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="http://localhost:3000/assetad/dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <div class="row">
<div class="col"><a href="#" className="d-block">
              Fat
            </a></div>
<div class="col"> <button className="btn btn-danger" onClick={handleLogout}>
                <i className="fas fa-door-open"></i> Đăng xuất
            </button></div>

            </div>
            
           
          </div>
        </div>
        {/* SidebarSearch Form */}
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Bảng điều khiển
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
            </li>
            <li className="nav-item">
              <Link to={`/admin/category`} className="nav-link">
              <i class="fas fa-sticky-note"></i>
                <p>
                  Danh mục sản phẩm
                  <i className="right fas fa-angle-right" />
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/admin/brand`} className="nav-link">
              <i class="fas fa-copyright"></i>                <p>
                  Thương hiệu sản phẩm
                  <i className="right fas fa-angle-right" />
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/admin/product`} className="nav-link">
              <i class="far fa-list-alt"></i>
                <p>
                  Danh sách sản phẩm
                  <i className="right fas fa-angle-right" />
                </p>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to={`/admin/user`} className="nav-link">
              <i class="fas fa-user-tie"></i>
                <p>
                  Danh sách người dùng
                  <i className="right fas fa-angle-right" />
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/admin/topic`} className="nav-link">
              <i class="fas fa-pen-fancy"></i>

                <p>
                  Danh sách chủ đề
                  <i className="right fas fa-angle-right" />
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/admin/post`} className="nav-link">
              <i class="fas fa-sticky-note"></i>
                <p>
                  Danh sách bài viết
                  <i className="right fas fa-angle-right" />
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/admin/tag`} className="nav-link">
              <i class="fas fa-tags"></i>
                <p>
                  Danh sách thẻ
                  <i className="right fas fa-angle-right" />
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/admin/banner`} className="nav-link">
              <i class="fas fa-images"></i>
                <p>
                  Danh sách Banner
                  <i className="right fas fa-angle-right" />
                </p>
              </Link>
            </li>
            {/* <li className="nav-item mt-3 m-auto">
            <button className="btn btn-danger" onClick={handleLogout}>
                <i className="fas fa-door-open"></i> Đăng xuất
            </button>
             </li> */}
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </body>
  );
};

export default MenuB;
