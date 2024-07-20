import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const Post = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { id } = useParams();
	const [topic, setTopic] = useState([]);
	const [post, setPost] = useState([]);
	const formatPrice = (number) => {
		return number.toLocaleString('vi-VN');
	};
	useEffect(() => {
		const fetchTopic = async () => {
			try {
				const response = await axios.get(`https://localhost:44389/api/Topics`);
				const filteredStatus = response.data.filter(topic => topic.Status);
				setTopic(filteredStatus);


			} catch (error) {
				console.error('Lỗi khi gọi API topic:', error);
			}
		};

		fetchTopic();

		return () => {
		};
	}, []);
	useEffect(() => {
		const fetchPost = async () => {
			try {

				const responsePost = await axios.get(`https://localhost:44389/api/Post/topic/${id}`);
				const filteredPost = responsePost.data.filter(post => post.Status);
				setPost(filteredPost);


			} catch (error) {
				console.error('Lỗi khi gọi API post:', error);
			}
		};

		fetchPost();

		return () => {
		};
	}, [id]);
console.log("id",id)
	const itemsPerPage = 4;
	const totalItems = post.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
	const currentPageItems = post.slice(startIndex, endIndex);

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
					{/* {product.length > 0 && (
						<div className="card mb-3">
							<div className="card-body">
								<ol className="breadcrumb float-left">
									<li className="breadcrumb-item "><a href="/" className='text-default'>Trang chủ</a></li>
									<li className="breadcrumb-item "><a href="#" className='text-default'>{product[0].BrandName}</a></li>
									
								</ol>
							</div>
						</div>
					)} */}

					<div className="row">
						<aside className="col-md-2">
							<article className="filter-group">
								<h6 className="title ">
									<a href="#" className="dropdown-toggle text-default" data-toggle="collapse" data-target="#collapse_1">Danh sách chủ đề</a>
								</h6>
								<div className="filter-content collapse show" id="collapse_1">
									<div className="inner">
										<ul className="list-menu">
											{topic.map(topic => (
												<li key={topic.Id}>
													<Link to={`/topic/${topic.Id}`} className="text-default">{topic.Name}</Link>
												</li>
											))}
										</ul>
									</div>
								</div>
							</article>
							
						</aside>
						<main className="col-md-10">
							<header className="mb-3">
								<div className="form-inline">
									<strong className="mr-md-auto">{post.length} Sản phẩm tìm thấy</strong>
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

							{currentPageItems.map(post => (
								<article className="card card-product-list" key={post.Id}>
									<div className="row no-gutters">
										<aside className="col-md-3">
											<a href="#" className="img-wrap">
												<span className="badge badge-danger"> NEW </span>
												<img src={require(`../../../public/images/items/img/${post.Image}`)} alt={post.Name} />
											</a>
										</aside>
										<div className="col-md-6">
											<div className="info-main">
												<Link to={`/post/${post.ProductId}`} className="h5 title text-info text-truncate">{post.Name}</Link>
												
												<p className='mt-2 text-truncate'>{post.Description}</p>
												<p className='mt-2 text-truncate' >{post.Detail}</p>


											</div>
										</div>
										<aside className="col-sm-3">
											<div className="info-aside">
												
												<p>
												
													<Link to={`/topic/post/${post.Id}`} className="btn btn-info btn-block">
														<i class="far fa-eye"></i><span className="text">Xem chi tiết bài viết</span>
													</Link>
												
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
export default Post;
