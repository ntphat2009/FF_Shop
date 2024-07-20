import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const ProductBrand = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { brandId } = useParams();
	const [product, setProduct] = useState([]);
	const [category, setCategory] = useState([]);
	const [brand, setBrand] = useState([]);
	const [tag, setTag] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	const formatPrice = (number) => {
		return number.toLocaleString('vi-VN');
	};
	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await axios.get(`https://localhost:44389/api/Products/brand/${brandId}`);
				const responseCate = await axios.get(`https://localhost:44389/api/Category`);
				const responseTag = await axios.get(`https://localhost:44389/api/Tag`);

				const filteredTag = responseTag.data.filter(items => items.Status);
				setTag(filteredTag);

				const filteredProducts = response.data.filter(items => items.Status);
				const filteredCate = responseCate.data.filter(items => items.Status);
				const responseBrand = await axios.get(`https://localhost:44389/api/Brand`);
				const filteredBrand = responseBrand.data.filter(brand => brand.Status);

				setBrand(filteredBrand);
				setProduct(filteredProducts);
				setCategory(filteredCate);
			} catch (error) {
				console.error('Lỗi khi gọi API:', error);
			}
		};

		fetchProduct();
	}, [brandId]);

	const handleTagSelect = (tagId) => {
		setSelectedTags(prevTags => {
			if (prevTags.includes(tagId)) {
				return prevTags.filter(id => id !== tagId);
			} else {
				return [...prevTags, tagId];
			}
		});
	};


	const filteredProducts = product.filter(product => {
		if (!product.ProductTags || product.ProductTags.length === 0) {
			return selectedTags.length === 0;
		}
		return selectedTags.length === 0 || selectedTags.every(tagId => product.ProductTags.some(tag => tag.TagId === tagId));
	});
	const addToCart = async (product) => {
        try {
            // Lấy dữ liệu từ sessionStorage
            const existingCart = await sessionStorage.getItem('cart');
    
            // Chuyển dữ liệu từ JSON string thành mảng (nếu có)
            const cart = existingCart ? JSON.parse(existingCart) : [];
    
            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingItemIndex = cart.findIndex((cartItem) => cartItem.ProductId === product.ProductId);
    
            if (existingItemIndex !== -1) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
                cart[existingItemIndex].quantity += 1;
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng với số lượng là 1
                cart.push({ ...product, quantity: 1 });
            }
    
            // Lưu giỏ hàng mới vào sessionStorage
            await sessionStorage.setItem('cart', JSON.stringify(cart));
    
            toast.success("Sản phẩm đã được thêm vào giỏ hàng");
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error);
        }
    };
	
	  
	if (!filteredProducts) {
		return <div>Loading...</div>;
	}

	const itemsPerPage = 4;
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
		<div>
			<section className="section-content padding-y">
				<ToastContainer/>
				<div className="container">
					{product.length > 0 && (
						<div className="card mb-3">
							<div className="card-body">
								<ol className="breadcrumb float-left">
									<li className="breadcrumb-item "><a href="/" className='text-default'>Trang chủ</a></li>
									<li className="breadcrumb-item "><a href="#" className='text-default'>{product[0].BrandName}</a></li>
									
								</ol>
							</div>
						</div>
					)}

					<div className="row">
						<aside className="col-md-2">
							<article className="filter-group">
								<h6 className="title ">
									<a href="#" className="dropdown-toggle text-default" data-toggle="collapse" data-target="#collapse_1">Ngành hàng</a>
								</h6>
								<div className="filter-content collapse show" id="collapse_1">
									<div className="inner">
										<ul className="list-menu">
											{category.map(cate => (
												<li key={cate.Id}>
													<Link to={`/products/category/${cate.Id}`} className="text-default">{cate.Name}</Link>
												</li>
											))}
										</ul>
									</div>
								</div>
							</article>
							<article className="filter-group">
								<h6 className="title ">
									<a href="#" className="dropdown-toggle text-default" data-toggle="collapse" data-target="#collapse_2">Thương hiệu</a>
								</h6>
								<div className="filter-content collapse show" id="collapse_2">
									<div className="inner">
										<ul className="list-menu">
											{brand.map(brand => (
												<li key={brand.Id}>
													<Link to={`/products/brand/${brand.Id}`} className="text-default">{brand.Name}</Link>
												</li>
											))}
										</ul>
									</div>
								</div>
							</article>
							<article className="filter-group">
								<h6 className="title">
									<a href="#" className="dropdown-toggle" data-toggle="collapse" data-target="#collapse_5">Tình trạng</a>
								</h6>
								<div className="filter-content collapse show" id="collapse_5">
									<div className="inner">
										{tag.map(tag => (
											<label className="custom-control custom-checkbox" key={tag.Id}>
												<input
													type="checkbox"
													className="custom-control-input"
													checked={selectedTags.includes(tag.Id)}
													onChange={() => handleTagSelect(tag.Id)}
												/>
												<div className="custom-control-label">{tag.Name}</div>
											</label>
										))}
									</div>
								</div>
							</article>
						</aside>
						<main className="col-md-10">
							<header className="mb-3">
								<div className="form-inline">
									<strong className="mr-md-auto">{filteredProducts.length} Sản phẩm tìm thấy</strong>
									{/* <select className="mr-2 form-control">
										<option>Latest items</option>
										<option>Trending</option>
										<option>Most Popular</option>
										<option>Cheapest</option>
									</select>
									<div className="btn-group">
										<a href="page-listing-grid.html" className="btn btn-light" data-toggle="tooltip" title="List view">
											<i className="fa fa-bars"></i>
										</a>
										<a href="page-listing-large.html" className="btn btn-light active" data-toggle="tooltip" title="Grid view">
											<i className="fa fa-th"></i>
										</a>
									</div> */}
								</div>
							</header>

							{currentPageItems.map(products => (
								<article className="card card-product-list" key={products.ProductId}>
									<div className="row no-gutters">
										<aside className="col-md-3">
											<a href="#" className="img-wrap">
												<span className="badge badge-danger"> NEW </span>
												<img src={require(`../../../public/images/items/img/${products.Image}`)} alt={products.Name} />
											</a>
										</aside>
										<div className="col-md-6">
											<div className="info-main">
												<Link to={`/products/${products.ProductId}`} className="h5 title text-info">{products.Name}</Link>
												<p class="text-muted mt-3">Thương hiệu : {products.BrandName}</p>
													<p class="text-muted mt-3">Ngành hàng : {products.CategoryName}</p>
												<div className="rating-wrap mb-2">
													<ul className="rating-stars">
														<li style={{ width: '100%' }} className="stars-active">
															<i className="fa fa-star"></i> <i className="fa fa-star"></i>
															<i className="fa fa-star"></i> <i className="fa fa-star"></i>
															<i className="fa fa-star"></i>
														</li>
														<li>
															<i className="fa fa-star"></i> <i className="fa fa-star"></i>
															<i className="fa fa-star"></i> <i className="fa fa-star"></i>
															<i className="fa fa-star"></i>
														</li>
													</ul>
													<div className="label-rating">{products.Unit} reviews</div>
												</div>
												<p>{products.ShortDesc}</p>

											</div>
										</div>
										<aside className="col-sm-3">
											<div className="info-aside">
												<div className="price-wrap">
													<span class="h5 price">{formatPrice(products.Price)} VND</span>
													<small class="text-muted">/sản phẩm</small>
													<p class="h5 price">{formatPrice(products.Discount)} VND</p>
												</div>
												<p className="text-success">Free shipping</p>
												<br />
												<p>
												

												<button onClick={()=>addToCart(products)} className="btn btn-outline-info" style={{width:"100%"}}><i class="fas fa-cart-arrow-down"></i>{"   "}Thêm vào giỏ  </button>

													{/* <a href="#" className="btn btn-light btn-block">
														<i className="fa fa-heart"></i> <span className="text">Add to wishlist</span>
													</a> */}
												</p>
												<br></br>
                                                    <p>
												    <Link to={`/products/${products.ProductId}`} className="btn btn-outline-info btn-block "><i class="far fa-eye"></i>{"   "}Chi tiết</Link>

                                                    </p>
											</div>
										</aside>
									</div>
								</article>
							))}
							<nav className="mt-4" aria-label="Page navigation sample">
								<ul className="pagination">
									<li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
										<button className="page-link" onClick={handlePreviousPage}>
											Previous
										</button>
									</li>
									{Array.from({ length: totalPages }, (_, index) => (
										<li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage(index + 1)}>
												{index + 1}
											</button>
										</li>
									))}
									<li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
										<button className="page-link" onClick={handleNextPage}>
											Next
										</button>
									</li>
								</ul>
							</nav>
						</main>
					</div>
				</div>
			</section>
		</div>
	);
};
export default ProductBrand;
