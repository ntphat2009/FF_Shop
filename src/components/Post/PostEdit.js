import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostEdit = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [topic, setTopic] = useState([]);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://localhost:44389/api/Post/${id}`);
        setPost(response.data); 
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchUsersAndTopics = async () => {
      try {
        const responseUsers = await axios.get("https://localhost:44389/api/Account");
        const responseTopics = await axios.get("https://localhost:44389/api/Topics");
        setUsers(responseUsers.data);
        setTopic(responseTopics.data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };
    fetchUsersAndTopics();
  }, []);

  const handleImageChange = (e) => {
    setPost({
      ...post,
      Image: e.target.files[0].name,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://localhost:44389/api/Post/update-post?id=${id}`,
        post,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.status === 200) {
        toast.success("Cập nhật thành công!");
        navigate("/admin/post");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Vui lòng đăng nhập lại để tiếp tục!");
      } else if (error.response && error.response.status === 500) {
        toast.error("Đã xảy ra lỗi khi cập nhật bài viết!");
      }
      else if (error.response && error.response.status === 403) {
        toast.error("Tài khoản của bạn chưa được cấp quyền này!");
      }
       else {
        toast.error("Đã xảy ra lỗi khi cập nhật bài viết!");
      }
      console.error("Lỗi khi cập nhật bài viết:", error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-wrapper">
      <ToastContainer />
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Trang quản lý Bài viết [Post]</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={`../`}>Bài viết</Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Cập nhật Bài viết</h3>
            <div className="card-tools">
              <Link to={`/admin/post`} className="btn btn-success">
                <i className="fas fa-angle-double-left"> Quay lại danh sách Bài viết</i>
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
              <label htmlFor="">Tên Bài viết</label>
              <input
                type="text"
                className="form-control col-sm-5"
                value={post.Title}
                onChange={(e) => setPost({ ...post, Title: e.target.value })}
                placeholder="Nhập tên Bài viết"
              />
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Mô tả bài viết</label>
              <input
                type="text"
                className="form-control col-sm-5"
                value={post.Description}
                onChange={(e) => setPost({ ...post, Description: e.target.value })}
                placeholder="Nhập mô tả"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Chi tiết bài viết</label>
              <input
                type="text"
                className="form-control col-sm-5"
                value={post.Detail}
                onChange={(e) => setPost({ ...post, Detail: e.target.value })}
                placeholder="Nhập chi tiết"
              />
            </div>
            <div className="form-group">
              <label htmlFor="productSelect">Chọn chủ đề :</label>
              <select
                className="form-control col-sm-5"
                value={post.Topic_Id}
                onChange={(e) => setPost({ ...post, Topic_Id: e.target.value })}
              >
                <option value="">Chọn chủ đề</option>
                {topic.map((topics) => (
                  <option key={topics.Id} value={topics.Id}>{topics.Name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="productSelect">Cập nhật bởi :</label>
              <select
                className="form-control col-sm-5"
                value={post.UpdatedById}
                onChange={(e) => setPost({ ...post, UpdatedById: e.target.value })}
              >
                <option value="">Chọn cập nhập</option>
                {users.map((user) => (
                  <option key={user.Id} value={user.Id}>{user.LastName} {user.FirstName}</option>
                ))}
              </select>
            </div>
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
            <button type="submit" className="btn btn-success">Cập nhật</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default PostEdit;
