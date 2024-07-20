import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserTrash = () => {
  const [products,setProducts]=useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:44389/api/Account");
        console.log("====================================");
        console.log(response.data);
        console.log("====================================");
        const filteredProducts = response.data.filter(product => !product.LockoutEnabled);
        console.log(filteredProducts); // Log ra tài khoản có status bằng false
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchProducts();

    return () => {};
  }, []);
  const handleTrashClick = async (productId) => {
    try {
      const productResponse = await axios.get(`https://localhost:44389/api/Account/GetById/${productId}`);

      const product = productResponse.data;
console.log('====================================');
console.log("pro",product);
console.log('====================================');
      product.LockoutEnabled = true;

      const updateResponse = await axios.put(
        `https://localhost:44389/api/Account/${productId}`,
        product
      );

      alert("tài khoản đã được khôi phục !");
      window.location.reload();

    } catch (error) {
      console.error('Lỗi khi cập nhật status:', error);
    }
  };
  const handleDeleteClick = async (productId) => {
    try {
      const productResponse = await axios.delete(`https://localhost:44389/api/Account/${productId}`);
      alert("Người dùng đã được xóa khỏi thùng rác !");

      window.location.reload();

    } catch (error) {
      console.error('Lỗi khi cập nhật status:', error);
    }
  };
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Thùng rác user</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={`../user`}>User</Link>
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
            <h3 className="card-title">Danh sách tài khoản</h3>
            <div className="card-tools">
              <Link to={`../admin/user`} type="button" className="btn btn-success">
                <i class="fas fa-angle-double-left">
                  {" "}
                  Quay về danh sách người dùng
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
              <caption className="mt-4">Danh sách của tài khoản</caption>
              <thead>
                <tr>
                  <th scope="col" className="col-1">
                    Id
                  </th>
                  <th scope="col" className="col-1">
                    Tên người dùng
                  </th>
                  <th scope="col" className="col-3">
                    Email
                  </th>
                  <th scope="col" className="col-1">
                    Số điện thoại
                  </th>
                  <th scope="col" className="col-3">
                    Chức năng
                  </th>
                </tr>
              </thead>
              <tbody> {products.map(product => (
                  <tr key={product.ProductId}>

                  <td>{product.Id}</td>
                  {/* <td>  <img
                    src={`http://localhost:3000/assetad/dist/img/${product.Image}`}
                    className="product-image"
                    alt="Product Image"
                  /></td> */}
                  <td>{product.FirstName} {product.LastName}</td>
                  <td>{product.Email}</td>
                  <td>{product.PhoneNumber}</td>

                  <td className="text-center">
                    <button onClick={() => handleTrashClick(product.Id)} className="btn btn-primary mx-1">
                    <i class="fas fa-redo"></i>
          </button>
                    <button onClick={() => handleDeleteClick(product.Id)} className="btn btn-danger mx-1">
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

export default UserTrash;
