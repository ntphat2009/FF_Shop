import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom'
const RequestStatusPayment = () => {
  const [responseCode, setResponseCode] = useState(null);
  const [orderid, setOrderId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const amount = params.get('vnp_Amount');
    //const orderId = params.get('vnp_TxnRef');
    const orderInfo  = params.get('vnp_OrderInfo');
    const orderId = orderInfo ? orderInfo.split(':')[1].trim() : '';// Lấy phần sau dấu ':' của chuỗi
setOrderId(orderId);
    console.log('Order ID:', orderId.trim()); 
    const responseCode = params.get('vnp_ResponseCode');
    setResponseCode(responseCode)
    console.log('Amount:', amount);
    console.log('Order ID:', orderId);
    console.log('orderInfo:', orderInfo);

    console.log('Response Code:', responseCode);

    if (responseCode === '00') {
      
      sessionStorage.removeItem('cart');
    } else {
      console.error('Payment failed with response code:', responseCode);
    }
  }, []);
  return (
    <div>
      
        <div class="container" style={{ maxWidth: '1000px' }}>
        {responseCode === '00' && (
          <><div style={{ margin: '80px', fontSize: "20px" }} className="alert alert-success">
            Đơn hàng đã được đặt thành công!
          </div><Link to={`/order/${orderid}`} style={{ margin: '20px', marginLeft: "280px", width: "400px" }} className="btn btn-light"> <i className="fa fa-eye"></i> Xem đơn hàng </Link></>

        )}
        {responseCode === '24' && (
          <div style={{ margin: '80px', fontSize: "20px" }} className="alert alert-danger">
            Giao dịch bị hủy
          </div>
        )}
          {responseCode === '07' && (
          <div style={{ margin: '80px', fontSize: "20px" }} className="alert alert-danger">
            Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).
          </div>
        )}
         {responseCode === '09' && (
          <div style={{ margin: '80px', fontSize: "20px" }} className="alert alert-danger">
            Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.
          </div>
        )}
         {responseCode === '10' && (
          <div style={{ margin: '80px', fontSize: "20px" }} className="alert alert-danger">
            Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần
          </div>
        )}
        {responseCode === '11' && (
          <div style={{ margin: '80px', fontSize: "20px" }} className="alert alert-danger">
           Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.
          </div>
        )}
        {responseCode === '12' && (
          <div style={{ margin: '80px', fontSize: "20px" }} className="alert alert-danger">
            Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.
          </div>
        )}
        {responseCode === '51' && (
          <div style={{ margin: '80px', fontSize: "20px" }} className="alert alert-danger">
            Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.
          </div>
        )}

         <Link to={"/"} style={{ margin: '20px',marginLeft:"280px",width:"400px" }} className="btn btn-light"> <i className="fa fa-home"></i> Trở vể trang chủ</Link>

    </div>
   
    </div>

  )
}

export default RequestStatusPayment
