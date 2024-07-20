import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import  axios  from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const UserList = () => {
  const [users,setUsers]=useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://localhost:44389/api/Account");
        
        const filteredUser = response.data.filter(user => user.LockoutEnabled);
        setUsers(filteredUser);

      } catch (error) {
        console.error("Lỗi khi gọi API aaaaa:", error);
      }
    };

    fetchUsers();

    return () => {};
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 4; // Số lượng tài khoản trên mỗi trang
  const filteredCate = users.filter(cate => cate.UserName.toLowerCase().includes(searchTerm.toLowerCase()));



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
  const handleSetAdminClick= async (id)=>{
    try {
      const updateResponse = await axios.put(`https://localhost:44389/api/Account/set-admin?id=${id}`);
      toast.success("User đã được chọn vai trò là quản trị viên!");
    } catch (error) {
      toast.error('Lỗi khi chọn vai trò:', error);
    }
  };
  const handleTrashClick = async (id) => {
    try {
      const userRespone = await axios.get(`https://localhost:44389/api/Account/GetById/${id}`);

      const user = userRespone.data;
      user.LockoutEnabled = false;
      console.log(user)
      const updateResponse = await axios.put(
        `https://localhost:44389/api/Account/${id}`,
        user
      );

      console.log(updateResponse.data); 
      toast.success("User đã được thêm vào thùng rác !");

      window.location.reload();

    } catch (error) {
      toast.error('Lỗi khi cập nhật status:', error);
    }
  };
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <ToastContainer/>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Trang quản lý người dùng</h1>
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
                placeholder="Tìm kiếm người dùng"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mb-3"
                style={{ maxWidth: "100%" }}
              />
            </div>
            <div className="card-tools">
              <Link to={`create`} type="button" className="btn btn-success">
                <i class="fas fa-plus-square"> Thêm người dùng</i>
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
              <caption className="mt-4">Danh sách</caption>
              <thead>
                <tr>
 
                  <th scope="col" className="col-1">
                    Id
                  </th>
                  <th scope="col" className="col-1">
                    Tên
                  </th>
                  <th scope="col" className="col-3">
                    Tên đăng nhập
                  </th>
                  <th scope="col" className="col-4">
                    Số điện thoại
                  </th>
                  <th scope="col" className="col-3 text-center">
                    Chức năng
                  </th>
                </tr>
              </thead>
              <tbody>
              {currentPageItems.map(user => (
                <tr>

                  <td>{user.Id}</td>
                  {/* <td>  <img
                    // src={`http://localhost:3000/assetad/dist/img/${category.Image}`}
                    src={require(`../../../public/assetad/dist/img/${category.Image}`)}

                    style={{height:"50px",width:"50px"}}
                    alt="category Image"
                  /></td> */}
                  <td>{user.FirstName} {user.LastName}</td>

                  <td>{user.Email}</td>
                  <td>{user.PhoneNumber}</td>

                  <td className="text-center">
                    <Link to={`show/${user.UserName}`} className="btn btn-primary">
                      <i class="fas fa-eye"></i>
                    </Link>
                    <Link to={`edit/${user.Id}`}className="btn btn-success mx-1">
                      <i class="fas fa-edit"></i>
                    </Link>
                    <button onClick={() => handleTrashClick(user.Id)} className="btn btn-danger">
            <i className="fas fa-trash"></i>
          </button>
          <button onClick={() => handleSetAdminClick(user.Id)} className="btn btn-info mx-1">
            Chọn làm quản trị viên
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
              <i class="fas fa-trash"> Thùng rác người dùng</i>
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

export default UserList;
