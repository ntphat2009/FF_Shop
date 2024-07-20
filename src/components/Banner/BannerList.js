import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import  axios  from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const BannerList = () => {
  const token = localStorage.getItem('token');

  const [categories,setCategories]=useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://localhost:44389/api/Banners");
        
        const filteredCategories = response.data.filter(banner => banner.Status);
        console.log(response.data)
        setCategories(filteredCategories);

      } catch (error) {
        console.error("Lỗi khi gọi API aaaaa:", error);
      }
    };

    fetchCategories();

    return () => {};
  }, []);
  const handleTrashClick = async (bannerId) => {
    try {
      const bannerResponse = await axios.get(`https://localhost:44389/api/Banners/${bannerId}`);
      const banner = bannerResponse.data;
      console.log(banner)
      banner.Status = false;
      console.log(banner)
      const updateResponse = await axios.put(
        `https://localhost:44389/api/Banners/${bannerId}`,banner,
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
              <h1>Trang quản lý banner [Banner]</h1>
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
            <h3 className="card-title">Danh sách banner</h3>
            <div className="card-tools">
              <Link to={`create`} type="button" className="btn btn-success">
                <i class="fas fa-plus-square"> Thêm banner</i>
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
              <caption className="mt-4">Danh sách của banner</caption>
              <thead>
                <tr>
 
                  <th scope="col" className="col-1">
                    Id
                  </th>
                  <th scope="col" className="col-1">
                    Hình ảnh
                  </th>
                  <th scope="col" className="col-3">
                    Tên banner
                  </th>
                  <th scope="col" className="col-4">
                    Vị trí
                  </th>
                  <th scope="col" className="col-3">
                    Chức năng
                  </th>
                </tr>
              </thead>
              <tbody>
              {categories.map(banner => (
                <tr>

                  <td>{banner.Id}</td>
                  <td>  <img
                     src={`http://localhost:3000/assetad/dist/img/${banner.Image}`}
                    // src={require(`../../../public/assetad/dist/img/${banner.Immage}`)}

                    style={{height:"50px",width:"50px"}}
                    alt="banner Image"
                  /></td>
                  <td>{banner.Name}</td>
                  <td>{banner.Position}</td>

                  <td className="text-center">
                    <Link to={`show/${banner.Id}`} className="btn btn-primary">
                      <i class="fas fa-eye"></i>
                    </Link>
                    <Link to={`edit/${banner.Id}`}className="btn btn-success mx-1">
                      <i class="fas fa-edit"></i>
                    </Link>
                    <button onClick={() => handleTrashClick(banner.Id)} className="btn btn-danger">
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

export default BannerList;
