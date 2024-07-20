import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [product, setProduct] = useState([]);

    const formatPrice = (number) => {
        return number.toLocaleString('vi-VN');
    };

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`https://localhost:44389/api/Order/id?id=${id}`);
                setOrder(response.data);
            } catch (error) {
                console.error("Error fetching order:", error);
            }
        };
        fetchOrder();
    }, [id]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get("https://localhost:44389/api/Products");
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProduct();
    }, []);

    const renderProductDetails = (productId) => {
        const productDetails = product.find(p => p.ProductId === productId);
        if (productDetails) {
            return (
                <div>
                    <figure className="itemside">
                        <div className="aside">
                            <img src={require(`../../../public/images/items/img/${productDetails.Image}`)} className="img-sm" alt={productDetails.Name} />
                        </div>
                        <figcaption className="info">
                            <a href="#" className="title text-dark">{productDetails.Name}</a>
                            <p className="text-muted small"><br /> Brand: {productDetails.BrandName}</p>
                        </figcaption>
                    </figure>
                </div>
            );
        }
        return <p>Product not found.</p>;
    };

    if (!order) {
        return <p>...Not found ..</p>;
    }

    return (
        <div>
            <ToastContainer />
            <section className="section-content padding-y">
                <div className="container">
                    <div className="card">
                        <table className="table table-borderless table-shopping-cart">
                            <thead className="text-muted">
                                <tr className="small text-uppercase">
                                    <th scope="col">Sản Phẩm</th>
                                    <th scope="col" width="200">Số lượng</th>
                                    <th scope="col" width="120">Giá</th>
                                    <th scope="col" className="text-right" width="200"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.OrderDetails.map(orderDetail => (
                                    <tr key={orderDetail.id}>
                                        <td>{renderProductDetails(orderDetail.ProductId)}</td>
                                        <td>
                                            <div className="price-wrap">
                                                <p className="price">{orderDetail.Qty}</p>
                                            </div>
                                        </td>
                                        <td style={{ width: "190px" }}>
                                            <div className="price-wrap">
                                                <p className="price text-6">{formatPrice(orderDetail.Amount)} VNĐ</p>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                 <hr  style={{maxWidth:'100%'}}></hr>
                               
                                <br></br>
                               
                                <tr>
                                    <td><strong>Ghi chú: {order.Note}</strong></td>
                                    <td><strong>Tình trạng: {order.Status}</strong></td>
                                    <td><strong>Mã đơn: {order.OrderDetails[0].OrderId}</strong></td>
                                </tr>
                                <tr>
                                    <td><strong>Tên khách hàng: {order.DeliveryName}</strong></td>
                                    <td><strong>Giới tính: {order.DeliveryGender && order.DeliveryGender==="male"?("Nữ"):("Nam")}</strong></td>
                                   

                                </tr>
                                <tr>
                                    <td><strong>Email: {order.DeliveryEmail}</strong></td>
                                    <td><strong>Số điện thoại: {order.DeliveryPhone}</strong></td>
                                    <td><strong>Địa chỉ: {order.DeliveryAddress}</strong></td>
                                   

                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Link to={"/orderlist"} className="btn btn-info mt-5"><i class="fas fa-angle-left"></i> Trở về</Link>

                </div>
            </section>
        </div>
    );
};

export default OrderDetail;
