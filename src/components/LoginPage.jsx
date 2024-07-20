import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      // sessionStorage.setItem('token', token); // Lưu vào sessionStorage
      localStorage.setItem('token', token);
      // try {
      //   localStorage.setItem('token', token);
      // } catch (error) {
      //   console.error('Không thể lưu token vào localStorage:', error);
      // }
      // Chuyển hướng người dùng đến trang chính
      navigate("/");
      toast.success('Đăng nhập thành công!');
    } catch (error) {
      console.error('Lỗi:', error.message);
      toast.error('Đăng nhập thất bại, vui lòng kiểm tra lại email và mật khẩu.');
    }
  };

  return (
    <div>
      <>
        <ToastContainer />
        <section className="section-conten padding-y" style={{ minHeight: "84vh" }}>
          <div className="card mx-auto" style={{ maxWidth: "380px", marginTop: "100px" }}>
            <div className="card-body">
              <h4 className="card-title mb-4">Đăng nhập</h4>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <input name="" className="form-control" placeholder="Username" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <input name="" className="form-control" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                  <Link to="/forgotpassword" className="float-right">Quên mật khẩu?</Link>
                  <label className="float-left custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" defaultChecked={false} /> 
                    <div className="custom-control-label"> Nhớ tài khoản </div>
                  </label>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block"> Đăng nhập </button>
                </div>
              </form>
            </div>
          </div>
          <br />
        </section>
      </>
    </div>
  )
}

export default LoginPage;
