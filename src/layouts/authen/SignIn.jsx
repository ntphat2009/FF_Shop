import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from 'react-google-login';
import {gapi} from 'gapi-script';
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const ClientId="239534240798-mo10lhif5jj1le3gvvfnlosiosapfbmb.apps.googleusercontent.com";
  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId:ClientId,
        scrop:""
      })
    };
    gapi.load('client:auth2',start)
  })

const handleLoginSuccess = async (response) => {
  const token = response.tokenId;
  // console.log('Token ID:', token);
  try {
      const apiResponse = await axios.post('https://localhost:44389/api/auth/google', 
          { token }, // Gửi token trong một đối tượng JSON
          {
              headers: {
                  'Content-Type': 'application/json'
              }
          }
      );
      console.log('Success to login', response.profileObj);
      console.log('Email', response.profileObj.email);
      // Nhận token từ API phản hồi và lưu vào sessionStorage
      sessionStorage.setItem('token', token);
      window.location.href = '/';
  } catch (error) {
      if (error.response && error.response.status === 500) {
          toast.error("Email này đã được sử dụng để đăng ký. Vui lòng sử dụng tài khoản Google khác!");
      } else {
          toast.error("Đã có lỗi xảy ra khi đăng nhập bằng Google!");
      }
  }
};

const handleLoginFailure = (response) => {
    console.log('Failed to login', response);
};

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://localhost:44389/api/Account/SignIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        throw new Error('Đăng nhập thất bại, vui lòng kiểm tra lại email và mật khẩu.');
      }
      
      const token = await response.text(); // Lấy chuỗi JWT thô
      sessionStorage.setItem('token', token); // Lưu vào sessionStorage
      
      // Chuyển hướng người dùng đến trang chính
      window.location.href = '/';
      // alert('Đăng nhập thành công!');
    } catch (error) {
      console.error('Lỗi:', error.message);
      toast.error("Đăng nhập thất bại, vui lòng kiểm tra lại email và mật khẩu.")
     
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
      <h4 class="card-title mb-4">Đăng nhập</h4>
      <GoogleLogin
            className="btn btn-danger btn-block mb-4 bg-danger"
            clientId={ClientId}
            buttonText="Đăng nhập bằng Google"
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={false}
        />
      <form onSubmit={handleLogin}>
      	  {/* <a href="#" class="btn btn-facebook btn-block mb-2"> <i class="fab fa-facebook-f"></i> &nbsp  Đăng nhập bằng Facebook</a>
      	  {/* <a href="#" class="btn btn-google btn-block mb-4"> <i class="fab fa-google"></i> &nbsp Đăng nhập bằng Google</a> */}
        
          <div class="form-group">
			 <input name="" class="form-control" placeholder="Tên đăng nhập..." type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div> {/* form-group// */}
          <div class="form-group">
			<input name="" class="form-control" placeholder="Mật khẩu..." type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div> {/* form-group// */}
          
          <div class="form-group">
          	<a href="/forgotpassword" class="float-right">Quên mật khẩu?</a> 
            <label class="float-left custom-control custom-checkbox"> <input type="checkbox" class="custom-control-input" checked=""/> <div class="custom-control-label"> Nhớ tài khoản </div> </label>
          </div> {/* form-group form-check .// */}
          <div class="form-group">
              <button type="submit" class="btn btn-info btn-block"> Đăng nhập  </button>
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

export default SignIn
