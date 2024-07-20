import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// import "../../../public/assetad/dist/css/"
const ProductList = () => {
  const token = localStorage.getItem('token');
  const defaultImage = "/assetad/dist/img/AdminLTELogo.png";
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  function formatCurrency(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
  }
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:44389/api/Products");
        console.log("====================================");
        console.log(response.data);
        console.log("====================================");
        const filteredProducts = response.data.filter(product => product.Status);
        console.log(filteredProducts); // Log ra sản phẩm có status bằng false
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchProducts();

    return () => { };
  }, []);
  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };
  const handleTrashClick = async (productId) => {
    try {
      const productResponse = await axios.get(`https://localhost:44389/api/Products/${productId}`);
      const product = productResponse.data;

      product.Status = false;

      console.log("datadelete", product);

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

      if (updateResponse.status === 403) {
        toast.error("Bạn chưa được cấp quyền này!");
        return;
      }

      console.log("dataafterdelete", updateResponse.data);
      toast.success("Sản phẩm đã được thêm vào thùng rác!");

      // Filter out the updated product from the products array
      setProducts(products.filter(p => p.ProductId !== productId));

    } catch (error) {
      console.error('Lỗi khi cập nhật status:', error);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6; // Số lượng sản phẩm trên mỗi trang

  const filteredProducts = products.filter(product => product.Name.toLowerCase().includes(searchTerm.toLowerCase()));


  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentPageItems = filteredProducts.slice(startIndex, endIndex);

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
              placeholder="Tìm kiếm sản phẩm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control mb-3"
              style={{maxWidth:"100%"}}
            />
            </div>
           

            <div className="card-tools">
              <Link to={`create`} type="button" className="btn btn-success">
                <i class="fas fa-plus-square"> Thêm sản phẩm</i>
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

              <thead>
                <tr>

                  <th scope="col" className="col-1">
                    Id
                  </th>
                  <th scope="col" className="col-1">
                    Hình ảnh
                  </th>
                  {/* <th scope="col" className="col-3">
                    Tên ngành hàng
                  </th>
                  <th scope="col" className="col-3">
                    Tên thương hiệu
                  </th> */}
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


              <tbody>
                {currentPageItems.map(product => (
                  <tr key={product.ProductId}>

                    <td>{product.ProductId}</td>
                    <td>{product && product.Image ? (<img
                      src={require(`../../../public/assetad/dist/img/${product.Image}`)}
                      onError={handleImageError}
                      className="product-image"
                      style={{ height: "50px", width: "50px" }}
                    />) : (<img
                      src={defaultImage}
                      className="product-image"
                      style={{ height: "50px", width: "50px" }}
                      alt="Default"
                    />)}</td>
                    <td>{product.Name}</td>
                    {/* <td>{product.BrandName}</td>
                  <td>{product.CategoryName}</td> */}
                    <td>{formatCurrency(product.Price)}</td>


                    <td className="text-center">
                      <Link to={`show/${product.ProductId}`} className="btn btn-primary">
                        <i class="fas fa-eye"></i>
                      </Link>
                      <Link to={`edit/${product.ProductId}`} className="btn btn-success mx-1">
                        <i class="fas fa-edit"></i>
                      </Link>
                      <button onClick={() => handleTrashClick(product.ProductId)} className="btn btn-danger">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            </nav>
          </div>
          {/* /.card-body */}

          <div className="card-footer">
            {" "}
            <Link to={`trash`} className="btn btn-danger">
              <i class="fas fa-trash"> Thùng rác sản phẩm</i>
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

export default ProductList;
