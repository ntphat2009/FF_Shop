import axios from "axios";
import React, { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const BannerCreate = () => {
  const token = localStorage.getItem('token');

  const [users,setUsers]=useState([]);
  const [banner, setBanner] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    Name: "",
    Description: "",
    Image: "",
    Link: "",
    Position:""
  });
  // fetch data category && user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://localhost:44389/api/Account");
        const responseBanner = await axios.get("https://localhost:44389/api/Banners");

        
        // const filteredBannergories = response.data.filter(category => category.Status);
        // console.log(response.data)
        setUsers(response.data);
        setBanner(responseBanner.data);


      } catch (error) {
        console.error("Lỗi khi gọi API aaaaa:", error);
      }
    };

    fetchUsers();

    return () => {};
  }, []);
  // post data
  const navigate = useNavigate();
 
  const [data, setData] = useState({
    Name: "",
    Status:true,
    Image:"",
    Position:""
  });
  const handleImageChange = (e) => {
    setData({
      ...data,
      Image: e.target.files[0].name,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      Name: !data.Name ? "Vui lòng nhập tên banner." : "",
     
      Position: !data.Position ? "Vui lòng nhập vị trí hiển thị." : "",
     
    });
  
    // Kiểm tra xem có lỗi không
    const hasError = Object.values(errors).some(error => error !== "");
    if (hasError) {
      // alert("Thất bại ")
    }
    try {
      const response = await axios.post(
        "https://localhost:44389/api/Banners/create-banner",
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
        window.location.href = "/admin/banner";

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
              <h1>Trang quản lý banner [Banner]</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">banner</a>
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
            <h3 className="card-title">Tạo mới banner</h3>
            <div className="card-tools">
              <Link to={`../admin/banner`} type="button" className="btn btn-success">
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
              <label htmlFor="">Tên banner</label>
              <input
                type="name"
                className="form-control col-sm-5"
                id="e"
                value={data.Name}
                onChange={(e)=>setData({...data,Name:e.target.value})}
                aria-describedby=""
                placeholder="Nhập tên banner"
              />
             <p style={{ color: "red" }}>{errors.Name}</p>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
            <div className="form-group ">
              <label htmlFor="exampleInputPassword1">Vị trí banner</label>
              <input
                type=""
                className="form-control col-sm-5"
                id=""
                value={data.Position}
                onChange={(e)=>setData({...data,Position:e.target.value})}

                placeholder="Nhập mô tả banner"
              />
            </div>
            <p style={{ color: "red" }}>{errors.Position}</p>

       
            <div className="form-group">
                  <label htmlFor="productImage">Hình ảnh</label>
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

export default BannerCreate;
