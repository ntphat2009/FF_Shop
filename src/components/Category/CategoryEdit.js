import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const CategoryEdit = () => {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();
  const currentDate = new Date().toISOString();
  const { id } = useParams();
  const [cateEdit, setCateEdit] = useState(null);
  const [users,setUsers]=useState([]);
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  // input image path
  const handleImageChange = (e) => {
    setCateEdit({
      ...cateEdit,
      Image: e.target.files[0].name,
    });
  };
  // fetch data by category id
  useEffect(() => {
    const fetchCateEdit = async () => {
      try {
        const response = await axios.get(`https://localhost:44389/api/Category/${id}`);
        setCateEdit(response.data); 
      } catch (error) {
        console.error('Lỗi khi gọi API cateid:', error);
      }
    };
    fetchCateEdit();
    return () => {};
  }, [id]);
  //------------
  // fetch data category && user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://localhost:44389/api/Account");
        const responseCate = await axios.get("https://localhost:44389/api/Category");
        const filteredCategories = responseCate.data.filter(category => category.Status);
        // console.log(response.data)
        setUsers(response.data);
        setCategories(filteredCategories);
      } catch (error) {
        console.error("Lỗi khi gọi API aaaaa:", error);
      }
    };
    fetchUsers();
    return () => {};
  }, [id]);
  //submit form and trap error
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://localhost:44389/api/Category/${id}`,
        cateEdit,
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
       
        window.location.href = "/admin/category";
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
  if (!cateEdit) {
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
              <h1>Trang quản lý danh mục [Category]</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={`../`}>danh mục</Link>
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
            <h3 className="card-title">Cập nhật danh mục</h3>
            <div className="card-tools">
              <Link
                to={`/admin/category`}
                type="button"
                className="btn btn-success"
              >
                <i class="fas fa-angle-double-left">
                  {" "}
                  Quay lại danh sách danh mục
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
              <label htmlFor="">Tên danh mục</label>
              

              <input
                type="name"
                className="form-control col-sm-5"
                id="e"
                value={cateEdit.Name}
                onChange={(e)=>setCateEdit({...cateEdit,Name:e.target.value})}
                aria-describedby=""
                placeholder="Nhập tên danh mục"
              />
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <div className="form-group ">
              <label htmlFor="exampleInputPassword1">Mô tả danh mục</label>
             
              <input
                type=""
                className="form-control col-sm-5"
                id=""
                value={cateEdit.Description}
                onChange={(e)=>setCateEdit({...cateEdit,Description:e.target.value})}

                placeholder="Nhập mô tả"
              />
            </div>
            <div className="form-group">
              <label htmlFor="productSelect">Cập nhật bởi :</label>
              <select
                className="form-control col-sm-5"
                id="productSelect"
                value={cateEdit.UpdatedById}
                onChange={(e) => setCateEdit({ ...cateEdit, UpdatedById: e.target.value })}
              >
                <option value="">Chọn người cập nhập</option>
                {users.map((user) => (
                  <option key={user.Id} value={user.Id}>{user.LastName} {user.FirstName}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="productSelect">Danh mục cha</label>
              <select
                className="form-control col-sm-5"
                id="productSelect"
                value={cateEdit.ParentId}
                onChange={(e) => setCateEdit({ ...cateEdit, ParentId: e.target.value })}
              >
                <option value={cateEdit.ParentId}>Chọn danh mục cha</option>
                {categories.map((category) => (
                  <option key={category.Id} value={category.Id}>{category.Id} {category.Name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
                  <label htmlFor="productImage">Hình ảnh ngành hàng</label>
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

export default CategoryEdit;
