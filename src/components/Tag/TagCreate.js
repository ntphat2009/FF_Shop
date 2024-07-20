import axios from "axios";
import React, { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const TagCreate = () => {
  const token = localStorage.getItem('token');

  const [users,setUsers]=useState([]);
  const [tag, setTag] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    Name: "",
    Status:true,
    
  });
  // fetch data category && user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://localhost:44389/api/Account");
        const responseCate = await axios.get("https://localhost:44389/api/Tag");

        
        // const filteredCategories = response.data.filter(category => category.Status);
        // console.log(response.data)
        setUsers(response.data);
        setTag(responseCate.data);


      } catch (error) {
        console.error("Lỗi khi gọi API aaaaa:", error);
      }
    };

    fetchUsers();

    return () => {};
  }, []);
  // post data
  const createSlug = (str) => {
    return str
      .toLowerCase() // Chuyển đổi tất cả thành chữ thường
      .replace(/\s+/g, '-') // Thay thế dấu cách bằng dấu gạch ngang
      .replace(/[^\w\-]+/g, '') // Loại bỏ các ký tự không phải chữ cái, số, gạch ngang
      .replace(/\-\-+/g, '-') // Loại bỏ các dấu gạch ngang liên tiếp
      .replace(/^-+/, '') // Loại bỏ các dấu gạch ngang ở đầu chuỗi
      .replace(/-+$/, ''); // Loại bỏ các dấu gạch ngang ở cuối chuỗi
  };
  const navigate = useNavigate();
  const currentDate = new Date().toISOString();
  const [data, setData] = useState({
    Name: "",
    
    Status:true,
  
    
  
  });
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      Name: !data.Name ? "Vui lòng nhập tên thương hiệu." : "",
     
     
    });
  
    // Kiểm tra xem có lỗi không
    const hasError = Object.values(errors).some(error => error !== "");
    if (hasError) {
      // alert("Thất bại ")
    }
    
    try {
     
    
      const response = await axios.post(
        "https://localhost:44389/api/Tag/create-tag",
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 401) {
        toast.error("Vui lòng đăng nhập lại!")
        return
      }
      if (response.status === 403) {
        toast.error("Bạn chưa được cấp quyền này")
        return
      }
      if (response.status === 200) {
        toast.success("Thêm thành công!")
        window.location.href = "/admin/tag";

      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Vui lòng đăng nhập lại để tiếp tục!");
      }

      else if (error.response && error.response.status === 500) {
        setErrorMessage("Tên sản phẩm đã tồn tại. Vui lòng chọn tên khác.");
      } else {
        console.log('Lỗi khi gửi dữ liệu lên server:', error);
      }
    } finally {
    }
  };
  
  return (
    <div className="content-wrapper">
      <ToastContainer/>
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Trang quản lý thẻ [Tag]</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Tag</a>
                </li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        {/* Default box */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Tạo mới Tag</h3>
            <div className="card-tools">
              <Link to={`../admin/tag`} type="button" className="btn btn-success">
                <i class="fas fa-angle-double-left"> Quay lại danh sách</i>
              </Link>
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="collapse"
                title="Collapse"
              >
                <i className="fas fa-minus" />
              </button>
            </div>
          </div>
          <form className="ml-3" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="">Tên thẻ</label>
              <input
                type="name"
                className="form-control col-sm-5"
                id="e"
                value={data.Name}
                onChange={(e)=>setData({...data,Name:e.target.value})}
                aria-describedby=""
                placeholder="Nhập tên thẻ"
              />
             <p style={{ color: "red" }}>{errors.Name}</p>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
            
           
            <button className="btn btn-success" type="submit">Tạo mới</button>
          </form>
          {/* /.card-body */}
          {/* /.card-footer*/}
        </div>
        {/* /.card */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default TagCreate;
