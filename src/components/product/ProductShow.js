import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const ProductShow = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:44389/api/Products/${id}`);
        setProduct(response.data);


      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }

    };

    fetchProduct();

    return () => {
    };
  }, [id]);
  function formatCurrency(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
  }


  if (!product) {
    return <div>Loading...</div>;
  }
  const handleTrashClick = async (productId) => {
    try {
      const productResponse = await axios.get(`https://localhost:44389/api/Products/${productId}`);

      const product = productResponse.data;

      product.Status = false;

      console.log("datadelete", product)
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
          tagIds: product.ProductTags.map(tag => tag.TagId)
      },
        {
         
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (updateResponse.status === 403) {
        toast.error("Bạn chưa được cấp quyền này!")
        return
      }
      console.log("dataafterdelete", updateResponse.data);
      toast.success("Sản phẩm đã được thêm vào thùng rác !");

      window.location.reload();

    } catch (error) {
      console.error('Lỗi khi cập nhật status:', error);
    }
  };
  return (
    <div className="content-wrapper">
      {" "}
      <ToastContainer/>
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h2>Trang chi tiết sản phẩm [Product]</h2>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item">
                <Link className="btn btn-success" to={`../admin/product`}>
                  Quay về sản phẩm
                </Link>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <section className="content">
        {/* Default box */}
        <div className="card card-solid">
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-sm-6">
                <h3 className="d-inline-block d-sm-none">Product Image</h3>
                <div className="col-8">
                  <img
                    src={require(`../../../public/assetad/dist/img/${product.Image}`)}
                    className="product-image"
                    alt="Product Image"
                  />
                </div>
                {/* <div className="col-12 product-image-thumbs">
                  <div className="product-image-thumb active">
                    <img src="../../dist/img/prod-1.jpg" alt="Product Image" />
                  </div>
                  <div className="product-image-thumb">
                    <img src="../../dist/img/prod-2.jpg" alt="Product Image" />
                  </div>
                  <div className="product-image-thumb">
                    <img src="../../dist/img/prod-3.jpg" alt="Product Image" />
                  </div>
                  <div className="product-image-thumb">
                    <img src="../../dist/img/prod-4.jpg" alt="Product Image" />
                  </div>
                  <div className="product-image-thumb">
                    <img src="../../dist/img/prod-5.jpg" alt="Product Image" />
                  </div>
                </div> */}
              </div>
              <div className="col-12 col-sm-6">
                <h3 className="my-3">Tên sản phẩm</h3>
                <p>{product.Name}</p>
                <hr />
                <h5>Ngành hàng</h5>
                <p>{product.CategoryName}</p>
                <hr />
                <h5>Thương hiệu</h5>
                <p>{product.BrandName}</p>
                <hr />

                <h5>Chi tiết sản phẩm</h5>
                <p>{product.Description}</p>
                <hr />

                <div className="bg-gray py-2 px-3 mt-4">
                  <h2 className="mb-0">Giá sản phẩm: {formatCurrency(product.Price)}</h2>
                  <h2 className="mb-0">Giá khuyến mãi: {formatCurrency(product.Discount)}</h2>
                </div>
                {/* <h5>Người tạo</h5>
                <p>{product.CreateAt}</p>
                <hr /><h5>Người cập nhật</h5>
                <p>{product.UpdateBy}</p>
                <hr /> */}
                <div className="mt-4">
                  <Link
                    to={`../../admin/product/edit/${product.ProductId}`}
                    className="btn btn-success"
                  >
                    <i className="fas fa-cart-plus fa-lg mr-2" />
                    Chỉnh sửa
                  </Link>
                  <button onClick={() => handleTrashClick(product.ProductId)} className="btn btn-danger">
                    <i className="fas fa-trash"></i> Xóa
                  </button>
                </div>
                {/* <div className="mt-4 product-share">
                  <a href="#" className="text-gray">
                    <i className="fab fa-facebook-square fa-2x" />
                  </a>
                  <a href="#" className="text-gray">
                    <i className="fab fa-twitter-square fa-2x" />
                  </a>
                  <a href="#" className="text-gray">
                    <i className="fas fa-envelope-square fa-2x" />
                  </a>
                  <a href="#" className="text-gray">
                    <i className="fas fa-rss-square fa-2x" />
                  </a>
                </div> */}
              </div>
            </div>
            {/* <div className="row mt-4">
              <nav className="w-100">
                <div className="nav nav-tabs" id="product-tab" role="tablist">
                  <a
                    className="nav-item nav-link active"
                    id="product-desc-tab"
                    data-toggle="tab"
                    href="#product-desc"
                    role="tab"
                    aria-controls="product-desc"
                    aria-selected="true"
                  >
                    Description
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="product-comments-tab"
                    data-toggle="tab"
                    href="#product-comments"
                    role="tab"
                    aria-controls="product-comments"
                    aria-selected="false"
                  >
                    Comments
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="product-rating-tab"
                    data-toggle="tab"
                    href="#product-rating"
                    role="tab"
                    aria-controls="product-rating"
                    aria-selected="false"
                  >
                    Rating
                  </a>
                </div>
              </nav>
              <div className="tab-content p-3" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="product-desc"
                  role="tabpanel"
                  aria-labelledby="product-desc-tab"
                >
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  vitae condimentum erat. Vestibulum ante ipsum primis in
                  faucibus orci luctus et ultrices posuere cubilia Curae; Sed
                  posuere, purus at efficitur hendrerit, augue elit lacinia
                  arcu, a eleifend sem elit et nunc. Sed rutrum vestibulum est,
                  sit amet cursus dolor fermentum vel. Suspendisse mi nibh,
                  congue et ante et, commodo mattis lacus. Duis varius finibus
                  purus sed venenatis. Vivamus varius metus quam, id dapibus
                  velit mattis eu. Praesent et semper risus. Vestibulum erat
                  erat, condimentum at elit at, bibendum placerat orci. Nullam
                  gravida velit mauris, in pellentesque urna pellentesque
                  viverra. Nullam non pellentesque justo, et ultricies neque.
                  Praesent vel metus rutrum, tempus erat a, rutrum ante. Quisque
                  interdum efficitur nunc vitae consectetur. Suspendisse
                  venenatis, tortor non convallis interdum, urna mi molestie
                  eros, vel tempor justo lacus ac justo. Fusce id enim a erat
                  fringilla sollicitudin ultrices vel metus.{" "}
                </div>
                <div
                  className="tab-pane fade"
                  id="product-comments"
                  role="tabpanel"
                  aria-labelledby="product-comments-tab"
                >
                  {" "}
                  Vivamus rhoncus nisl sed venenatis luctus. Sed condimentum
                  risus ut tortor feugiat laoreet. Suspendisse potenti. Donec et
                  finibus sem, ut commodo lectus. Cras eget neque dignissim,
                  placerat orci interdum, venenatis odio. Nulla turpis elit,
                  consequat eu eros ac, consectetur fringilla urna. Duis gravida
                  ex pulvinar mauris ornare, eget porttitor enim vulputate.
                  Mauris hendrerit, massa nec aliquam cursus, ex elit euismod
                  lorem, vehicula rhoncus nisl dui sit amet eros. Nulla turpis
                  lorem, dignissim a sapien eget, ultrices venenatis dolor.
                  Curabitur vel turpis at magna elementum hendrerit vel id dui.
                  Curabitur a ex ullamcorper, ornare velit vel, tincidunt ipsum.{" "}
                </div>
                <div
                  className="tab-pane fade"
                  id="product-rating"
                  role="tabpanel"
                  aria-labelledby="product-rating-tab"
                >
                  {" "}
                  Cras ut ipsum ornare, aliquam ipsum non, posuere elit. In hac
                  habitasse platea dictumst. Aenean elementum leo augue, id
                  fermentum risus efficitur vel. Nulla iaculis malesuada
                  scelerisque. Praesent vel ipsum felis. Ut molestie, purus
                  aliquam placerat sollicitudin, mi ligula euismod neque, non
                  bibendum nibh neque et erat. Etiam dignissim aliquam ligula,
                  aliquet feugiat nibh rhoncus ut. Aliquam efficitur lacinia
                  lacinia. Morbi ac molestie lectus, vitae hendrerit nisl.
                  Nullam metus odio, malesuada in vehicula at, consectetur nec
                  justo. Quisque suscipit odio velit, at accumsan urna
                  vestibulum a. Proin dictum, urna ut varius consectetur, sapien
                  justo porta lectus, at mollis nisi orci et nulla. Donec
                  pellentesque tortor vel nisl commodo ullamcorper. Donec varius
                  massa at semper posuere. Integer finibus orci vitae vehicula
                  placerat.{" "}
                </div>
              </div>
            </div> */}
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </section>
    </div>
  );
};

export default ProductShow;
