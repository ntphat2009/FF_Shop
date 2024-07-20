import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const BannerEdit = () => {
  const token = localStorage.getItem('token');

  const { id } = useParams();
  const [banner, setBanner] = useState(null);
  
  const handleImageChange = (e) => {
    setBanner({
      ...banner,
      Image: e.target.files[0].name,
    });
  };
  useEffect(() => {
    const fetchProduct = async () => {
      
      try {
        const response = await axios.get(`https://localhost:44389/api/Banners/${id}`);
        setBanner(response.data); 

        
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
  //---------------
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://localhost:44389/api/Banners/${id}`,
        banner,
        {
         
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
          }
        }
        
      );
       
      if (response.status===403) {
        toast.error("Bạn chưa được cấp quyền này!")
        return
       }
      if (response.status === 200) {
       
        window.location.href = "/admin/banner";
        toast.success("Cập nhật thành công!")
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Vui lòng đăng nhập lại để tiếp tục!");
      }

      else
      if (error.response && error.response.status === 500) {
        setErrorMessage("Tên banner đã tồn tại. Vui lòng chọn tên khác.");
      } else {
        console.log('Lỗi khi gửi dữ liệu lên server:', error);
      }
    }
  };


  if (!banner) {
    return <div>Loading...</div>;
  }
  
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
                  <Link to={`../`}>banner</Link>
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
            <h3 className="card-title">Cập nhật banner</h3>
            <div className="card-tools">
              <Link
                to={`/admin/banner`}
                type="button"
                className="btn btn-success"
              >
                <i class="fas fa-angle-double-left">
                  {" "}
                  Quay lại danh sách banner
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
              <label htmlFor="">Tên banner</label>
              

              <input
                type="name"
                className="form-control col-sm-5"
                id="e"
                value={banner.Name}
                onChange={(e)=>setBanner({...banner,Name:e.target.value})}
                aria-describedby=""
                placeholder="Nhập tên banner"
              />
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <div className="form-group ">
              <label htmlFor="exampleInputPassword1">Vị trí banner</label>
             
              <input
                type=""
                className="form-control col-sm-5"
                id=""
                value={banner.Position}
                onChange={(e)=>setBanner({...banner,Position:e.target.value})}

                placeholder="Nhập mô tả"
              />
            </div>
            <div className="form-group">
                  <label htmlFor="productImage">Hình ảnh banner</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="productImage"
                    accept="image/*"
                    onChange={handleImageChange}
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

export default BannerEdit;
