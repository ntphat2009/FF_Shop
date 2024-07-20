

import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

const ShoppingCart = () => {
	const [cart, setCart] = useState([]);

	const isLoggedIn = !!sessionStorage.getItem('token');

	useEffect(() => {
		const getCartData = async () => {
			try {
				const existingCart = await sessionStorage.getItem('cart');
				const cartData = existingCart ? JSON.parse(existingCart) : [];
				setCart(cartData);
			} catch (error) {
				console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
			}
		};

		getCartData();
	}, []);
	console.log(cart)
	const updateQuantity = async (productId, newQuantity) => {
		try {
			const existingCart = await sessionStorage.getItem('cart');
			const cartData = existingCart ? JSON.parse(existingCart) : [];

			const updatedCart = cartData.map((item) => {
				if (item.ProductId === productId) { // Sử dụng item.ProductId thay vì item.id
					return { ...item, quantity: newQuantity };
				}
				return item;
			});

			await sessionStorage.setItem('cart', JSON.stringify(updatedCart));
			setCart(updatedCart); // Đảm bảo rằng state được cập nhật sau khi thay đổi giỏ hàng
		} catch (error) {
			console.error('Lỗi khi cập nhật số lượng sản phẩm trong giỏ hàng:', error);
		}
	};

	const removeItemFromCart = async (productId) => {
		try {
			const existingCart = await sessionStorage.getItem('cart');
			const cartData = existingCart ? JSON.parse(existingCart) : [];

			// Lọc ra sản phẩm cần xóa bằng cách sử dụng ProductId
			const updatedCart = cartData.filter((item) => item.ProductId !== productId);

			await sessionStorage.setItem('cart', JSON.stringify(updatedCart));
			setCart(updatedCart);
		} catch (error) {
			console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
		}
	};
	const formatPrice = (number) => {
        return number.toLocaleString('vi-VN');
      };
	// const clearCart = () => {
	// 	try {
	// 		isLoggedIn
	// 	} catch (error) {
	// 		console.error('Lỗi khi xóa giỏ hàng:', error);
	// 	}
	// };
	const renderCartItem = (item) => (
		<tr key={item.ProductId}>
			<td>
				<figure className="itemside">

					<div className="aside"><img src={require(`../../../public/images/items/img/${item.Image}`)} className="img-sm" alt={item.Name} /></div>

					{/* <div className="aside"><img src={`http://localhost:3000/images/items/img/${item.Image}`} className="img-sm" alt={item.Name} /></div> */}
					<figcaption className="info">
						<a href="#" className="title text-dark">{item.Name} </a>
						<p className="text-muted small"> <br /> Brand: {item.BrandName}</p>
					</figcaption>
				</figure>
			</td>
			<td>
				<select className="form-control" value={item.quantity} onChange={(e) => updateQuantity(item.ProductId, e.target.value)}>
					{[...Array(20).keys()].map((num) => (
						<option key={num + 1} value={num + 1}>{num + 1}</option>
					))}
				</select>
			</td>
			<td style={{width:"190px"}}>
				<div className="price-wrap"  >
					<p className="price text-6">{formatPrice(item.Price)} VNĐ</p>
					<small className="text-muted"> /Sản phẩm</small>
				</div>
			</td>
			<td className="text-right" style={{width:"50px"}}>
				<button className="btn btn-light" style={{width:"150px"}} onClick={() => removeItemFromCart(item.ProductId)}>Xóa</button>

			</td>
		</tr>
	);
	const getTotalPrice = () => {
		return cart.reduce((total, item) => total + (item.Price * item.quantity), 0);
	};
	return (
		<div>
			<section className="section-content padding-y">
				<div className="container">
					<div className="row">
						<main className="col-md-9">
							<div className="card">
								<table className="table table-borderless table-shopping-cart">
									<thead className="text-muted">
										<tr className="small text-uppercase">
											<th scope="col">Sản Phẩm</th>
											<th scope="col" width="120">Số lượng</th>
											<th scope="col" width="120">Giá</th>
											<th scope="col" className="text-right" width="200"> </th>
										</tr>
									</thead>
									<tbody>
										{cart.map((item) => renderCartItem(item))}

									</tbody>
								</table>

								<div className="card-body border-top">
								
									{isLoggedIn ? (
										// Đã đăng nhập: Điều hướng đến trang profile
										<Link to={"/checkout"} className="btn btn-info float-md-right"> <i className="fa fa-chevron-right"></i> Đặt hàng</Link>

									) : (
										// Chưa đăng nhập: Điều hướng đến trang đăng nhập
										<Link to={"/signin"} className="btn btn-info float-md-right"> <i className="fa fa-chevron-right"></i>Đăng nhập để đặt hàng</Link>
										
									)}
									<Link to={"/allproducts"} className="btn btn-light"> <i className="fa fa-chevron-left"></i> Tiếp tục mua sắm</Link>
								</div>
							</div>

							<div className="alert alert-success mt-3">
								<p className="icontext"><i className="icon text-success fa fa-truck"></i> Giao hàng miễn phí trong vòng 1-2 tuần</p>
							</div>
						</main>
						<aside class="col-md-3">
							<div class="card mb-3">
								<div class="card-body">
									<form>
										<div class="form-group">
											<label>Bạn có mã giảm giá?</label>
											<div class="input-group">
												<input type="text" class="form-control" name="" placeholder="Coupon code" />
												<span class="input-group-append">
													<button class="btn btn-info">Nhập</button>
												</span>
											</div>
										</div>
									</form>
								</div> {/* card-body.// */}
							</div>  {/* card .// */}
							<div class="card">
								<div class="card-body">
									<dl class="dlist-align">
										<dt>Tổng giá:</dt>
										<dd class="price text-right">{formatPrice(getTotalPrice())} VNĐ</dd>
									</dl>
								
									<hr />
									<p class="text-center mb-3">
										<img src="images/misc/payments.png" height="26" />
									</p>
								</div> {/* card-body.// */}
							</div>  {/* card .// */}
						</aside> {/* col.// */}
					</div>
				</div>
			</section>
		</div>
	);
}
export default ShoppingCart;
