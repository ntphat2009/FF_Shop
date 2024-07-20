import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Thay đổi cách import
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';
const CheckOut = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [orderItem, setorderItem] = useState([]);
  const [cart, setCart] = useState([]);

  const createOrder = async (totalPrice) => {
    try {
      const response = await axios.post(`https://localhost:44389/api/payment/create-order?totalPrice=${totalPrice}`);
      const approvalUrl = response.data.approvalUrl;
      window.location.href = approvalUrl;
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  //formatPrice to vi
  const formatPrice = (number) => {
    return number.toLocaleString('vi-VN');
  };
  //navigate to result screen after checkout
  useEffect(() => {
    if (success) {
      navigate('/statuspayment');
    }
  }, [success, navigate]);


  //handle checkout buttom
  const [deliveryName, setDeliveryName] = useState('');
  const [deliveryGender, setDeliveryGender] = useState('');
  const [deliveryEmail, setDeliveryEmail] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [Note, setNote] = useState('');
 
  const handleCheckout = async (paymentMethod) => {
    try {
      setLoading(true);


      // Tạo đối tượng JSON chứa thông tin đơn hàng
      const orderData = {
        // deliveryName: user.firstName + user.lastName, // Thay bằng thông tin thực tế
        // deliveryGender: user.gender, // Thay bằng thông tin thực tế
        // deliveryEmail: user.email, // Thay bằng thông tin thực tế
        // deliveryPhone: user.phoneNumber, // Thay bằng thông tin thực tế
        // deliveryAddress: user.address + user.city, // Thay bằng thông tin thực tế
        deliveryName,
        deliveryGender,
        deliveryEmail,
        deliveryPhone,
        deliveryAddress,
        amount: getTotalPrice,
        Note,
        status: "Chờ thanh toán",
        userId: user.id,
        OrderItems: orderItem,

      };
      console.log("bbbbb", orderData)
      // Gửi yêu cầu POST đến API backend để tạo đơn hàng
      if (paymentMethod === "COD") {
        orderData.status = "Chưa thanh toán";
        const response = await fetch('https://localhost:44389/api/Order/checkoutCOD', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderData)
        });
        if (response.ok) {
          //orderData.status = "Chưa thanh toán";
          setSuccess(true);
          sessionStorage.removeItem('cart');
        } else {
          setError(`Có lỗi xảy ra khi tạo đơn hàng.`);
          console.log("data input", orderData)
        }
      } else {
        orderData.status = "Đã thanh toán Online";

        const response = await fetch('https://localhost:44389/api/Order/checkoutVnPay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        });
       

        if (response.ok) {
          const responseData = await response.json(); // Giải mã dữ liệu JSON từ phản hồi
          const redirectUrl = responseData.redirectUrl; // Truy cập trường redirectUrl từ dữ liệu JSON

          // Thực hiện redirect đến URL trả về từ API
          window.location.href = redirectUrl;
        

        } else {
          setError(`Có lỗi xảy ra khi tạo đơn hàng.`);
          console.log("data input", orderData)
        }
      }

    } catch (error) {
      setError('Có lỗi xảy ra khi kết nối đến máy chủ.');
    } finally {
      setLoading(false);
    }
  };
//End handle checkout buttom


  //get data cart
  useEffect(() => {
    const getCartData = async () => {
      try {

        //get data cart
        const existingCart = await sessionStorage.getItem('cart');
        const cartData = existingCart ? JSON.parse(existingCart) : [];
        setCart(cartData);
        const orderItems = cartData.map(item => ({
          ProductId: item.ProductId,
          ProductName: item.Name,
          Price: item.Price,
          Qty: item.quantity,
          Amount: item.quantity * item.Price,
        }));
        setorderItem(orderItems);

      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
      }
    };
    getCartData();
  }, []);
  const [user, setUser] = useState(null);
  //End get data cart
  // get information from user
  useEffect(() => {
    const fetchCustomerProfile = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Sử dụng sessionStorage
        if (token) {
          const decodedToken = jwtDecode(token);
          const response = await axios.get(`https://localhost:44389/api/Account/${decodedToken.email}`);
          setUser(response.data);
          console.log(response.data);
        } else {
          console.log('Không tìm thấy token');
        }
      } catch (error) {
        console.error('Error fetching customer profile:', error);
      }
    };
    fetchCustomerProfile();
  }, []);
  useEffect(() => {
    if (user) {
      setDeliveryName(`${user.firstName || ''} ${user.lastName || ''}`);
      setDeliveryGender(user.gender || '');
      setDeliveryEmail(user.email || '');
      setDeliveryPhone(user.phoneNumber || '');
      setDeliveryAddress(`${user.address || ''}, ${user.city || ''}`);
    }
  }, [user]);
//End get information from user

  const getTotalPrice = cart.reduce((total, item) => (total + (item.Price * item.quantity)), 0);

  const renderCartItem = (item) => (
    <tr key={item.ProductId}>
      <td>
        <figure className="itemside">

          <div className="aside"><img src={require(`../../../public/images/items/img/${item.Image}`)} className="img-sm" alt={item.Name} /></div>

          {/* <div className="aside"><img src={`http://localhost:3000/images/items/img/${item.Image}`} className="img-sm" alt={item.Name} /></div> */}
          <figcaption className="info">
            <a href="#" className="title text-dark">{item.Name} </a>
            <p className="text-muted small"> <br /> Brand: {item.BrandName}</p>
          </figcaption>
        </figure>
      </td>
      <td>
        <a href="#" className="title text-dark mx-4" >{item.quantity} </a>


      </td>
      <td>
        <div className="price-wrap">
          <var className="price">{formatPrice(item.Price)} VND</var>

          {/* <var className="price">{item.Price} VND</var> */}
          {/* <small className="text-muted"> {item.Price} each </small> */}
        </div>
      </td>

    </tr>
  );

  return (
    <div>
      <>
        {user != null ? (<section class="section-content padding-y">
          <div class="container" style={{ maxWidth: '720px' }}>
            {success == true ? (sessionStorage.removeItem('cart') && success && <div className="alert alert-success">Đơn hàng đã được đặt thành công!!!</div>) : (error && <div className="alert alert-danger">{error}</div>)}

            <div class="card mb-4">
              <div class="card-body">
                <div className="card">
                  <table className="table table-borderless table-shopping-cart">
                    <thead className="text-muted">
                      <tr className="small text-uppercase">
                        <th scope="col">Sản Phẩm</th>
                        <th scope="col" textAlign="center" width="120">Số lượng</th>
                        <th scope="col" width="150">Giá</th>

                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => renderCartItem(item))}

                    </tbody>
                  </table>
                </div>
                <h4 class="card-title mb-3">Delivery info</h4>

                {/* <div class="form-row">
                  <div class="form-group col-sm-6">
                    <label class="js-check box active">
                      <input type="radio" name="dostavka" value="option1" checked />
                      <h6 class="title">Standart delivery</h6>
                      <p class="text-muted">Free by airline within 20 days</p>
                    </label> 
                  </div>
                  <div class="form-group col-sm-6">
                    <label class="js-check box">
                      <input type="radio" name="dostavka" value="option1" />
                      <h6 class="title">Fast delivery</h6>
                      <p class="text-muted">Extra 20$ will be charged </p>
                    </label> 
                  </div>
                </div>  */}

                {/* <div class="form-row">
                  <div class="col form-group">
                    <h6 class="title">First name : {user.firstName}</h6>
                  </div> 
                  <div class="col form-group">
                    <h6 class="title">Last name : {user.lastName}</h6>
                  </div> 
                </div> 

                <div class="form-row">
                  <div class="col form-group">
                    <h6 class="title">Email : {user.email}</h6>
                  </div> 
                  <div class="col form-group">
                    <h6 class="title">Phone : {user.phoneNumber}</h6>
                  </div> 
                </div> 


                <div class="form-group">
                  <h6 class="title">Adress : {user.address}, {user.city}</h6>
                  
                </div>  */}
                <div class="form-row">
                  <div class="col form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Delivery Name"
                      value={deliveryName}
                      onChange={(e) => setDeliveryName(e.target.value)}
                    />
                  </div>
                  <div class="col form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Delivery Gender"
                      value={deliveryGender}
                      onChange={(e) => setDeliveryGender(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="col form-group">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Delivery Email"
                      value={deliveryEmail}
                      onChange={(e) => setDeliveryEmail(e.target.value)}
                    />
                  </div>
                  <div class="col form-group">
                    <input
                      type="tel"
                      class="form-control"
                      placeholder="Delivery Phone"
                      value={deliveryPhone}
                      onChange={(e) => setDeliveryPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Delivery Address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Ghi chú"
                    value={Note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
                <div>
                  <h6>Thành tiền : {formatPrice(getTotalPrice)} VND</h6>
                </div>

              </div>
            </div>


            <div class="card mb-4">
              <div class="card-body">
                <h4 class="card-title mb-4">Chọn phương thức thanh toán</h4>
                <input class="subscribe btn btn-info btn-block" type="button" onClick={() => handleCheckout("COD")} value="Thanh toán khi nhận hàng(COD)" />
                <input class="subscribe btn btn-info btn-block" type="button" onClick={() => handleCheckout("VNPay")} value="Thanh toán với VNPay" />


              </div>
            </div>


            <br />

          </div>
        </section>) : (
          <p>Loading...</p>
        )}


      </>
    </div>
  )
}



export default CheckOut