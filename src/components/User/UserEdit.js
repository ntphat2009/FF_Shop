import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";

const UserEdit = () => {
  const navigate = useNavigate();
  const currentDate = new Date().toISOString();
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  
 
  useEffect(() => {
    const fetchProduct = async () => {
      
      try {
        const response = await axios.get(`https://localhost:44389/api/Account/GetById/${id}`);
        setBrand(response.data); 

        
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
      
    };

    fetchProduct();

    return () => {
    };
  }, [id]);
  //------------

  const [errorMessage, setErrorMessage] = useState("");

  // fetch data category && user
 
  //---------------
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://localhost:44389/api/Account/${id}`,
        brand
      );
       
      if (response.status === 200) {
        alert("Sửa thành công!");
        navigate('/admin/user');
      } else {
        // Xử lý lỗi
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setErrorMessage("Tên tài khoản đã tồn tại. Vui lòng chọn tên khác.");
      } else {
        console.log('Lỗi khi gửi dữ liệu lên server:', error);
      }
    }
  };


  if (!brand) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Trang quản lý người dùng [User]</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={`../`}>người dùng</Link>
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
            <h3 className="card-title">Cập nhật người dùng</h3>
            <div className="card-tools">
              <Link
                to={`/admin/user`}
                type="button"
                className="btn btn-success"
              >
                <i class="fas fa-angle-double-left">
                  {" "}
                  Quay lại danh sách người dùng
                </i>
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
              <label htmlFor="">Tên</label>
              

              <input
                type="name"
                className="form-control col-sm-5"
                id="e"
                value={brand.FirstName}
                onChange={(e)=>setBrand({...brand,FirstName:e.target.value})}
                aria-describedby=""
                placeholder="Nhập tên tài khoản"
              />
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <div className="form-group ">
              <label htmlFor="exampleInputPassword1">Họ</label>
             
              <input
                type=""
                className="form-control col-sm-5"
                id=""
                value={brand.LastName}
                onChange={(e)=>setBrand({...brand,LastName:e.target.value})}

                placeholder="Nhập mô tả"
              />
            </div>
            <div className="form-group ">
              <label htmlFor="exampleInputPassword1">Giới tính</label>
             
              <input
                type=""
                className="form-control col-sm-5"
                id=""
                value={brand.Gender}
                onChange={(e)=>setBrand({...brand,Gender:e.target.value})}

                placeholder="Nhập mô tả"
              />
            </div>
            <div className="form-group ">
              <label htmlFor="exampleInputPassword1">Địa chỉ</label>
             
              <input
                type=""
                className="form-control col-sm-5"
                id=""
                value={brand.Address}
                onChange={(e)=>setBrand({...brand,Address:e.target.value})}

                placeholder="Nhập mô tả"
              />
            </div>
            <div className="form-group ">
              <label htmlFor="exampleInputPassword1">Thành phố</label>
             
              <input
                type=""
                className="form-control col-sm-5"
                id=""
                value={brand.City}
                onChange={(e)=>setBrand({...brand,City:e.target.value})}

                placeholder="Nhập mô tả"
              />
            </div>
            <div className="form-group ">
              <label htmlFor="exampleInputPassword1">Số điện thoại</label>
             
              <input
                type=""
                className="form-control col-sm-5"
                id=""
                value={brand.PhoneNumber}
                onChange={(e)=>setBrand({...brand,PhoneNumber:e.target.value})}

                placeholder="Nhập mô tả"
              />
            </div>
          
                
            

            
            
            <button type="submit" className="btn btn-success">Cập nhật</button>
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

export default UserEdit;
