import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const ProductSearch = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [tag, setTag] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const formatPrice = (number) => {
        return number.toLocaleString('vi-VN');
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get('searchTerm');
        setSearchTerm(searchQuery);
        console.log('Search term:', searchQuery);
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`https://localhost:44389/api/Products?search=${searchQuery}`);
                const responseCate = await axios.get(`https://localhost:44389/api/Category`);
                const responseBrand = await axios.get(`https://localhost:44389/api/Brand`);
                const filteredBrand = responseBrand.data.filter(brand => brand.Status);
                setBrand(filteredBrand);
                const filteredProducts = response.data.filter(product => product.Status);
                const filteredCate = responseCate.data.filter(items => items.Status);
                console.log(filteredProducts)
                const responseTag = await axios.get(`https://localhost:44389/api/Tag`);

                const filteredTag = responseTag.data.filter(items => items.Status);
                setTag(filteredTag);


                setCategory(filteredCate);
                // setSearchResults(response.data);
                setSearchResults(filteredProducts);


            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchSearchResults();
    }, [location.search]);
    const itemsPerPage = 4; // Số lượng sản phẩm trên mỗi trang


    const handleTagSelect = (tagId) => {
        setSelectedTags(prevTags => {
            if (prevTags.includes(tagId)) {
                return prevTags.filter(id => id !== tagId);
            } else {
                return [...prevTags, tagId];
            }
        });
    };


    const filteredProducts = searchResults.filter(searchResults => {
        if (!searchResults.ProductTags || searchResults.ProductTags.length === 0) {
            return selectedTags.length === 0;
        }
        return selectedTags.length === 0 || selectedTags.every(tagId => searchResults.ProductTags.some(tag => tag.TagId === tagId));
    });
    const addToCart = async (product) => {
        try {
            // Lấy dữ liệu từ AsyncStorage
            const existingCart = await sessionStorage.getItem('cart');

            // Chuyển dữ liệu từ JSON string thành mảng (nếu có)
            const cart = existingCart ? JSON.parse(existingCart) : [];

            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === product.ProductId);

            if (existingItemIndex !== -1) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
                cart[existingItemIndex].quantity += 1;
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng với số lượng là 1
                cart.push({ ...product, quantity: 1 });
            }

            // Lưu giỏ hàng mới vào AsyncStorage
            await sessionStorage.setItem('cart', JSON.stringify(cart));

            toast.success('Sản phẩm đã được thêm vào giỏ hàng!');
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error);
        }
    };
    if (!filteredProducts) {
        return <div>Loading...</div>;
    }
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
            <>
                <section class="section-content padding-y">
                    <ToastContainer />
                    <div class="container">


                        {/*-- ============================  FILTER TOP  ================================= */}

                        <div class="card mb-3">
                            <div class="card-body">
                                <ol class="breadcrumb float-left">
                                    <li class="breadcrumb-item"><a href="/" className='text-default'>Trang chủ</a></li>
                                    <li class="breadcrumb-item"><a href="#" className='text-default'>Tìm kiếm : {searchTerm}</a></li>


                                </ol>
                            </div> {/*-- card-body .// */}
                        </div>

                        {/*-- ============================ FILTER TOP END.// ================================= */}


                        <div class="row">
                            <aside class="col-md-2">

                                <article class="filter-group">
                                    <h6 class="title">
                                        <a href="#" class="dropdown-toggle text-default" data-toggle="collapse" data-target="#collapse_1">	 Ngành hàng </a>
                                    </h6>
                                    <div class="filter-content collapse show" id="collapse_1">
                                        <div class="inner">
                                            <ul class="list-menu">
                                                {category.map(cate => (
                                                    <li key={cate.Id}>
                                                        <Link to={`/products/category/${cate.Id}`} className="text-default">{cate.Name}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div> {/*-- inner.// */}
                                    </div>
                                </article> {/*-- filter-group  .// */}
                                <article class="filter-group">
                                    <h6 class="title">
                                        <a href="#" class="dropdown-toggle text-default" data-toggle="collapse" data-target="#collapse_2"> Thương hiệu </a>
                                    </h6>
                                    <div class="filter-content collapse show" id="collapse_2">
                                        <div class="inner">
                                            <ul class="list-menu">
                                                {brand.map(brand => (
                                                    <li key={brand.Id}>
                                                        <Link to={`/products/brand/${brand.Id}`} className="text-default">{brand.Name}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div> {/*-- inner.// */}
                                    </div>
                                </article> {/*-- filter-group .// */}
                                <article class="filter-group">
                                    <h6 class="title">
                                        <a href="#" class="dropdown-toggle" data-toggle="collapse" data-target="#collapse_3"> Vùng giá </a>
                                    </h6>
                                    <div class="filter-content collapse show" id="collapse_3">
                                        <div class="inner">
                                            <input type="range" class="custom-range" min="0" max="100" name="" />
                                            <div class="form-row">
                                                <div class="form-group col-md-6">
                                                    <label>Min</label>
                                                    <input class="form-control" placeholder="$0" type="number" />
                                                </div>
                                                <div class="form-group text-right col-md-6">
                                                    <label>Max</label>
                                                    <input class="form-control" placeholder="$1,0000" type="number" />
                                                </div>
                                            </div> {/*-- form-row.// */}
                                            <button class="btn btn-block btn-info">Nhập</button>
                                        </div> {/*-- inner.// */}
                                    </div>
                                </article> {/*-- filter-group .// */}

                                <article class="filter-group">
                                    <h6 class="title">
                                        <a href="#" class="dropdown-toggle" data-toggle="collapse" data-target="#collapse_5"> Tình trạng </a>
                                    </h6>
                                    <div class="filter-content collapse show" id="collapse_5">
                                        <div class="inner">
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
                                        </div> {/*-- inner.// */}
                                    </div>
                                </article> {/*-- filter-group .// */}

                            </aside> {/*-- col.// */}
                            <main class="col-md-10">


                                <header class="mb-3">
                                    <div class="form-inline">
                                        <strong class="mr-md-auto">
                                            {searchResults.length} sản phẩm được tìm thấy
                                        </strong>

                                    </div>
                                </header>{/*-- sect-heading */}

                                {currentPageItems.map(product => (
                                    <article class="card card-product-list" key={product.ProductId}>
                                        <div class="row no-gutters">
                                            <aside class="col-md-3">
                                                <a href="#" class="img-wrap">
                                                    <span class="badge badge-danger"> NEW </span>
                                                    <img src={product.Image}></img>

                                                    {/* <img src={`http://localhost:3000/assetad/dist/img/${product.Immage}`}></img> */}
                                                    <img src={require(`../../../public/images/items/img/${product.Image}`)} />


                                                </a>
                                            </aside> {/*-- col.// */}
                                            <div class="col-md-6">
                                                <div class="info-main">
                                                    <Link to={`/products/${product.ProductId}`} class="h5 title text-info">{product.Name}</Link>
                                                    {/* <a href="#" class="h5 title"> Hot sale unisex New Design Shirt</a> */}
                                                    <div class="rating-wrap mb-2">
                                                        <ul class="rating-stars">
                                                            <li style={{ width: '100%' }} class="stars-active">
                                                                <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                                                                <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                                                                <i class="fa fa-star"></i>
                                                            </li>
                                                            <li>
                                                                <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                                                                <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                                                                <i class="fa fa-star"></i>
                                                            </li>
                                                        </ul>
                                                        <div class="label-rating">9/10</div>
                                                    </div> {/*-- rating-wrap.// */}

                                                    <p class="mb-3">
                                                        <span class="tag"> <i class="fa fa-check"></i> Chính hãng</span>
                                                        <span class="tag"> Bảo hành 5 năm </span>
                                                        <span class="tag"> 80 Đánh giá </span>
                                                        <span class="tag"> USA </span>
                                                    </p>

                                                    <p> {product.ShortDesc} </p>

                                                </div> {/*-- info-main.// */}
                                            </div> {/*-- col.// */}
                                            <aside class="col-sm-3">
                                                <div class="info-aside">
                                                    <div class="price-wrap">
                                                        <span class="h5 price">{formatPrice(product.Price)} VND</span>
                                                        <small class="text-muted">/sản phẩm</small>
                                                        <p class="h5 price">{formatPrice(product.Discount)} VND</p>


                                                    </div> {/*-- price-wrap.// */}
                                                    <p className="text-success">Free shipping</p>

                                                    <small class="text-warning">Đổi trả</small>

                                                    <p>


                                                    <button onClick={()=>addToCart(product)} className="btn btn-outline-info" style={{width:"100%"}}><i class="fas fa-cart-arrow-down"></i>{"   "}Thêm vào giỏ  </button>

                                                        {/* <a href="#" className="btn btn-light btn-block">
														<i className="fa fa-heart"></i> <span className="text">Add to wishlist</span>
													</a> */}
                                                    </p>
                                                    <br></br>
                                                    <p>
                                                        <Link to={`/products/${product.ProductId}`} className="btn btn-outline-info btn-block "><i class="far fa-eye"></i>{"   "}Chi tiết</Link>

                                                    </p>
                                                </div> {/*-- info-aside.// */}
                                            </aside> {/*-- col.// */}
                                        </div> {/*-- row.// */}
                                    </article>
                                )

                                )}







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


                                <div class="box text-center">
                                    <p>Bạn đã tìm thấy những gì bạn đang tìm kiếm？</p>
                                    <a href="" class="btn btn-light">Có</a>
                                    <a href="" class="btn btn-light">Không</a>
                                </div>


                            </main> {/*-- col.// */}

                        </div>

                    </div> {/*-- container .//  */}
                </section>
            </>
        </div>
    )
}

export default ProductSearch
