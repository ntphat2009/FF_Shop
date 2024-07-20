import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';
const Content = () => {
  const [products, setProducts] = useState([]);
  const formatPrice = (number) => {
    return number.toLocaleString('vi-VN');
  };
  // const limitbrand = 3;

  const [brand, setBrand] = useState([]);
  const [banner, setBanner] = useState([]);
  const [dealProduct, setDeal] = useState([]);
  const [rcmProduct, setRecommend] = useState([]);

  // Sử dụng phương thức slice() để giới hạn số lượng sản phẩm
  const limitedProductsSale = dealProduct.slice(0, 4);
  const limitedbrand = brand.slice(0, 3);
  const limitedRcm= rcmProduct.slice(0,6); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://localhost:44389/api/Products');
        const filteredProduct = response.data.filter(pro => pro.Status);

        setProducts(filteredProduct);

        //setBrand
        const responseBrand = await axios.get(`https://localhost:44389/api/Brand`);
        const filteredBrand = responseBrand.data.filter(brand => brand.Status);
        setBrand(filteredBrand);

        //set banner
        const responseBanner = await axios.get(`https://localhost:44389/api/Banners`);
        const filteredBanner = responseBanner.data.filter(banner => banner.Status);
        setBanner(filteredBanner);

        //set deal product
        const responseDeal = await axios.get(`https://localhost:44389/api/Products/tag/1`);
        const filteredDeal = responseDeal.data.filter(dealProduct => dealProduct.Status);
        setDeal(filteredDeal);

        //set deal product
        const responseRecommend = await axios.get(`https://localhost:44389/api/Products/tag/4`);
        const filteredRecommend = responseRecommend.data.filter(rcmProduct => rcmProduct.Status);
        setRecommend(filteredRecommend);

      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    // Gọi hàm fetchProducts khi component được mount
    fetchProducts();

    // Cleanup function (không bắt buộc, nhưng tốt cho việc loại bỏ các thành phần đang lắng nghe khi component bị unmount)
    return () => {
      // Xóa bất kỳ subscriptions hoặc cleardown nào nếu cần
    };
  }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://localhost:44389/api/Category');
        const filterCate = response.data.filter(cate => cate.Status);

        setCategories(filterCate);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    // Gọi hàm fetchProducts khi component được mount
    fetchCategories();

    // Cleanup function (không bắt buộc, nhưng tốt cho việc loại bỏ các thành phần đang lắng nghe khi component bị unmount)
    return () => {
      // Xóa bất kỳ subscriptions hoặc cleardown nào nếu cần
    };
  }, []);
  return (
    <>
      <div className="container">
        {/* ========================= SECTION MAIN  ========================= */}
        <section className="section-main padding-y">
          <main className="card">
            <div className="card-body">
              <div className="row">
                <aside className="col-lg col-md-3 flex-lg-grow-0">
                  <h6>NGÀNH HÀNG</h6>
                  <nav className="nav-home-aside">
                    <ul className="menu-category">
                      {categories.map(category => (
                        <li key={category.Id}> {/* Sử dụng key để xác định phần tử duy nhất trong danh sách */}
                          <div class="text-wrap p-3">
                            <Link to={`/products/category/${category.Id}`} className="title text-default text-uppercase font-weight-bold">{category.Name}</Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </nav>

                </aside>{" "}
                {/* col.// */}
                <div className="col-md-9 col-xl-7 col-lg-7">
                  {/* ================== COMPONENT SLIDER  BOOTSTRAP  ==================  */}
                  <div
                    id="carousel1_indicator"
                    className="slider-home-banner carousel slide"
                    data-ride="carousel"
                  >
                    <ol className="carousel-indicators">
                      <li
                        data-target="#carousel1_indicator"
                        data-slide-to={0}
                        className="active"
                      />
                      <li data-target="#carousel1_indicator" data-slide-to={1} />
                      <li data-target="#carousel1_indicator" data-slide-to={2} />
                    </ol>
                    <div className="carousel-inner">
                      {banner && banner.length > 0 ? (banner.filter(banner => banner.Position = 1).map((slider, index) =>
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`}
                          key={slider.Id}>
                          <img src={require(`../../public/images/banners/${slider.Image}`)} alt={slider.Name} />
                        </div>
                      )) : (<div className="carousel-item active">
                        <img src="images/banners/slide1.jpg" alt="First slide" />
                      </div>)}

                    </div>
                    <a
                      className="carousel-control-prev"
                      href="#carousel1_indicator"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#carousel1_indicator"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                  {/* ==================  COMPONENT SLIDER BOOTSTRAP end.// ==================  .// */}
                </div>
                {/* col.// */}
                <div className="col-md d-none d-lg-block flex-grow-1">
                  <aside className="special-home-right">
                    <h6 className="bg-blue text-center text-white mb-0 p-2">
                      Thương hiệu
                    </h6>
                    {limitedbrand.map(brand => (
                      <div className="card-banner border-bottom">
                        <div className="py-3" style={{ width: "80%" }}>
                          <h6 className="card-title">{brand.Name}</h6>
                          <Link to={`/products/brand/${brand.Id}`} className="btn btn-secondary btn-sm"> {" "}
                            Source now{" "}</Link>

                        </div>
                        <img
                          src={require(`../../public/images/items/img/${brand.Image}`)}
                          height={80}
                          width={100}
                          className="img-bg"
                        />
                      </div>
                    ))}

                  </aside>
                </div>{" "}
                {/* col.// */}
              </div>{" "}
              {/* row.// */}
            </div>{" "}
            {/* card-body.// */}
          </main>{" "}
          {/* card.// */}
        </section>
        {/* ========================= SECTION MAIN END// ========================= */}
        {/* =============== SECTION DEAL =============== */}
        <section className="padding-bottom">
          <div className="card card-deal">
            <div className="col-heading content-body">
              <header className="section-heading">
                <h3 className="section-title mt-2">SẢN PHẨM GIẢM GIÁ</h3>
              </header>
              {/* <div className="timer">
                <div>
                  {" "}
                  <span className="num">04</span> <small>Days</small>
                </div>
                <div>
                  {" "}
                  <span className="num">12</span> <small>Hours</small>
                </div>
                <div>
                  {" "}
                  <span className="num">58</span> <small>Min</small>
                </div>
                <div>
                  {" "}
                  <span className="num">02</span> <small>Sec</small>
                </div>
              </div> */}
            </div>{" "}
            {/* col.// */}
            <div className="row no-gutters items-wrap">
              {limitedProductsSale.map(products => (
                <div className="col-md col-6" key={products.ProductId}>
                  <figure className="card-product-grid card-sm">
                    <Link to={`/products/${products.ProductId}`} className="img-wrap">
                      <img src={require(`../../public/images/items/img/${products.Image}`)} />

                    </Link>
                    <div class="text-wrap p-3">
                      <Link to={`/products/${products.ProductId}`} className="title">{products.Name}</Link>
                      {/* <span class="badge badge-danger"> -20% </span> */}
                    </div>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* =============== SECTION DEAL // END =============== */}
        {/* =============== SECTION Category =============== */}
        <section className="padding-bottom">
          <header className="section-heading heading-line">
            <h4 className="title-section text-uppercase">Ngành Hàng</h4>
          </header>
          <div className="card card-home-category">
            <div className="row no-gutters">
              <div className="col-md-3">
                <div className="home-category-banner bg-light-orange">
                  <h5 className="title">Tổng hợp các ngành hàng của chúng tôi</h5>
                  <p>
                    Hãy truy cập vào ngành hàng bạn tìm kiếm
                  </p>

                  <img src="images/items/2.jpg" className="img-bg" />
                </div>
              </div>{" "}
              {/* col.// */}
              <div className="col-md-9">
                <ul className="row no-gutters bordered-cols">
                  {categories && categories.length > 0 ? (categories.map(cate =>
                    <li className="col-6 col-lg-3 col-md-4" key={cate.Id}>
                      <Link to={`/products/category/${cate.Id}`} className="item">
                        <div className="card-body ">
                          <h6 className="title ">
                            {cate.Name}
                          </h6>
                          <img
                            className="img-sm float-right"
                            src={require(`../../public/images/items/img/${cate.Image}`)}
                          />
                          <p className="text-muted">
                            <i class="fas fa-pen-nib"></i> {cate.Description}
                          </p>
                        </div>
                      </Link>

                    </li>
                  )) : ("")}

                </ul>
              </div>{" "}
              {/* col.// */}
            </div>{" "}
            {/* row.// */}
          </div>{" "}
          {/* card.// */}
        </section>
        {/* =============== SECTION Category END =============== */}
        {/* =============== SECTION Brand =============== */}
        <section className="padding-bottom">
          <header className="section-heading heading-line">
            <h4 className="title-section text-uppercase">Thương hiệu</h4>
          </header>
          <div className="card card-home-category">
            <div className="row no-gutters">
              <div className="col-md-3">
                <div className="home-category-banner bg-light-orange">
                  <h5 className="title">Tổng hợp các thương hiệu chúng tôi được ủy quyền</h5>
                  <p>
                    Hãy truy cập vào thương hiệu bạn tìm kiếm
                  </p>

                  <img src="images/items/14.jpg" className="img-bg" />
                </div>
              </div>{" "}
              {/* col.// */}
              <div className="col-md-9">
                <ul className="row no-gutters bordered-cols">
                  {brand && brand.length > 0 ? (brand.map(brand =>
                    <li className="col-6 col-lg-3 col-md-4" key={brand.Id}>
                      <Link to={`/products/category/${brand.Id}`} className="item">
                        <div className="card-body">
                          <h6 className="title">
                            {brand.Name}
                          </h6>
                          <img
                            className="img-sm float-right"
                            style={{ objectFit: 'cover', height: '50px' }}
                            src={require(`../../public/images/items/img/${brand.Image}`)}
                          />
                          <p className="text-muted">
                            <i class="fas fa-pen-nib"></i> {brand.Description}
                          </p>
                        </div>
                      </Link>

                    </li>
                  )) : ("")}

                </ul>
              </div>{" "}

              {/* col.// */}
            </div>{" "}
            {/* row.// */}
          </div>{" "}
          {/* card.// */}
        </section>
        {/* =============== SECTION Brand END =============== */}
        {/* =============== SECTION REQUEST =============== */}
        {/* <section className="padding-bottom">
          <header className="section-heading heading-line">
            <h4 className="title-section text-uppercase">Request for Quotation</h4>
          </header>
          <div className="row">
            <div className="col-md-8">
              <div
                className="card-banner banner-quote overlay-gradient"
                style={{ backgroundImage: 'url("images/banners/banner9.jpg")' }}
              >
                <div className="card-img-overlay white">
                  <h3 className="card-title">
                    An easy way to send request to suppliers
                  </h3>
                  <p className="card-text" style={{ maxWidth: 400 }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt.
                  </p>
                  <a href="" className="btn btn-primary rounded-pill">
                    Learn more
                  </a>
                </div>
              </div>
            </div>{" "}
            <div className="col-md-4">
              <div className="card card-body">
                <h4 className="title py-3">One Request, Multiple Quotes</h4>
                <form>
                  <div className="form-group">
                    <input
                      className="form-control"
                      name=""
                      placeholder="What are you looking for?"
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        className="form-control"
                        placeholder="Quantity"
                        name=""
                        type="text"
                      />
                      <select className="custom-select form-control">
                        <option>Pieces</option>
                        <option>Litres</option>
                        <option>Tons</option>
                        <option>Gramms</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group text-muted">
                    <p>Select template type:</p>
                    <label className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue="option1"
                      />
                      <div className="form-check-label">Request price</div>
                    </label>
                    <label className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue="option2"
                      />
                      <div className="form-check-label">Request a sample</div>
                    </label>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-warning">Request for quote</button>
                  </div>
                </form>
              </div>
            </div>{" "}
          </div>{" "}
        </section> */}
        {/* =============== SECTION REQUEST .//END =============== */}
        {/* =============== SECTION ITEMS =============== */}
        <section className="padding-bottom-sm">
          <header className="section-heading heading-line">
            <h4 className="title-section text-uppercase">Sản phẩm được đề xuất</h4>
          </header>
          <div className="row row-sm">
            {limitedRcm && limitedRcm.length > 0 ? (limitedRcm.map(rcm => 
              <div className="col-xl-2 col-lg-3 col-md-4 col-6"  key={rcm.ProductId} >
                <Link to={`/products/${rcm.ProductId}`} className="card card-sm card-product-grid" >

                  <Link to={`/products/${rcm.ProductId}`} className="img-wrap">

                    <img src={require(`../../public/images/items/img/${rcm.Image}`)} />
                  </Link>
                  <figcaption className="info-wrap">
                    <Link to={`/products/${rcm.ProductId}`} className="title text-default text-truncate">

                      {rcm.Name}

                    </Link>
                    <Link to={`/products/category/${rcm.CategoryId}`} className="text-muted mt-1 d-block text-truncate">Thương hiệu: {rcm.BrandName}</Link>
                    <Link to={`/products/brand/${rcm.BrandId}`} className="text-muted mt-1 text-truncate">Ngành hàng : {rcm.CategoryName}</Link>

                    <div className="price mt-2">{formatPrice(rcm.Price)} VND</div> {/* price-wrap.// */}
                  </figcaption>
                  </Link>
               
              </div>
            )) : ("aaa")}
          
          </div>{" "}
        </section>
        <section className="padding-bottom">
         <header className="section-heading heading-line">
            <h4 className="title-section text-uppercase"></h4>
        </header>
          {/*
          <ul className="row mt-4">
            <li className="col-md col-6">
              <a href="#" className="icontext">
                {" "}
                <img
                  className="icon-flag-sm"
                  src="images/icons/flags/CN.png"
                />{" "}
                <span>China</span>{" "}
              </a>
            </li>
            <li className="col-md col-6">
              <a href="#" className="icontext">
                {" "}
                <img
                  className="icon-flag-sm"
                  src="images/icons/flags/DE.png"
                />{" "}
                <span>Germany</span>{" "}
              </a>
            </li>
            <li className="col-md col-6">
              <a href="#" className="icontext">
                {" "}
                <img
                  className="icon-flag-sm"
                  src="images/icons/flags/AU.png"
                />{" "}
                <span>Australia</span>{" "}
              </a>
            </li>
            <li className="col-md col-6">
              <a href="#" className="icontext">
                {" "}
                <img
                  className="icon-flag-sm"
                  src="images/icons/flags/RU.png"
                />{" "}
                <span>Russia</span>{" "}
              </a>
            </li>
            <li className="col-md col-6">
              <a href="#" className="icontext">
                {" "}
                <img
                  className="icon-flag-sm"
                  src="images/icons/flags/IN.png"
                />{" "}
                <span>India</span>{" "}
              </a>
            </li>
            <li className="col-md col-6">
              <a href="#" className="icontext">
                {" "}
                <img
                  className="icon-flag-sm"
                  src="images/icons/flags/GB.png"
                />{" "}
                <span>England</span>{" "}
              </a>
            </li>
            <li className="col-md col-6">
              <a href="#" className="icontext">
                {" "}
                <img
                  className="icon-flag-sm"
                  src="images/icons/flags/TR.png"
                />{" "}
                <span>Turkey</span>{" "}
              </a>
            </li>
            <li className="col-md col-6">
              <a href="#" className="icontext">
                {" "}
                <img
                  className="icon-flag-sm"
                  src="images/icons/flags/UZ.png"
                />{" "}
                <span>Uzbekistan</span>{" "}
              </a>
            </li>
            <li className="col-md col-6">
              <a href="#" className="icontext">
                {" "}
                <i className="mr-3 fa fa-ellipsis-h" /> <span>More regions</span>{" "}
              </a>
            </li>
          </ul> */}
        </section>
        <article className="my-4">
          <img src="images/banners/ad-sm.png" className="w-100" />
        </article>
      </div>
      <section className="section-subscribe padding-y-lg">
        <div className="container">
          <p className="pb-2 text-center text-white">
            Delivering the latest product trends and industry news straight to your
            inbox
          </p>
          <div className="row justify-content-md-center">
            <div className="col-lg-5 col-md-6">
              <form className="form-row">
                <div className="col-md-8 col-7">
                  <input
                    className="form-control border-0"
                    placeholder="Your Email"
                    type="email"
                  />
                </div>{" "}
                <div className="col-md-4 col-5">
                  <button type="submit" className="btn btn-block btn-info">
                    <i className="fa fa-envelope" /> Subscribe{" "}
                  </button>
                </div>{" "}
              </form>
              <small className="form-text text-white-50">
                We’ll never share your email address with a third-party.{" "}
              </small>
            </div>{" "}
          </div>
        </div>
      </section>
    </>
  )
}
export default Content