
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [post, setPost] = useState([]);

  const [quantity, setQuantity] = useState(1); // Quản lý trạng thái số lượng sản phẩm

  const formatPrice = (number) => {
    return number.toLocaleString('vi-VN');
  };
  //render data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:44389/api/Products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchProduct();
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://localhost:44389/api/Post`);
        const filteredPost = response.data.filter(items => items.Status);

        setPost(filteredPost);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };
    fetchPost();
    return () => {
    };
  }, [id]);
  //end render data

  //add to cart
  const addToCart = async () => {
    try {
      const existingCart = await sessionStorage.getItem('cart');
      const cart = existingCart ? JSON.parse(existingCart) : [];

      const existingItemIndex = cart.findIndex((cartItem) => cartItem.ProductId === product.ProductId);

      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
      } else {
        cart.push({ ...product, quantity });
      }

      await sessionStorage.setItem('cart', JSON.stringify(cart));
      toast.success('Sản phẩm đã được thêm vào giỏ hàng!');
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
    }
  };
  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  //end add to cart 
  //TruncateText
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Chia đoạn văn bản thành các dòng và giới hạn số dòng
  //end TruncateText
  if (!product) {
    return <div>Loading...</div>;
  }
  // Chia đoạn văn bản thành các dòng và giới hạn số dòng

  return (
    <div>
      <>
        <ToastContainer />
        <section className="py-3 bg-light">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
              <li className="breadcrumb-item"><a href="">{product.CategoryName}</a></li>

              <li className="breadcrumb-item active" aria-current="page">{product.Name}</li>
            </ol>
          </div>
        </section>
        {/* ========================= SECTION CONTENT ========================= */}
        <section className="section-content bg-white padding-y">
          <div className="container">
            {/* ============================ ITEM DETAIL ======================== */}
            <div className="row">
              <aside className="col-md-6">
                <div className="card">
                  <article className="gallery-wrap">
                    <div className="img-big-wrap">
                      <div> <a href="#">
                        {/* <img src={process.env.PUBLIC_URL + '/images/items/15.jpg'}/> */}
                        <img src={require(`../../../public/images/items/img/${product.Image}`)} />

                      </a></div>
                    </div> {/* slider-product.// */}
                    {/* <div className="thumbs-wrap">
                <a href="#" className="item-thumb"> <img src={process.env.PUBLIC_URL + '/images/items/15.jpg'}/></a>
                <a href="#" className="item-thumb"> <img src={process.env.PUBLIC_URL + '/images/items/15.jpg'} /></a>
                <a href="#" className="item-thumb"> <img src={process.env.PUBLIC_URL + '/images/items/15.jpg'} /></a>
                <a href="#" className="item-thumb"> <img src={process.env.PUBLIC_URL + '/images/items/15.jpg'} /></a>
              </div>  */}
                  </article> {/* gallery-wrap .end// */}
                </div> {/* card.// */}
              </aside>
              <main className="col-md-6">
                <article className="product-info-aside">
                  <h2 className="title mt-3">{product.Name}</h2>
                  <div className="rating-wrap my-3">
                    <ul className="rating-stars">
                      <li style={{ width: '80%' }} className="stars-active">
                        <i className="fa fa-star" /> <i className="fa fa-star" />
                        <i className="fa fa-star" /> <i className="fa fa-star" />
                        <i className="fa fa-star" />
                      </li>
                      <li>
                        <i className="fa fa-star" /> <i className="fa fa-star" />
                        <i className="fa fa-star" /> <i className="fa fa-star" />
                        <i className="fa fa-star" />
                      </li>
                    </ul>
                    <small className="label-rating text-muted">132 reviews</small>
                    <small className="label-rating text-success"> <i className="fa fa-clipboard-check" /> 154 orders </small>
                  </div> {/* rating-wrap.// */}
                  <div className="mb-3">
                    <var className="price h4"> {formatPrice(product.Price)} VND </var>
                    {/* <span className="text-muted">USD 562.65 incl. VAT</span>  */}
                  </div> {/* price-detail-wrap .// */}
                  {/* <p>{product.Description} </p> */}
                  {/* <dl className="row">
              <dt className="col-sm-3">Manufacturer</dt>
              <dd className="col-sm-9"><a href="#">Great textile Ltd.</a></dd>
              <dt className="col-sm-3">Article number</dt>
              <dd className="col-sm-9">596 065</dd>
              <dt className="col-sm-3">Guarantee</dt>
              <dd className="col-sm-9">2 year</dd>
              <dt className="col-sm-3">Delivery time</dt>
              <dd className="col-sm-9">3-4 days</dd>
              <dt className="col-sm-3">Availabilty</dt>
              <dd className="col-sm-9">in Stock</dd>
            </dl> */}
                  <ul className="list-check">
                    <li>Màu sắc : {product.Color}</li>

                    <li>Chất liệu :  {product.Material}</li>
                    <li>Cao : {product.Height}</li>
                    <li>Rộng : {product.Width}</li>
                    <li>Chính sách cho sản phẩn : {product.Policy}</li>


                  </ul>
                  <div className="form-row  mt-4">
                    <div className="form-group col-md flex-grow-0">
                      <div className="input-group mb-3 input-spinner">
                        <div className="input-group-prepend">
                          <button onClick={handleIncrease} className="btn btn-light" type="button" id="button-plus"> + </button>
                        </div>
                        <input type="text" className="form-control" value={quantity} />
                        <div className="input-group-append">
                          <button onClick={handleDecrease} className="btn btn-light" type="button" id="button-minus"> − </button>
                        </div>
                      </div>
                    </div> {/* col.// */}
                    <div className="form-group col-md">
                      <button onClick={addToCart} className="btn  btn-info">
                        <i className="fas fa-shopping-cart" /> <span className="text">Thêm vào giỏ hàng</span>
                      </button>

                      <a href="#" className="btn btn-light">
                        <i className="fas fa-envelope" /> <span className="text">Liên hệ hỗ trợ</span>
                      </a>
                    </div> {/* col.// */}
                  </div> {/* row.// */}
                </article> {/* product-info-aside .// */}
              </main> {/* col.// */}
            </div> {/* row.// */}
            {/* ================ ITEM DETAIL END .// ================= */}
          </div> {/* container .//  */}
        </section>
        {/* ========================= SECTION CONTENT END// ========================= */}
        {/* ========================= SECTION  ========================= */}
        <section className="section-name padding-y bg">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <h5 className="font-weight-bolder text-center text-danger ">Đặc điểm nổi bật</h5>
                <p className='text-capitalize font-weight-bold'>
                  {product.ShortDesc}
                </p>
                <div className="img-big-wrap" >
                  <div>
                    {product.ImageDes ? ( <img style={{ width: '100%' }} src={require(`../../../public/images/items/img/${product.ImageDes}`)} />):("")}
                    {/* <img src={process.env.PUBLIC_URL + '/images/items/15.jpg'}/> */}
                   
                  </div>
                </div>
                {/* <p className='text-capitalize text-wrap mt-4'>
                    {product.Description}
                  </p> */}
                <p className='text-capitalize text-wrap mt-4'>
                  
                  {showFullDescription ? product?.Description : `${product?.Description.slice(0, 1070)}...`}
                </p>
               

                
                <button className='btn btn-outline-info ' style={{ margin: '20px',marginLeft:"250px",width:"400px" }} onClick={toggleDescription}>
                  {showFullDescription ? 
                                  <i class="fas fa-angle-double-up fa-lg">{" "} Thu gọn</i>
                                  : 
                                  <i class="fas fa-angle-double-down fa-lg">{" "} Xem Thêm</i>}
                </button>
              </div>
               {/* col.// */}
              <aside className="col-md-4">
                {/* <h5 className="title-description">Specifications</h5> */}
                {/* <table className="table table-bordered">
                  <tbody><tr> <th colSpan={2}>Basic specs</th> </tr>
                    <tr> <td>Type of energy</td><td>Lava stone</td> </tr>
                    <tr> <td>Number of zones</td><td>2</td> </tr>
                    <tr> <td>Automatic connection	</td> <td> <i className="fa fa-check text-success" /> Yes </td></tr>
                    <tr> <th colSpan={2}>Dimensions</th> </tr>
                    <tr> <td>Width</td><td>500mm</td> </tr>
                    <tr> <td>Depth</td><td>400mm</td> </tr>
                    <tr> <td>Height	</td><td>700mm</td> </tr>
                    <tr> <th colSpan={2}>Materials</th> </tr>
                    <tr> <td>Exterior</td><td>Stainless steel</td> </tr>
                    <tr> <td>Interior</td><td>Iron</td> </tr>
                    <tr> <th colSpan={2}>Connections</th> </tr>
                    <tr> <td>Heating Type</td><td>Gas</td> </tr>
                    <tr> <td>Connected load gas</td><td>15 Kw</td> </tr>
                  </tbody></table> */}
                <div className="box">
                  <h5 className="title-description font-weight-bold"><i className="fab fa-usps" />Tin tức về sản phẩm</h5>
                  <br></br>
                  {post && post.length > 0 ? (
                    post.map(post => (
                      <article className="media mb-3">
                        <Link to={`/topic/post/${post.Id}`}>
                          <img className="img-sm mr-3" src={require(`../../../public/images/items/img/${post.Image}`)} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        </Link>
                        <div className="media-body">
                          <Link to={`/topic/post/${post.Id}`}>
                            <h6 className="mt-0">{post.Title}</h6>
                          </Link>

                        </div>
                      </article>
                    ))
                  ) : (
                    "Không có tin tức để hiển thị"
                  )}
                </div>
                {/* box.// */}
              </aside> {/* col.// */}
            </div> {/* row.// */}
          </div> {/* container .//  */}
        </section>
        {/* ========================= SECTION CONTENT END// ========================= */}
        {/* ========================= SECTION SUBSCRIBE  ========================= */}
        <section className="padding-y-lg bg-light border-top">
          <div className="container">
            <p className="pb-2 text-center">Delivering the latest product trends and industry news straight to your inbox</p>
            <div className="row justify-content-md-center">
              <div className="col-lg-4 col-sm-6">
                <form className="form-row">
                  <div className="col-8">
                    <input className="form-control" placeholder="Your Email" type="email" />
                  </div> {/* col.// */}
                  <div className="col-4">
                    <button type="submit" className="btn btn-block btn-warning"> <i className="fa fa-envelope" /> Subscribe </button>
                  </div> {/* col.// */}
                </form>
                <small className="form-text">We’ll never share your email address with a third-party. </small>
              </div> {/* col-md-6.// */}
            </div>
          </div>
        </section>
        {/* ========================= SECTION SUBSCRIBE END// ========================= */}

      </>
    </div>
  )
}

export default DetailProduct