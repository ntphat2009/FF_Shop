import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';
const ResetPassword = () => {
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  // const [token, setToken] = useState('');
  const email = sessionStorage.getItem('usernamecfcode'); // use sessionStorage at step 1
  const handleLogin = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error("Mật khẩu và xác nhận mật khẩu không khớp");
      return;
    }
    try {
      const response = await fetch('https://localhost:44389/api/Account/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, confirmpassword })
      });

      if (!response.ok) {
        throw new Error('Đăng nhập thất bại, vui lòng kiểm tra lại email và mật khẩu.');
      }

      //   const token = await response.text(); // Lấy chuỗi JWT thô
      //   sessionStorage.setItem('token', token); // Lưu vào sessionStorage

      // Chuyển hướng người dùng đến trang chính
      sessionStorage.removeItem('usernamecfcode');
      window.location.href = '/signin';
      alert('Thay đổi mật khẩu thành công!');
    } catch (error) {
      console.error('Lỗi:', error.message);
      alert('Mã xác thực không chính xác');
    }
  };
  return (
    <div>
      <><ToastContainer />
        <section class="section-conten padding-y" style={{ minHeight: "84vh" }}>
        
          {/* ============================ COMPONENT LOGIN   ================================= */}
          <div class="card mx-auto" style={{ maxWidth: "380px", marginTop: "100px" }}>
            <div class="card-body">
            
              <h4 class="card-title mb-4">Thay đổi mật khẩu</h4>
              <form onSubmit={handleLogin}>


                <div class="form-group">
                  <input name="" class="form-control" placeholder="Mật khẩu" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div> {/* form-group// */}
                <div class="form-group">
                  <input name="" class="form-control" placeholder="Nhập lại mật khẩu" type="password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div> {/* form-group// */}



                <div class="form-group">
                  <button type="submit" class="btn btn-info btn-block"> Xác nhận </button>
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

export default ResetPassword
