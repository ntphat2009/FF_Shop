import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TopicsEdit = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { id } = useParams();
  const [topic, setTopics] = useState(null);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const createSlug = (str) => {
    return str
      .toLowerCase() // Chuyển đổi tất cả thành chữ thường
      .replace(/\s+/g, '-') // Thay thế dấu cách bằng dấu gạch ngang
      .replace(/[^\w\-]+/g, '') // Loại bỏ các ký tự không phải chữ cái, số, gạch ngang
      .replace(/\-\-+/g, '-') // Loại bỏ các dấu gạch ngang liên tiếp
      .replace(/^-+/, '') // Loại bỏ các dấu gạch ngang ở đầu chuỗi
      .replace(/-+$/, ''); // Loại bỏ các dấu gạch ngang ở cuối chuỗi
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:44389/api/Topics/${id}`);
        setTopics(response.data); 
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://localhost:44389/api/Account");
        setUsers(response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleImageChange = (e) => {
    setTopics({
      ...topic,
      Image: e.target.files[0].name,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const topicdata= {
      ...topic,
      Slug:createSlug(topic.Name)
    }
    try {
      const response = await axios.put(
        `https://localhost:44389/api/Topics/${id}`,
        topicdata,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.status === 200) {
        toast.success("Cập nhật thành công!");
        navigate("/admin/topic");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Vui lòng đăng nhập lại để tiếp tục!");
      } else if (error.response && error.response.status === 500) {
        setErrorMessage("Tên chủ đề đã tồn tại. Vui lòng chọn tên khác.");
      } else {
        toast.error("Đã xảy ra lỗi khi cập nhật chủ đề!");
      }
      console.error("Lỗi khi cập nhật chủ đề:", error);
    }
  };

  if (!topic) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-wrapper">
      <ToastContainer />
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Trang quản lý Chủ đề [Topics]</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={`../`}>Chủ đề</Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Cập nhật Chủ đề</h3>
            <div className="card-tools">
              <Link to={`/admin/topic`} className="btn btn-success">
                <i className="fas fa-angle-double-left"> Quay lại danh sách Chủ đề</i>
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
              <label htmlFor="">Tên chủ đề</label>
              <input
                type="text"
                className="form-control col-sm-5"
                value={topic.Name}
                onChange={(e) => setTopics({ ...topic, Name: e.target.value })}
                placeholder="Nhập tên chủ đề"
              />
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Mô tả chủ đề</label>
              <input
                type="text"
                className="form-control col-sm-5"
                value={topic.Description}
                onChange={(e) => setTopics({ ...topic, Description: e.target.value })}
                placeholder="Nhập mô tả"
              />
            </div>
          
            <div className="form-group">
              <label htmlFor="productSelect">Cập nhật bởi :</label>
              <select
                className="form-control col-sm-5"
                value={topic.UpdatedById}
                onChange={(e) => setTopics({ ...topic, UpdatedById: e.target.value })}
              >
                <option value="">Chọn cập nhập</option>
                {users.map((user) => (
                  <option key={user.Id} value={user.Id}>{user.LastName} {user.FirstName}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
                  <label htmlFor="productImage">Hình ảnh chủ đề</label>
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
        </div>
      </section>
    </div>
  );
};

export default TopicsEdit;
