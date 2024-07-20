import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const TopicsTrash = () => {
  const token = localStorage.getItem('token');

  const [topics,setTopicss]=useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:44389/api/Topics");
        const filteredTopicss = response.data.filter(topic => !topic.Status);
        setTopicss(filteredTopicss);

      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchProducts();

    return () => {};
  }, []);
  const handleTrashClick = async (topicId) => {
    try {
      const productResponse = await axios.get(`https://localhost:44389/api/Topics/${topicId}`);

      const topic = productResponse.data;

      topic.Status = true;

      const updateResponse = await axios.put(
        `https://localhost:44389/api/Topics/${topicId}`,
        topic,
        {
         
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
          }
        }
        
      );

      if (updateResponse.status === 403) {
        toast.error("Bạn chưa được cấp quyền này!");
        return; // Dừng lại nếu nhận được lỗi 403
      }
      toast.success("Thương hiệu đã được khôi phục !");
    window.location.reload();
    } catch (error) {
      console.error('Lỗi khi cập nhật status:', error);
      if (error.response && error.response.status === 401) {
        toast.error("Phiên bản đăng nhập hết hạn.Vui lòng đăng nhập lại!");
      } else {
        toast.error("Đã xảy ra lỗi khi cập nhật chủ đề!");
      }
      
    
    }
  };
  const handleDeleteClick = async (topicId) => {
    try {
      const reponse = await axios.delete(`https://localhost:44389/api/Topics/${topicId}`,{
      
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (reponse.status === 403) {
        toast.error("Bạn chưa được cấp quyền này!");
        return; // Dừng lại nếu nhận được lỗi 403
      }

      
     

      window.location.reload();
      toast.success("Sản phẩm đã được xóa!");

    } catch (error) {
      console.error('Lỗi khi cập nhật status:', error);
      if (error.response && error.response.status === 401) {
        toast.error("Phiên bản đăng nhập hết hạn.Vui lòng đăng nhập lại!");
      } else {
        toast.error("Đã xảy ra lỗi khi cập nhật chủ đề!");
      }
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
              <h1>Trang quản lý danh mục [Topics]</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={`../admin/category`}>danh mục</Link>
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
            <h3 className="card-title">Danh sách danh mục</h3>
            <div className="card-tools">
              <Link to={`../admin/category`} type="button" className="btn btn-success">
                <i class="fas fa-angle-double-left">
                  {" "}
                  Quay về danh sách danh mục
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
          <div className="card-body">
            <table class="table table table-bordered border-primary">
              <caption className="mt-4">Danh sách của Danh mục</caption>
              <thead>
                <tr>
                  <th scope="col" className="col-1">
                    Id
                  </th>
                  <th scope="col" className="col-3">
                    Tên danh mục
                  </th>
                  <th scope="col" className="col-4">
                    Mô tả
                  </th>
                  <th scope="col" className="col-3">
                    Chức năng
                  </th>
                </tr>
              </thead>
              <tbody> {topics.map(topic => (
                <tr>

                  <td>{topic.Id}</td>
                  <td>{topic.Name}</td>
                  <td>{topic.Description}</td>

                  <td className="text-center">
                  <button onClick={() => handleTrashClick(topic.Id)} className="btn btn-primary mx-1">
                    <i class="fas fa-redo"></i>
          </button>
                    <button onClick={() => handleDeleteClick(topic.Id)} className="btn btn-danger mx-1">
                    <i class="fas fa-trash"></i>

          </button>

                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          {/* /.card-body */}
          <div className="card-footer">Thùng rác</div>
          {/* /.card-footer*/}
        </div>
        {/* /.card */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default TopicsTrash;
