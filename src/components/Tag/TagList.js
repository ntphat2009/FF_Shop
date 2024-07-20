import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import  axios  from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const TagList = () => {
  const token = localStorage.getItem('token');

  const [tag,setTag]=useState([]);
  useEffect(() => {
    const fetchTag = async () => {
      try {
        const response = await axios.get("https://localhost:44389/api/Tag");
        
         const filteredTag = response.data.filter(tag => tag.Status);
        console.log(response.data)
        setTag(filteredTag);

      } catch (error) {
        console.error("Lỗi khi gọi API aaaaa:", error);
      }
    };

    fetchTag();

    return () => {};
  }, []);
  const handleTrashClick = async (categoryId) => {
    try {
      const categoryResponse = await axios.get(`https://localhost:44389/api/Tag/${categoryId}`);
      const category = categoryResponse.data;
      console.log(category)
      category.Status = false;
      console.log(category)
      const updateResponse = await axios.put(
        `https://localhost:44389/api/Tag/update-post?id=${categoryId}`,
        category,
        {
         
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
        
      );
      if (updateResponse.status===403) {
        toast.error("Bạn chưa được cấp quyền này !")
      }
      console.log(updateResponse.data); 
      toast.success("Ngành hàng đã được thêm vào thùng rác !")
      window.location.reload();

    } catch (error) {
      if (error.response && error.response.status===401) {
        toast.error("Phiên bản đăng nhập hết hạn. Vui lòng đăng nhập lại!")
      }
      console.error('Lỗi khi cập nhật status:', error);
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
              <h1>Trang quản lý thẻ [Tag]</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Blank Page</li>
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
            <h3 className="card-title">Danh sách thẻ</h3>
            <div className="card-tools">
              <Link to={`create`} type="button" className="btn btn-success">
                <i class="fas fa-plus-square"> Thêm thẻ</i>
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
              <caption className="mt-4">Danh sách của thương hiệu</caption>
              <thead>
                <tr>
 
                  <th scope="col" className="col-1">
                    Id
                  </th>
                  {/* <th scope="col" className="col-1">
                    Hình ảnh
                  </th> */}
                  <th scope="col" className="col-3">
                    Tên Thẻ
                  </th>
                  {/* <th scope="col" className="col-4">
                    Mô tả
                  </th> */}
                  <th scope="col" className="col-3">
                    Chức năng
                  </th>
                </tr>
              </thead>
              <tbody>
              {tag.map(tag => (
                <tr>

                  <td>{tag.Id}</td>
                 
                  <td>{tag.Name}</td>
                 
                  <td className="text-center">
                    <Link to={`show/${tag.Id}`} className="btn btn-primary">
                      <i class="fas fa-eye"></i>
                    </Link>
                    <Link to={`edit/${tag.Id}`}className="btn btn-success mx-1">
                      <i class="fas fa-edit"></i>
                    </Link>
                    <button onClick={() => handleTrashClick(tag.Id)} className="btn btn-danger">
            <i className="fas fa-trash"></i>
          </button>

                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          {/* /.card-body */}

          <div className="card-footer">
            {" "}
            <Link to={`trash`} className="btn btn-danger">
              <i class="fas fa-trash"> Thùng rác </i>
            </Link>
          </div>
          {/* /.card-footer*/}
        </div>
        {/* /.card */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default TagList;
