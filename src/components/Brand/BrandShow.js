import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const BrandShow = () => {
  const token = localStorage.getItem('token');

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:44389/api/Brand/${id}`);
        setProduct(response.data); 
        console.log(response.data)

        
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
      
    };

    fetchProduct();

    return () => {
    };
  }, [id]);
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
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className="content-wrapper">
      {" "}
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h2>Chi tiết thương hiệu [Brand]</h2>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item">
                <Link className="btn btn-success" to={`../admin/brand`}>
                  Quay về 
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
                
                <div className="col-12 Brand-image-thumbs">
                  <div className="Brand-image-thumb active">
                  {product && product.Image ? ( <img
                      src={require(`../../../public/assetad/dist/img/${product.Image}`)}
                      className="product-image"
                      alt="Product Image"
                    />):("")}
               
                  </div>
                 
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <h3 className="my-3">Tên Thương hiệu</h3>
                <p>{product.Name}</p>
                <hr />
                <h5>Mô tả</h5>
                <p>{product.Description}</p>
                <hr />
                <h5>Trạng thái</h5>
                {
                  product && product.Status == true?("Hiển thị"):("Ẩn")
                }
                <hr />
                <h5>Tạo bởi</h5>
                <p>{product.CreatedBy?.Id}</p>
                <hr />
                <h5>Thời gian Tạo</h5>
                <p>{product.Create_At}</p>
                <hr />
                <h5>Cập nhập bởi</h5>
                <p>{product.UpdatedById}</p>
                <hr />
                <h5>Thời gian cập nhật</h5>
                <p>{product.Update_At}</p>
                <hr />
                <div className="mt-4">
                  <Link
                    to={`../../admin/category/edit/${product.Id}`}
                    className="btn btn-success btn-lg"
                  >
                    <i className="fas fa-cart-plus fa-lg mr-2" />
                    Chỉnh sửa
                  </Link>
                  <button onClick={() => handleTrashClick(product.Id)} className="btn btn-danger">
                    <i className="fas fa-trash"></i> Xóa
                  </button>
                </div>
                {/* <div className="mt-4 Brand-share">
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
                <div className="nav nav-tabs" id="Brand-tab" role="tablist">
                  <a
                    className="nav-item nav-link active"
                    id="Brand-desc-tab"
                    data-toggle="tab"
                    href="#Brand-desc"
                    role="tab"
                    aria-controls="Brand-desc"
                    aria-selected="true"
                  >
                    Description
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="Brand-comments-tab"
                    data-toggle="tab"
                    href="#Brand-comments"
                    role="tab"
                    aria-controls="Brand-comments"
                    aria-selected="false"
                  >
                    Comments
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="Brand-rating-tab"
                    data-toggle="tab"
                    href="#Brand-rating"
                    role="tab"
                    aria-controls="Brand-rating"
                    aria-selected="false"
                  >
                    Rating
                  </a>
                </div>
              </nav>
              <div className="tab-content p-3" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="Brand-desc"
                  role="tabpanel"
                  aria-labelledby="Brand-desc-tab"
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
                  id="Brand-comments"
                  role="tabpanel"
                  aria-labelledby="Brand-comments-tab"
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
                  id="Brand-rating"
                  role="tabpanel"
                  aria-labelledby="Brand-rating-tab"
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

export default BrandShow;
