import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TagEdit = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { id } = useParams();
  const [tag, setTag] = useState(null);
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
        const response = await axios.get(`https://localhost:44389/api/Tag/${id}`);
        setTag(response.data); 
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

  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(
        `https://localhost:44389/api/Tag/update-post?id=${id}`,
        tag,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.status === 200) {
        toast.success("Cập nhật thành công!");
        navigate("/admin/tag");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Vui lòng đăng nhập lại để tiếp tục!");
      } else if (error.response && error.response.status === 500) {
        setErrorMessage("Tên thương hiệu đã tồn tại. Vui lòng chọn tên khác.");
      } else {
        toast.error("Đã xảy ra lỗi khi cập nhật chủ đề!");
      }
      console.error("Lỗi khi cập nhật chủ đề:", error);
    }
  };

  if (!tag) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-wrapper">
      <ToastContainer />
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Trang quản lý thẻ [Tag]</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={`../`}>thẻ</Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Cập nhật thẻ</h3>
            <div className="card-tools">
              <Link to={`/admin/tag`} className="btn btn-success">
                <i className="fas fa-angle-double-left"> Quay lại danh sách thẻ</i>
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
                type="text"
                className="form-control col-sm-5"
                value={tag.Name}
                onChange={(e) => setTag({ ...tag, Name: e.target.value })}
                placeholder="Nhập tên thương hiệu"
              />
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            
            <button type="submit" className="btn btn-success">Cập nhật</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default TagEdit;
