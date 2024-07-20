import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import  axios  from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const BrandList = () => {
  const token = localStorage.getItem('token');

  const [categories,setCategories]=useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://localhost:44389/api/Brand");
        
        const filteredCategories = response.data.filter(category => category.Status);
        console.log(response.data)
        setCategories(filteredCategories);

      } catch (error) {
        console.error("Lỗi khi gọi API aaaaa:", error);
      }
    };

    fetchCategories();

    return () => {};
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 4; // Số lượng sản phẩm trên mỗi trang
  const filteredCate = categories.filter(cate => cate.Name.toLowerCase().includes(searchTerm.toLowerCase()));



  const totalItems = filteredCate.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentPageItems = filteredCate.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleTrashClick = async (categoryId) => {
    try {
      const categoryResponse = await axios.get(`https://localhost:44389/api/Brand/${categoryId}`);
      const category = categoryResponse.data;
      console.log(category)
      category.Status = false;
      console.log(category)
      const updateResponse = await fetch(
        `https://localhost:44389/api/Brand/${categoryId}`,
        {
          method:'PUT',
          body: JSON.stringify(category),
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
              <h1>Trang quản lý thương hiệu [Brand]</h1>
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
          <div className="card-title">
              <input
                type="text"
                placeholder="Tìm kiếm thương hiệu"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mb-3"
                style={{ maxWidth: "100%" }}
              />
            </div>
            <div className="card-tools">
              <Link to={`create`} type="button" className="btn btn-success">
                <i class="fas fa-plus-square"> Thêm thương hiệu</i>
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
                  <th scope="col" className="col-1">
                    Hình ảnh
                  </th>
                  <th scope="col" className="col-3">
                    Tên thương hiệu
                  </th>
                  <th scope="col" className="col-4">
                    Mô tả
                  </th>
                  <th scope="col" className="col-3">
                    Chức năng
                  </th>
                </tr>
              </thead>
              <tbody>
              {currentPageItems.map(category => (
                <tr>

                  <td>{category.Id}</td>
                  <td>  <img
                     src={`http://localhost:3000/assetad/dist/img/${category.Image}`}
                    // src={require(`../../../public/assetad/dist/img/${category.Immage}`)}

                    style={{height:"50px",width:"50px"}}
                    alt="category Image"
                  /></td>
                  <td>{category.Name}</td>
                  <td>{category.Description}</td>

                  <td className="text-center">
                    <Link to={`show/${category.Id}`} className="btn btn-primary">
                      <i class="fas fa-eye"></i>
                    </Link>
                    <Link to={`edit/${category.Id}`}className="btn btn-success mx-1">
                      <i class="fas fa-edit"></i>
                    </Link>
                    <button onClick={() => handleTrashClick(category.Id)} className="btn btn-danger">
            <i className="fas fa-trash"></i>
          </button>

                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            {totalItems > 4 ? (
              <nav className="mb-4" aria-label="Page navigation sample">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handlePreviousPage}>Previous</button>
                  </li>
                  {[...Array(totalPages).keys()].map((pageNumber) => (
                    <li key={pageNumber + 1} className={`page-item ${pageNumber + 1 === currentPage ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(pageNumber + 1)}>{pageNumber + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handleNextPage}>Next</button>
                  </li>
                </ul>
              </nav>) : ""}
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

export default BrandList;
