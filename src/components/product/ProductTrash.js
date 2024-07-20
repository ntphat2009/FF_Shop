import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const ProductTrash = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:44389/api/Products");
        console.log(response.data);
        const filteredProducts = response.data.filter(product => !product.Status);
        console.log(filteredProducts); // Log ra sản phẩm có status bằng false
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchProducts();

    return () => { };
  }, []);
  const handleTrashClick = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const productResponse = await axios.get(`https://localhost:44389/api/Products/${productId}`);
      const product = productResponse.data;
      product.Status = true;
      const updateResponse = await axios.put(
        `https://localhost:44389/api/Products/${productId}`,
        {

          name: product.Name,
          description: product.Description,
          discount: product.Discount,
          price: product.Price,
          categoryId: product.CategoryId,
          create_At: product.Create_At,
          updated_At: new Date().toISOString(),
          brandId: product.BrandId,
          image: product.Image,
          status: product.Status,
          createdById: product.CreatedById,
          updatedById: product.UpdatedById,
          tagIds: product.ProductTags.map(tag => tag.TagId),
          shortDes: product.ShortDesc,
          imageDes: product.ImageDes,
          width: product.Width,
          height: product.Height,
          material: product.Material,
          color: product.Color,
          policy: product.Policy,
      },
        {
         
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log("STT UD",updateResponse.status)
      if (updateResponse.status === 403) {
        toast.error("Bạn chưa được cấp quyền này!");
        return; // Dừng lại nếu nhận được lỗi 403
      }
      toast.success("Sản phẩm đã được khôi phục !");
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
  const handleDeleteClick = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const productResponse = await axios.delete(`https://localhost:44389/api/Products/${productId}`, {
      
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (productResponse.status === 403) {
        toast.error("Bạn chưa được cấp quyền này!");
        return; // Dừng lại nếu nhận được lỗi 403
      }

     
      toast.error("Sản phẩm đã được xóa!");
      window.location.reload();
    } catch (error) {
      
      if (error.response && error.response.status === 401) {
        toast.error("Phiên bản đăng nhập hết hạn.Vui lòng đăng nhập lại!");
      } else {
        toast.error("Đã xảy ra lỗi khi cập nhật chủ đề!");
      }
    }
  };
  return (
    <div className="content-wrapper">
      <ToastContainer />
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Trang quản lý sản phẩm [Product]</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={`../product`}>Sản phẩm</Link>
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
            <h3 className="card-title">Danh sách sản phẩm</h3>
            <div className="card-tools">
              <Link to={`../admin/product`} type="button" className="btn btn-success">
                <i class="fas fa-angle-double-left">
                  {" "}
                  Quay về danh sách sản phẩm
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
              <caption className="mt-4">Danh sách của Sản phẩm</caption>
              <thead>
                <tr>
                  <th scope="col" className="col-1">
                    Id
                  </th>
                  <th scope="col" className="col-1">
                    Hình ảnh
                  </th>
                  <th scope="col" className="col-3">
                    Tên sản phẩm
                  </th>
                  <th scope="col" className="col-1">
                    Giá Gốc
                  </th>
                  <th scope="col" className="col-3">
                    Chức năng
                  </th>
                </tr>
              </thead>
              <tbody> {products.map(product => (
                <tr key={product.ProductId}>

                  <td>{product.ProductId}</td>
                  <td>  <img
                    src={`http://localhost:3000/assetad/dist/img/${product.Image}`}
                    className="product-image"
                    alt="Product Image"
                  /></td>
                  <td>{product.Name}</td>
                  <td>{product.Price}</td>
                  <td className="text-center">
                    <button onClick={() => handleTrashClick(product.ProductId)} className="btn btn-primary mx-1">
                      <i class="fas fa-redo"></i>
                    </button>
                    <button onClick={() => handleDeleteClick(product.ProductId)} className="btn btn-danger mx-1">
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

export default ProductTrash;
