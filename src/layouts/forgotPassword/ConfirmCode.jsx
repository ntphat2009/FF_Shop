import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const ConfirmCode = () => {

  const [code, setCode] = useState('');
  const email = sessionStorage.getItem('usernameresetpass'); // use sessionStorage at step 1

  const handleReSend = async () => {
    
    
    try {
      //step 1: in ForgotPassword storage token with the name is "usernameresetpass"
      // const username = email; // Lấy chuỗi JWT thô
      // sessionStorage.setItem('usernameresetpass', username); 
      const response = await fetch(`https://localhost:44389/api/Account/forgotPassword?email=${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      if (!response.ok) {
        throw new Error('Đăng nhập thất bại, vui lòng kiểm tra lại email và mật khẩu.');
      }
      
      //response.token
      
      
      // Chuyển hướng người dùng đến trang chính
      toast.success('Mã xác nhận đã được gửi lại!');
    } catch (error) {
      console.error('Lỗi:', error.message);
      alert('Tài khoản của bạn không tồn tại.');
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://localhost:44389/api/Account/confirm-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, code })
      });
      
      if (!response.ok) {
        throw new Error('Mã code không được tìm thấy');
      }
    //step 2: in ConfirmCode storage token with the name is "usernamecfcode" and delete token usernameresetpass
    const usernamecfcode = email; 
    sessionStorage.setItem('usernamecfcode', usernamecfcode); // Lưu vào sessionStorage
    sessionStorage.removeItem('usernameresetpass');
      // Chuyển hướng người dùng đến trang chính
      window.location.href = '/resetpassword';
      toast.success('Đã xác thực!');

    } catch (error) {
      console.error('Lỗi:', error.message);
      toast.error('Mã xác thực không chính xác!');

    }
  };
  return (
    <div>
      <>
      <ToastContainer/>
      <section class="section-conten padding-y" style={{minHeight:"84vh"}}>

{/* ============================ COMPONENT LOGIN   ================================= */}
	<div class="card mx-auto" style={{maxWidth: "380px", marginTop:"100px"}}>
      <div class="card-body">
      <h4 class="card-title mb-4">Xác nhận người dùng</h4>
      <form onSubmit={handleLogin}>
      	 
         
          <div class="form-group">
			<input name="" class="form-control" placeholder="Mã xác thực" type="text" value={code} onChange={(e) => setCode(e.target.value)}/>
          </div> {/* form-group// */}
          <small class="form-text text-muted">Nhập mã xác thực được gửi đến email của bạn để xác nhận thay đổi mật khẩu!</small>
          
         
          <div class="form-group">
              <button type="submit" class="btn btn-info btn-block mt-4"> Xác nhận </button>
          </div> {/* form-group// */}    
      </form>
      <a class="float-left mt-4 btn btn-outline-light" style={{borderStyle:"none",color:"black"}} href="/forgotpassword">Quay về</a>
      <button class="float-right mt-4 btn btn-outline-light" style={{borderStyle:"none",color:"black"}} onClick={handleReSend}>Gửi lại </button>
      </div> {/* card-body.// */}
    </div> {/* card .// */}

     <p class="text-center mt-4">Bạn chưa có tài khoản? <a href="/signup">Đăng ký</a></p>
     <br></br>
{/* ============================ COMPONENT LOGIN  END.// ================================= */}


</section>
      </>
    </div>
  )
}

export default ConfirmCode
