import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 
import { Link, useNavigate } from 'react-router-dom';

const Order = () => {
  const [product, setProduct] = useState([]);
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerProfile = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Sử dụng sessionStorage
        if (token) {
          const decodedToken = jwtDecode(token);
          const response = await axios.get(`https://localhost:44389/api/Account/${decodedToken.email}`);
          setUser(response.data);
        } else {
          console.log('Không tìm thấy token');
          navigate('/signin');
        }
      } catch (error) {
        console.error('Error fetching customer profile:', error);
      }
    };
    fetchCustomerProfile();
  }, [navigate]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("https://localhost:44389/api/Products");
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProduct();
  }, []); // Added empty dependency array to fetch products only once

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        if (user && user.id) {
          const response = await axios.get(`https://localhost:44389/api/Order/userid?id=${user.id}`);
          setOrder(response.data);
        }
      } catch (error) {
        console.error("Error fetching order list:", error);
      }
    };
    fetchOrderList();
  }, [user]); // Chỉ gọi fetchOrderList khi user thay đổi và user.id có giá trị

  const formatPrice = (number) => {
    return number.toLocaleString('vi-VN');
  };

  const renderProductDetails = (productId) => {
    const productDetails = product.find(p => p.ProductId === productId);
    if (productDetails) {
      return (
        <div>
          <figure className="itemside">
            <div className="aside">
              <img src={require(`../../../public/images/items/img/${productDetails.Image}`)} className="img-sm" alt={productDetails.Name} />
            </div>
            <figcaption className="info">
              <a href="#" className="title text-dark">{productDetails.Name}</a>
              <p className="text-muted small"><br /> Brand: {productDetails.BrandName}</p>
            </figcaption>
          </figure>
        </div>
      );
    }
    return <p>Product not found.</p>;
  };

  // Sort the orders by id in descending order
  const sortedOrders = [...order].sort((a, b) => b.id - a.id);

  return (
    <div>
      {sortedOrders && sortedOrders.length > 0 ? (
        <section className="section-content padding-y">
          <div className="container">
            {sortedOrders.map(orderItem => (
              <React.Fragment key={orderItem.id}>
                {orderItem.OrderDetails && orderItem.OrderDetails.length > 0 ? (
                  <>
                    <div className="card">
                      <table className="table table-borderless table-shopping-cart">
                        <thead className="text-muted">
                          <tr className="small text-uppercase">
                            <th scope="col">Sản Phẩm</th>
                            <th scope="col" width="200">Số lượng</th>
                            <th scope="col" width="120">Giá</th>
                            <th scope="col" className="text-right" width="200"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderItem.OrderDetails.map(orderDetail => (
                            <tr key={orderDetail.id}>
                              <td>
                                {renderProductDetails(orderDetail.ProductId)}
                              </td>
                              <td>
                                <div className="price-wrap">
                                  <p className="price">{orderDetail.Qty}</p>
                                </div>
                              </td>
                              <td style={{ width: "190px" }}>
                                <div className="price-wrap">
                                  <p className="price text-6">{formatPrice(orderDetail.Amount)} VNĐ</p>
                                </div>
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td><strong>Ghi chú: {orderItem.Note}</strong></td>
                            <td><strong>Tình trạng: {orderItem.Status}</strong></td>
                            <td><strong>Mã đơn: {orderItem.OrderDetails[0].OrderId}</strong></td>
                            <td><Link to={`/order/${orderItem.OrderDetails[0].OrderId}`} className='btn btn-light'>Chi tiết<i className="fas fa-angle-right"></i></Link></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <tr>
                    <td colSpan="4">No order details found.</td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            <Link to={"/"} className="btn btn-primary mt-5"><i className="fas fa-angle-left"></i> Trở về</Link>
          </div>
        </section>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Order;
