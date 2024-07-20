import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const ProductEdit = () => {
  const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUsers = await axios.get("https://localhost:44389/api/Account");
        const responseBrand = await axios.get("https://localhost:44389/api/Brand");
        const responseCategory = await axios.get("https://localhost:44389/api/Category");
        const responseTags = await axios.get("https://localhost:44389/api/Tag");

        setUsers(responseUsers.data);
        setBrand(responseBrand.data);
        setCategory(responseCategory.data);
        setTags(responseTags.data); // Set tags

      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchData();
  }, []);

  const currentDate = new Date().toISOString();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:44389/api/Products/${id}`);
        setProduct(response.data);
        setSelectedTags(response.data.TagIds||[]);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchProduct();

    return () => { };
  }, [id]);
console.log("Productdata",product)
  const handleImageChange = (e) => {
    setProduct({
      ...product,
      Image: e.target.files[0].name,
    });
  };
  const handleImageDesChange = (e) => {
    setProduct({
      ...product,
      ImageDes: e.target.files[0].name,
    });
  };
  
  const handleTagChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      const newSelectedTags = selectedTags.includes(value)
        ? selectedTags.filter(tagId => tagId !== value)
        : [...selectedTags, value];

      setSelectedTags(newSelectedTags);
      setProduct({ ...product, TagIds: newSelectedTags });
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      Name: product.Name,
      Description: product.Description,
      Discount: product.Discount || 0,
      Price: product.Price,
      CategoryId: product.CategoryId,
      Create_At: product.Create_At || currentDate,
      Updated_At: currentDate,
      BrandId: product.BrandId,
      Image: product.Image,
      Status: product.Status,
      CreatedById: product.CreatedById,
      UpdatedById: product.UpdatedById,
      ShortDes:product.ShortDesc,
      ImageDes:product.ImageDes,
      TagIds: selectedTags,
      Width: product.Width,
      Height: product.Height,
      Material: product.Material,
      Color: product.Color,
      Policy: product.Policy,
    };
    // const updatedProduct = {
    //   ...product,
    //   TagIds: selectedTags // Include selected tags
    // };
    console.log("data before update", updatedProduct)

    try {
   
      const response = await axios.put(
        `https://localhost:44389/api/Products/${id}`,
        updatedProduct, // Pass the updatedProduct as the second argument
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 403) {
        toast.error("Bạn chưa được cấp quyền này!")
        return
      }
      if (response.status === 200) {
        toast.success("Cập nhật thành công!")
        window.location.href = "/admin/product";
      } else {
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Vui lòng đăng nhập lại để tiếp tục!");
      }

      else
      if (error.response && error.response.status === 500) {
        setErrorMessage("Tên sản phẩm đã tồn tại. Vui lòng chọn tên khác.");
      } else {
        console.log('Lỗi khi gửi dữ liệu lên server:', error);
      }
    }
  };
  
  
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-wrapper">
      <ToastContainer />
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Trang quản lý sản phẩm [Product]</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={`/admin/product`}>Sản phẩm</Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Cập nhật sản phẩm</h3>
            <div className="card-tools">
              <Link
                to={`/admin/product`}
                type="button"
                className="btn btn-success"
              >
                <i className="fas fa-angle-double-left"> Quay lại danh sách sản phẩm</i>
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
          <form className="ml-3" onSubmit={onSubmit}>
            <div className="row mb-2">
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="">Tên sản phẩm</label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    placeholder="Nhập tên sản phẩm"
                    value={product.Name}
                    onChange={(e) => setProduct({ ...product, Name: e.target.value })}
                  />
                </div>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <div className="form-group">
                  <label htmlFor="description">Mô tả sản phẩm </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Nhập mô tả sản phẩm"
                    value={product.ShortDesc}
                    onChange={(e) => setProduct({ ...product, ShortDesc: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Mô tả chi tiết</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Nhập mô tả sản phẩm"
                    value={product.Description}
                    onChange={(e) => setProduct({ ...product, Description: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Giá</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    placeholder="Nhập giá niêm yết"
                    value={product.Price}
                    onChange={(e) => setProduct({ ...product, Price: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productImage">Hình ảnh sản phẩm</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="productImage"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productImage">Hình ảnh mô tả sản phẩm</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="productImage"
                    accept="image/*"
                    onChange={handleImageDesChange}
                  />
                </div>
                {/* <div className="form-group">
                  <label>Thẻ:</label>
                  <select
                    multiple
                    className="form-control mt-1"
                    value={selectedTags}
                    onChange={handleTagChange}
                  >
                    {tags.map((tag) => (
                      <option className="mt-1" key={tag.Id} value={tag.Id}>{tag.Name}</option>
                    ))}
                  </select>
                </div> */}
                <div className="form-group">
                  <label>Thẻ:</label>
                  <select
                    multiple
                    className="form-control mt-1"
                    value={selectedTags}
                    onChange={handleTagChange}
                  >
                    {tags.map((tag) => (
                      <option className="mt-1" key={tag.Id} value={tag.Id}>{tag.Name}</option>
                    ))}
                  </select>
                </div>
                
              </div>
              <div className="col-sm-6">
              <div className="form-group">
                  <label htmlFor="price">Rộng</label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    placeholder="Nhập chiều rộng"
                    value={product.Width}
                    onChange={(e) => setProduct({ ...product, Width: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Cao</label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    placeholder="Nhập chiều cao"
                    value={product.Height}
                    onChange={(e) => setProduct({ ...product, Height: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Màu sắc</label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    placeholder="Nhập chiều rộng"
                    value={product.Color}
                    onChange={(e) => setProduct({ ...product, Color: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Chất liệu</label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    placeholder="Nhập Chất liệu"
                    value={product.Material}
                    onChange={(e) => setProduct({ ...product, Material: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Chính sách</label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    placeholder="Nhập chính sách"
                    value={product.Policy}
                    onChange={(e) => setProduct({ ...product, Policy: e.target.value })}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="categoryId">Ngành hàng</label>
                  <select
                    className="form-control"
                    id="categoryId"
                    value={product.CategoryId}
                    onChange={(e) => setProduct({ ...product, CategoryId: e.target.value })}
                  >
                    <option value="">Chọn ngành hàng</option>
                    {category.map((cat) => (
                      <option key={cat.Id} value={cat.Id}>{cat.Name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="brandId">Thương hiệu</label>
                  <select
                    className="form-control"
                    id="brandId"
                    value={product.BrandId}
                    onChange={(e) => setProduct({ ...product, BrandId: e.target.value })}
                  >
                    <option value="">Chọn thương hiệu</option>
                    {brand.map((br) => (
                      <option key={br.Id} value={br.Id}>{br.Name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="createdById">Tạo bởi</label>
                  <select
                    className="form-control"
                    id="createdById"
                    value={product.CreatedById}
                    onChange={(e) => setProduct({ ...product, CreatedById: e.target.value })}
                  >
                    <option value="">Chọn người tạo</option>
                    {users.map((user) => (
                      <option key={user.Id} value={user.Id}>{user.LastName} {user.FirstName}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="updatedById">Cập nhật bởi</label>
                  <select
                    className="form-control"
                    id="updatedById"
                    value={product.UpdatedById}
                    onChange={(e) => setProduct({ ...product, UpdatedById: e.target.value })}
                  >
                    <option value="">Chọn người cập nhật</option>
                    {users.map((user) => (
                      <option key={user.Id} value={user.Id}>{user.LastName} {user.FirstName}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-success">Cập nhật</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ProductEdit;
