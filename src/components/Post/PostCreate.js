import axios from "axios";
import React, { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const PostCreate = () => {
  const token = localStorage.getItem('token');

  const [users,setUsers]=useState([]);
  const [post, setPost] = useState([]);
  const [topic, setTopic] = useState([]);

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
        const responsePost = await axios.get("https://localhost:44389/api/Post");
        const responseTopic= await axios.get("https://localhost:44389/api/Topics");

        
        // const filteredCategories = response.data.filter(category => category.Status);
        // console.log(response.data)
        setUsers(response.data);
        setPost(responsePost.data);
        setTopic(responseTopic.data);


      } catch (error) {
        console.error("Lỗi khi gọi API aaaaa:", error);
      }
    };

    fetchUsers();

    return () => {};
  }, []);
  // post data
  
 
  const [data, setData] = useState({
    Title: "",
    Description: "",
    Detail:"",
    Topic_Id:"",
    Status:true,
    Image:"",
    CreatedById:"",
    UpdatedById:"",
  
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
      Name: !data.Name ? "Vui lòng nhập tên Bài viết." : "",
      Description: !data.Description ? "Vui lòng nhập mô tả ." : "",
      Detail: !data.Detail ? "Vui lòng nhập chi tiết ." : "",
      Topic_Id: !data.Topic_Id ? "Vui lòng chọn chủ đề." : "",
     
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
        "https://localhost:44389/api/Post/create-post",
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
        window.location.href = "/admin/post";

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
              <h1>Trang quản lý bài viết [Post]</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">bài viết</a>
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
            <h3 className="card-title">Tạo mới bài viết</h3>
            <div className="card-tools">
              <Link to={`../admin/post`} type="button" className="btn btn-success">
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
              <label htmlFor="">Tên bài viết</label>
              <input
                type="name"
                className="form-control col-sm-5"
                id=""
                value={data.Title}
                onChange={(e)=>setData({...data,Title:e.target.value})}
                aria-describedby=""
                placeholder="Nhập tên bài viết"
              />
             <p style={{ color: "red" }}>{errors.Name}</p>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
            <div className="form-group ">
              <label htmlFor="exampleInputPassword1">Mô tả bài viết</label>
              <input
                type=""
                className="form-control col-sm-5"
                id=""
                value={data.Description}
                onChange={(e)=>setData({...data,Description:e.target.value})}

                placeholder="Nhập mô tả Bài viết"
              />
            </div>
            <p style={{ color: "red" }}>{errors.Description}</p>
            <div className="form-group ">
              <label htmlFor="">Chi tiết bài viết</label>
              <input
                type=""
                className="form-control col-sm-5"
                id=""
                value={data.Detail}
                onChange={(e)=>setData({...data,Detail:e.target.value})}

                placeholder="Nhập chi tiết bài viết"
              />
            </div>
            <p style={{ color: "red" }}>{errors.Detail}</p>
            <div className="form-group">
              <label htmlFor="productSelect">chọn chủ đề :</label>
              <select
                className="form-control col-sm-5"
                id="productSelect"
                value={data.Topic_Id}
                onChange={(e) => setData({ ...data, Topic_Id: e.target.value })}
              >
                <option value="">Chọn chủ đề</option>
                {topic.map((topics) => (
                  <option key={topics.Id} value={topics.Id}>{topics.Name}</option>
                ))}
              </select>
            </div>
            <p style={{ color: "red" }}>{errors.Topic_Id}</p>
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
                  <label htmlFor="productImage">Hình ảnh bài viết</label>
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

export default PostCreate;
