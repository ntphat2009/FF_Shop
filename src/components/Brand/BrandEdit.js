import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const BrandEdit = () => {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();
  const currentDate = new Date().toISOString();
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  
  const handleImageChange = (e) => {
    setBrand({
      ...brand,
      Image: e.target.files[0].name,
    });
  };
  useEffect(() => {
    const fetchProduct = async () => {
      
      try {
        const response = await axios.get(`https://localhost:44389/api/Brand/${id}`);
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
  const [users,setUsers]=useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // fetch data category && user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://localhost:44389/api/Account");
        const responseCate = await axios.get("https://localhost:44389/api/Brand");

        
        // const filteredCategories = response.data.filter(category => category.Status);
        // console.log(response.data)
        setUsers(response.data);
       


      } catch (error) {
        console.error("Lỗi khi gọi API aaaaa:", error);
      }
    };

    fetchUsers();

    return () => {};
  }, []);
  //---------------
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://localhost:44389/api/Brand/${id}`,
        brand,
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
       
        window.location.href = "/admin/brand";
        toast.success("Cập nhật thành công!")
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Vui lòng đăng nhập lại để tiếp tục!");
      }

      else
      if (error.response && error.response.status === 500) {
        setErrorMessage("Tên thương hiệu đã tồn tại. Vui lòng chọn tên khác.");
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
              <h1>Trang quản lý Thương hiệu [Brand]</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={`../`}>Thương hiệu</Link>
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
            <h3 className="card-title">Cập nhật Thương hiệu</h3>
            <div className="card-tools">
              <Link
                to={`/admin/brand`}
                type="button"
                className="btn btn-success"
              >
                <i class="fas fa-angle-double-left">
                  {" "}
                  Quay lại danh sách Thương hiệu
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
              <label htmlFor="">Tên thương hiệu</label>
              

              <input
                type="name"
                className="form-control col-sm-5"
                id="e"
                value={brand.Name}
                onChange={(e)=>setBrand({...brand,Name:e.target.value})}
                aria-describedby=""
                placeholder="Nhập tên thương hiệu"
              />
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <div className="form-group ">
              <label htmlFor="exampleInputPassword1">Mô tả thương hiệu</label>
             
              <input
                type=""
                className="form-control col-sm-5"
                id=""
                value={brand.Description}
                onChange={(e)=>setBrand({...brand,Description:e.target.value})}

                placeholder="Nhập mô tả"
              />
            </div>
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
                <div className="form-group">
              <label htmlFor="productSelect">Cập nhật bởi :</label>
              <select
                className="form-control col-sm-5"
                id="productSelect"
                value={brand.UpdatedById}
                onChange={(e) => setBrand({ ...brand, UpdatedById: e.target.value })}
              >
                <option value="">Chọn cập nhập</option>
                {users.map((user) => (
                  <option key={user.Id} value={user.Id}>{user.LastName} {user.FirstName}</option>
                ))}
              </select>
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

export default BrandEdit;
