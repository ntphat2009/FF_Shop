import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { axios } from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    toast.loading('Vui lòng chờ');
    try {
      //step 1: in ForgotPassword storage token with the name is "usernameresetpass"
      const username = email; // Lấy chuỗi JWT thô
      sessionStorage.setItem('usernameresetpass', username); 
      const response = await fetch(`https://localhost:44389/api/Account/forgotPassword?email=${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      // toast.loading('Vui lòng chờ');
      
      if (!response.ok) {
        throw new Error('Đăng nhập thất bại, vui lòng kiểm tra lại email và mật khẩu.');
      }
      
      //response.token
      
      
      // Chuyển hướng người dùng đến trang chính
      // window.location.href = '/confirm-code';
      
      navigate("/confirm-code");
      
    } catch (error) {
      console.error('Lỗi:', error.message);
      toast.error('Tài khoản của bạn không tồn tại. Vui lòng kiểm tra lại tên đăng nhập');
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
      <h4 class="card-title mb-4">Quên mật khẩu</h4>
      <form onSubmit={handleLogin}>
      	 
          <div class="form-group">
			 <input name="" class="form-control" placeholder="Nhập tên đăng nhập" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
             <small class="form-text text-muted">Chúng tôi sẽ gửi mã xác thực đến email tài khoản của bạn ngay bây giờ!</small>

          </div> {/* form-group// */}
         
          
          
          <div class="form-group">
              <button type="submit" class="btn btn-info btn-block"> Gửi mã xác thực  </button>
          </div> {/* form-group// */}    
      </form>
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

export default ForgotPassword
