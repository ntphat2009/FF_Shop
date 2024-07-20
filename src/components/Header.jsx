import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from 'axios';
const Header = () => {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);

  const [brand, setBrand] = useState([]);
  const [topic, setTopic] = useState([]);
  const handleSearch = async (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
    try {
      const response = await axios.get(`https://localhost:44389/api/Products?search=${searchTerm}`);
      navigate(`/search?searchTerm=${searchTerm}`);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };
  const token = sessionStorage.getItem('token');
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://localhost:44389/api/Category');
        const filtered = response.data.filter(items => items.Status);

        setCategories(filtered);
      } catch (error) {
        console.error('Lỗi khi gọi cate:', error);
      }
    };

    const fetchBrand = async () => {
      try {
        const response = await axios.get('https://localhost:44389/api/Brand');
        const filtered = response.data.filter(items => items.Status);
        setBrand(filtered);
      } catch (error) {
        console.error('Lỗi khi gọi brand:', error);
      }
    };

    const fetchTopic = async () => {
      try {
        const response = await axios.get('https://localhost:44389/api/Topics');
        const filtered = response.data.filter(items => items.Status);
        
        setTopic(filtered);
      } catch (error) {
        console.error('Lỗi khi gọi topic:', error);
      }
    };

    fetchCategories();
    fetchBrand();
    fetchTopic();
    return () => {
      // Xóa bất kỳ subscriptions hoặc cleardown nào nếu cần
    };
  }, []);


  const isLoggedIn = !!sessionStorage.getItem('token');

  // console.log("cate", categories)
  return (
    <>
      <header className="section-header">
        <section className="header-main border-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-2 col-lg-3 col-md-12">
                <a href="/" className="brand-wrap">
                  <img className="logo" src="./images/logo.png" />
                </a>{" "}
                {/* brand-wrap.// */}
              </div>
              <div className="col-xl-6 col-lg-5 col-md-6 ">
                <form onSubmit={handleSearch} className="search-header border-info">
                  <div className="input-group w-100 ">
                    <input
                      type="text"
                      className="form-control"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Nhập sản phẩm cần tìm..."
                    />
                    <div className="input-group-append ">
                      <button className="btn btn-info initialism" type="submit">
                        <i className="fa fa-search" /> Tìm kiếm
                      </button>
                    </div>
                  </div>
                </form>{" "}
                {/* search-wrap .end// */}
              </div>{" "}
              {/* col.// */}
              <div class="col-xl-4 col-lg-4 col-md-6">
                <div class="widgets-wrap float-md-right">
                  <div class="widget-header mr-3">

                    {isLoggedIn ? (
                      // Đã đăng nhập: Điều hướng đến trang profile
                      <Link to={`/myprofile`}><div class="icon-area">
                        <i class="fa fa-user"></i>
                        <span class="notify">3</span>
                      </div>
                        <small class="text"> Tài khoản </small></Link>

                    ) : (
                      // Chưa đăng nhập: Điều hướng đến trang đăng nhập
                      <Link to={`/signin`}><div class="icon-area">
                        <i class="fa fa-user"></i>

                      </div>
                        <small class="text"> Đăng nhập </small></Link>
                    )}
                  </div>
                  {/* <div class="widget-header mr-3">
                    <a href="#" class="widget-view">
                      <div class="icon-area">
                        <i class="fa fa-comment-dots"></i>
                        <span class="notify">1</span>
                      </div>
                      <small class="text"> Thông báo </small>
                    </a>
                  </div> */}
                  <div class="widget-header mr-3">
                    {isLoggedIn ? (
                      // Đã đăng nhập: Điều hướng đến trang profile
                      <Link to={"/orderlist"} class="widget-view"><div class="icon-area">
                        <i class="fa fa-store"></i>
                      </div>
                        <small class="text"> Đơn hàng</small></Link>

                    ) : (
                      // Chưa đăng nhập: Điều hướng đến trang đăng nhập
                      <Link to={`/signin`}><div class="icon-area">
                        <i class="fa fa-store"></i>

                      </div>
                        <small class="text"> Đơn hàng </small></Link>
                    )}


                  </div>
                  <div class="widget-header">
                    <Link to={"/shoppingcart"} class="widget-view"><div class="icon-area">
                      <i class="fa fa-shopping-cart"></i>
                    </div>
                      <small class="text"> Giỏ hàng</small></Link>

                  </div>{" "}
                  {/* widgets-wrap.// */}
                </div>{" "}
                {/* col.// */}
              </div>{" "}
              {/* row.// */}
            </div>{" "}
            {/* container.// */}
          </div>
        </section>{" "}
        {/* header-main .// */}
        <nav className="navbar navbar-main navbar-expand-lg border-bottom bg-info">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#main_nav"
              aria-controls="main_nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="main_nav">
              <ul className="navbar-nav " style={{marginLeft:"10%"}}>
                <li className="nav-item">
                  <Link to={"/allproducts"} className="nav-link text-uppercase font-weight-bold text-default-light">Tất cả sản phẩm</Link>

                </li>
                <li className="nav-item dropdown mx-5">

                  <a
                    className="nav-link dropdown-toggle text-uppercase font-weight-bold text-default-light"
                    data-toggle="dropdown"
                    href="#"
                  >
                    Ngành hàng{" "}
                  </a>
                  <div className="dropdown-menu">

                    {categories && categories.length > 0 ? (
                      categories.map(cate => (
                        <Link to={`/products/category/${cate.Id}`} className="dropdown-item " key={cate.Id}>
                          {cate.Name}
                        </Link>
                      ))
                    ) : (
                      <p className="dropdown-item">Không tìm thấy ngành hàng nào</p>
                    )}

                  </div>
                </li>
                <li className="nav-item dropdown">

                  <a
                    className="nav-link dropdown-toggle text-uppercase font-weight-bold text-default-light"
                    data-toggle="dropdown"
                    href="#"
                  >
                    <i className="fa fa-bars text-muted mr-2" /> Thương hiệu{" "}
                  </a>
                  <div className="dropdown-menu">

                    {brand && brand.length > 0 ? (
                      brand.map(brand => (
                        <Link to={`/products/brand/${brand.Id}`} className="dropdown-item" key={brand.Id}>
                          {brand.Name}
                        </Link>
                      ))
                    ) : (
                      <p className="dropdown-item">Không tìm thấy thương hiệu nào</p>
                    )}

                  </div>
                </li>
                <li className="nav-item dropdown mx-5">

                  <a
                    className="nav-link dropdown-toggle text-uppercase font-weight-bold text-default-light"
                    data-toggle="dropdown"
                    href="#"
                  >
                    <i className="fa fa-bars text-muted mr-2" /> Chủ đề{" "}
                  </a>
                  <div className="dropdown-menu">
                    <Link to={`/topic`} className="dropdown-item" >
                      Tất cả chủ đề
                    </Link>
                    {topic && topic.length > 0 ? (
                      topic.map(topic => (
                        <Link to={`/topic/${topic.Id}`} className="dropdown-item" key={topic.Id}>
                          {topic.Name}
                        </Link>
                      ))
                    ) : (
                      <p className="dropdown-item">Không tìm thấy chủ đề nào</p>
                    )}


                  </div>
                </li>


              </ul>
              {/* <ul className="navbar-nav ml-md-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Get the app
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="http://example.com"
                    data-toggle="dropdown"
                  >
                    English
                  </a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#">
                      Russian
                    </a>
                    <a className="dropdown-item" href="#">
                      French
                    </a>
                    <a className="dropdown-item" href="#">
                      Spanish
                    </a>
                    <a className="dropdown-item" href="#">
                      Chinese
                    </a>
                  </div>
                </li>
              </ul> */}
            </div>{" "}
            {/* collapse .// */}
          </div>{" "}
          {/* container .// */}
        </nav>
      </header>{" "}
      {/* section-header.// */}
    </>
  );
};

export default Header;
