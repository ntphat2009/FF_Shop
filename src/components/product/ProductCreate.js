import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const ProductCreate = () => {
  const token = localStorage.getItem('token');

  const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    Name: "",
    Description: "",
    Price: "",
    CreatedById: "",
    UpdatedById: "",
    CategoryId: "",
    BrandId: ""
  });
  // fetch data category && user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://localhost:44389/api/Account");
        const responseBrand = await axios.get("https://localhost:44389/api/Brand");
        const responseCate = await axios.get("https://localhost:44389/api/Category");
        const responseTags = await axios.get("https://localhost:44389/api/Tag");


        // const filteredCategories = response.data.filter(category => category.Status);
        // console.log(response.data)
        setUsers(response.data);
        setBrand(responseBrand.data);
        setCategory(responseCate.data);
        setTags(responseTags.data); // Set tags
        console.log(tags)

      } catch (error) {
        console.error("Lỗi khi gọi API aaaaa:", error);
      }
    };

    fetchUsers();

    return () => { };
  }, []);
  const currentDate = new Date().toISOString();


  const [data, setData] = useState({
    Name: "",
    Description: "",
    // Discount: "0",
    ShortDes: "",
    ImageDes: "",
    Price: "",
    CategoryId: "",
    BrandId: "",
    Image: "",
    CreatedById: "",
    UpdatedById: "",
    Status: true,
    Created_At: currentDate,
    Updated_At: currentDate,
    Width: "",
    Height: "",
    Material: "",
    Color: "",
    Policy: "",


  });
 
  const handleImageChange = (e) => {
    setData({
      ...data,
      Image: e.target.files[0].name,

    });

  };
  const handleImageDesChange = (e) => {
    setData({
      ...data,
      ImageDes: e.target.files[0].name,

    });

  };
  const handleTagChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setSelectedTags(
        selectedTags.includes(value)
          ? selectedTags.filter(tagId => tagId !== value)
          : [...selectedTags, value]
      );
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
  
    setErrors({
      Name: !data.Name ? "Vui lòng nhập tên sản phẩm." : "",
      Description: !data.Description ? "Vui lòng nhập mô tả sản phẩm." : "",
      Price: !data.Price ? "Vui lòng nhập giá." : "",
      CreatedById: !data.CreatedById ? "Vui lòng chọn người tạo." : "",
      UpdatedById: !data.UpdatedById ? "Vui lòng chọn người cập nhật." : "",
      CategoryId: !data.CategoryId ? "Vui lòng chọn ngành hàng." : "",
      BrandId: !data.BrandId ? "Vui lòng chọn thương hiệu." : ""
    });
  
    // Check for errors
    const hasError = Object.values(errors).some(error => error !== "");
    if (hasError) {
      return;
    }
  
    const validTagIds = selectedTags.filter(tagId => !isNaN(tagId)); // Remove NaN values
  
    const productData = {
      ...data,
      TagIds: validTagIds // Include only valid tags
    };
  
    try {
      const response = await axios.post(
        "https://localhost:44389/api/Products",
        productData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  console.log("Product",productData)
      if (response.status === 200) {
       
        toast.success("Thêm thành công!");
        window.location.href = "/admin/product";
       
      } else if (response.status === 403) {
        toast.error("Bạn chưa được cấp quyền này");
      } else {
        // Handle other errors
        toast.error("Lỗi khi tạo sản phẩm!");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Vui lòng đăng nhập lại để tiếp tục!");
      } else if (error.response && error.response.status === 500) {
        setErrorMessage("Tên sản phẩm đã tồn tại. Vui lòng chọn tên khác.");
      } else {
        console.log('Lỗi khi gửi dữ liệu lên server:', error);
      }
    }
  };
  

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
                  <a href="#">Sản phẩm</a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Tạo mới danh mục</h3>
            <div className="card-tools">
              <Link to={`../admin/product`} type="button" className="btn btn-success">
                <i class="fas fa-angle-double-left"> Quay lại danh sách</i>
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
              <div className="col-sm-6"><div className="form-group">
                <label htmlFor="">Tên sản phẩm</label>
                <input
                  type="name"
                  className="form-control "
                  id="e"
                  aria-describedby=""
                  placeholder="Nhập tên sản phẩm"
                  value={data.Name}
                  onChange={(e) => setData({ ...data, Name: e.target.value })}
                />
                <p style={{ color: "red" }}>{errors.Name}</p>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              </div>
              <div className="form-group ">
                  <label htmlFor="exampleInputPassword1">Mô tả ngắn</label>
                  <input
                    type=""
                    className="form-control "
                    id=""
                    placeholder="Nhập mô tả "
                    value={data.ShortDes}
                    onChange={(e) => setData({ ...data, ShortDes: e.target.value })}
                  />
                </div>
                <div className="form-group ">
                  <label htmlFor="exampleInputPassword1">Mô tả sản phẩm</label>
                  <input
                    type=""
                    className="form-control "
                    id=""
                    placeholder="Nhập mô tả sản phẩm"
                    value={data.Description}
                    onChange={(e) => setData({ ...data, Description: e.target.value })}
                  />
                </div>
                <p style={{ color: "red" }}>{errors.Description}</p>
                <div className="form-group ">
                  <label htmlFor="exampleInputPassword1">Giá</label>
                  <input
                    type="number"
                    className="form-control "
                    id=""
                    placeholder="Nhập giá niêm yết"
                    value={data.Price}
                    onChange={(e) => setData({ ...data, Price: e.target.value })}
                  />
                </div>
                <p style={{ color: "red" }}>{errors.Price}</p>
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
                  <label htmlFor="productImage">Hình ảnh Mô tả</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="productImage"
                    accept="image/*"
                    onChange={handleImageDesChange}
                  />
                </div>
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
              <div className="col-sm-4 ">
              <div className="form-group ">
                  <label htmlFor="exampleInputPassword1">Màu sắc</label>
                  <input
                    type="text"
                    className="form-control "
                    id=""
                    placeholder="Nhập màu sắc sản phẩm"
                    value={data.Color}
                    onChange={(e) => setData({ ...data, Color: e.target.value })}
                  />
                </div>
              <div className="form-group ">
                  <label htmlFor="exampleInputPassword1">Rộng</label>
                  <input
                    type="text"
                    className="form-control "
                    id=""
                    placeholder="Nhập chiều rộng sản phẩm"
                    value={data.Width}
                    onChange={(e) => setData({ ...data, Width: e.target.value })}
                  />
                </div>
                <div className="form-group ">
                  <label htmlFor="exampleInputPassword1">Cao</label>
                  <input
                    type="text"
                    className="form-control "
                    id=""
                    placeholder="Nhập chiều cao sản phẩm"
                    value={data.Height}
                    onChange={(e) => setData({ ...data, Height: e.target.value })}
                  />
                </div>
                <div className="form-group ">
                  <label htmlFor="exampleInputPassword1">Chính sách sản phẩm</label>
                  <input
                    type="text"
                    className="form-control "
                    id=""
                    placeholder="Nhập chính sách sản phẩm"
                    value={data.Policy}
                    onChange={(e) => setData({ ...data, Policy: e.target.value })}
                  />
                </div>
                <div className="form-group ">
                  <label htmlFor="exampleInputPassword1">Chất liệu sản phẩm</label>
                  <input
                    type="text"
                    className="form-control "
                    id=""
                    placeholder="Nhập chất liệu sản phẩm"
                    value={data.Material}
                    onChange={(e) => setData({ ...data, Material: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productSelect">Ngành hàng :</label>
                  <select
                    className="form-control col-sm-5"
                    id="productSelect"
                    value={data.CategoryId}
                    onChange={(e) => setData({ ...data, CategoryId: e.target.value })}
                  >
                    <option value="">Chọn ngành hàng</option>
                    {category.map((category) => (
                      <option key={category.Id} value={category.Id}>{category.Name}</option>
                    ))}
                  </select>
                </div>
                <p style={{ color: "red" }}>{errors.CategoryId}</p>
                <div className="form-group">
                  <label htmlFor="productSelect">Thương hiệu :</label>
                  <select
                    className="form-control col-sm-5"
                    id="productSelect"
                    value={data.BrandId}
                    onChange={(e) => setData({ ...data, BrandId: e.target.value })}
                  >
                    <option value="">Chọn thương hiệu</option>
                    {brand.map((brand) => (
                      <option key={brand.Id} value={brand.Id}>{brand.Name}</option>
                    ))}
                  </select>
                </div>
                <p style={{ color: "red" }}>{errors.BrandId}</p>
                <div className="form-group">
                  <label htmlFor="productSelect">Tạo bởi :</label>
                  <select
                    className="form-control col-sm-5"
                    id="productSelect"
                    value={data.CreatedById}
                    onChange={(e) => setData({ ...data, CreatedById: e.target.value })}
                  >
                    <option value="">Chọn người tạo</option>
                    {users.map((user) => (
                      <option key={user.Id} value={user.Id}>{user.LastName} {user.FirstName}</option>
                    ))}
                  </select>
                </div>
                <p style={{ color: "red" }}>{errors.CreatedById}</p>
                <div className="form-group">
                  <label htmlFor="productSelect">Cập nhật bởi :</label>
                  <select
                    className="form-control col-sm-5"
                    id="productSelect"
                    value={data.UpdatedById}
                    onChange={(e) => setData({ ...data, UpdatedById: e.target.value })}
                  >
                    <option value="">Chọn cập nhập</option>
                    {users.map((user) => (
                      <option key={user.Id} value={user.Id}>{user.LastName} {user.FirstName}</option>
                    ))}
                  </select>
                </div>
                <p style={{ color: "red" }}>{errors.UpdatedById}</p>
              </div>
            </div>
            <button type="submit" className="btn btn-success my-3">Tạo mới</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ProductCreate;
