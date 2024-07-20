import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const AllTopic = () => {
	const [topic, setTopic] = useState([]);
	const [post, setPost] = useState([]);
	const { id } = useParams();
	useEffect(() => {
		const fetchTopic = async () => {
			try {
				const response = await axios.get(`https://localhost:44389/api/Topics`);
				const filteredStatus = response.data.filter(topic => topic.Status);
				setTopic(filteredStatus);


			} catch (error) {
				console.error('Lỗi khi gọi API:', error);
			}
		};

		fetchTopic();

		return () => {
		};
	}, []);
	
	return (
		<>
			<section class="section-content padding-y">
				<div class="container">
					<div class="card mb-3">
						<div class="card-body">
							{/* <div class="row">
								<div class="col-md-2"> Your are here: </div>
								<nav class="col-md-8">
									<ol class="breadcrumb">
										<li class="breadcrumb-item"><a href="#">Home</a></li>
										<li class="breadcrumb-item"><a href="#">Category name</a></li>
										<li class="breadcrumb-item"><a href="#">Sub category</a></li>
										<li class="breadcrumb-item active" aria-current="page">Items</li>
									</ol>
								</nav>
							</div>  */}

							<header class="mb-3">
								<div class="form-inline">
									<strong class="mr-md-auto">{topic.length} Chủ đề</strong>
									
								</div>
							</header>{/* sect-heading */}
							<hr />

							<div class="row">
								{topic && topic.length > 0 ? (topic.map(topic => (
									<div class="col-md-3 "  key={topic.Id}>
										<figure class="card card-product-grid" style={{width:"100%"}}>
											<div class="img-wrap">
												<span class="badge badge-danger"> Hot </span>
												<img src={require(`../../../public/images/items/img/${topic.Image}`)} />

											</div> {/* img-wrap.// */}
											<figcaption class="info-wrap">
												<Link class="text-uppercase font-weight-bold text-default-info mb-2" to={`/topic/${topic.Id}`}>{topic.Name}</Link>




												<hr />

												<p className="mb-2 text-truncate" >
													{topic.Description}
												</p>

												<p class="text-muted ">Số lượng bài viết : {topic.Posts.length}</p>



												<Link to={`/topic/${topic.Id}`} class="btn btn-outline-info mt-3" style={{ width: "100%" }}> <i class="far fa-eye"></i> Xem các bài viết</Link>

											</figcaption>
										</figure>
									</div>
								)

								)) : ("Can't found any topic")}







							</div> {/* row end.// */}


							<nav class="mb-4" aria-label="Page navigation sample">
								<ul class="pagination">
									<li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
									<li class="page-item active"><a class="page-link" href="#">1</a></li>
									<li class="page-item"><a class="page-link" href="#">2</a></li>
									<li class="page-item"><a class="page-link" href="#">3</a></li>
									<li class="page-item"><a class="page-link" href="#">4</a></li>
									<li class="page-item"><a class="page-link" href="#">5</a></li>
									<li class="page-item"><a class="page-link" href="#">Next</a></li>
								</ul>
							</nav>


							<div class="box text-center">
								<p>Did you find what you were looking for？</p>
								<a href="" class="btn btn-light">Yes</a>
								<a href="" class="btn btn-light">No</a>
							</div>

						</div> {/* container .//  */}
					</div>
				</div>
			</section>
		</>
	)
};

export default AllTopic
