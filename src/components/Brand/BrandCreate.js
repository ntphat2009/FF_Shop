import axios from "axios";
import React, { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const BrandCreate = () => {
  const token = localStorage.getItem('token');

  const [users,setUsers]=useState([]);
  const [brand, setBrand] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    Name: "",
    Description: "",
    CreatedById: "",
    UpdatedById: ""
  });
  // fetch data category && user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://localhost:44389/api/Account");
        const responseCate = await axios.get("https://localhost:44389/api/Brand");

        
        // const filteredCategories = response.data.filter(category => category.Status);
        // console.log(response.data)
        setUsers(response.data);
        setBrand(responseCate.data);


      } catch (error) {
        console.error("Lỗi khi gọi API aaaaa:", error);
      }
    };

    fetchUsers();

    return () => {};
  }, []);
  // post data
  const navigate = useNavigate();
  const currentDate = new Date().toISOString();
  const [data, setData] = useState({
    Name: "",
    Description: "",
    Status:true,
    Image:"",
    CreatedById:"",
    UpdatedById:"",

    ParentId:null,
    Created_At: currentDate,
    Updated_At: currentDate
  });
  const handleImageChange = (e) => {
    setBrand({
      ...brand,
      Image: e.target.files[0].name,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      Name: !data.Name ? "Vui lòng nhập tên thương hiệu." : "",
      Description: !data.Description ? "Vui lòng nhập mô tả ." : "",
     
      CreatedById: !data.CreatedById ? "Vui lòng chọn người tạo." : "",
      UpdatedById: !data.UpdatedById ? "Vui lòng chọn người cập nhật." : "",
     
    });
  
    // Kiểm tra xem có lỗi không
    const hasError = Object.values(errors).some(error => error !== "");
    if (hasError) {
      // alert("Thất bại ")
    }
    try {
      const response = await axios.post(
        "https://localhost:44389/api/Brand",
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
        window.location.href = "/admin/brand";

      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Vui lòng đăng nhập lại để tiếp tục!");
      }

      else
      if (error.response && error.response.status === 500) {
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
              <h1>Trang quản lý thương hiệu [Brand]</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Thương hiệu</a>
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
            <h3 className="card-title">Tạo mới thương hiệu</h3>
            <div className="card-tools">
              <Link to={`../admin/brand`} type="button" className="btn btn-success">
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
              <label htmlFor="">Tên thương hiệu</label>
              <input
                type="name"
                className="form-control col-sm-5"
                id="e"
                value={data.Name}
                onChange={(e)=>setData({...data,Name:e.target.value})}
                aria-describedby=""
                placeholder="Nhập tên thương hiệu"
              />
             <p style={{ color: "red" }}>{errors.Name}</p>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
            <div className="form-group ">
              <label htmlFor="exampleInputPassword1">Mô tả thương hiệu</label>
              <input
                type=""
                className="form-control col-sm-5"
                id=""
                value={data.Description}
                onChange={(e)=>setData({...data,Description:e.target.value})}

                placeholder="Nhập mô tả "
              />
            </div>
            <p style={{ color: "red" }}>{errors.Description}</p>

            <div className="form-group">
              <label htmlFor="productSelect">Tạo bởi :</label>
              <select
                className="form-control col-sm-5"
                id="productSelect"
                value={data.CreatedById}
                onChange={(e) => setData({ ...data, CreatedById: e.target.value })}
              >
                <option value="">Chọn người tạo</option>
                {users.map((user) => (
                  <option key={user.Id} value={user.Id}>{user.LastName} {user.FirstName}</option>
                ))}
              </select>
            </div>
            <p style={{ color: "red" }}>{errors.CreatedById}</p>

            <div className="form-group">
              <label htmlFor="productSelect">Cập nhật bởi :</label>
              <select
                className="form-control col-sm-5"
                id="productSelect"
                value={data.UpdatedById}
                onChange={(e) => setData({ ...data, UpdatedById: e.target.value })}
              >
                <option value="">Chọn cập nhập</option>
                {users.map((user) => (
                  <option key={user.Id} value={user.Id}>{user.LastName} {user.FirstName}</option>
                ))}
              </select>
            </div>
            <p style={{ color: "red" }}>{errors.UpdatedById}</p>

            <div className="form-group">
                  <label htmlFor="productImage">Hình ảnh thương hiệu</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="productImage"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
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

export default BrandCreate;
