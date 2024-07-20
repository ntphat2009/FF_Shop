import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Sử dụng jwt-decode thay vì jwtDecode
import { GoogleLogout } from 'react-google-login';

const MyProfile = () => {
    const [customer, setCustomer] = useState(null);
    const [user, setUser] = useState(null);
    const ClientId = "239534240798-mo10lhif5jj1le3gvvfnlosiosapfbmb.apps.googleusercontent.com";

    useEffect(() => {
        const fetchCustomerProfile = async () => {
            const token = sessionStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    setCustomer(decodedToken);

                    const response = await axios.get(`https://localhost:44389/api/Account/${decodedToken.email}`);
                    setUser(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.error('Error fetching customer profile:', error);
                }
            } else {
                console.log('Không tìm thấy token');
            }
        };

        fetchCustomerProfile();
    }, []);

    const handleLogout = () => {
        // Xóa token khỏi session storage
        sessionStorage.removeItem('token');

        // Điều hướng người dùng đến trang login (hoặc trang chính của ứng dụng)
        window.location.href = '/signin';
    };

    const handleGoogleLogoutSuccess = () => {
        console.log('Logout successful');
        sessionStorage.removeItem('token');
        window.location.href = '/signin';
    };

    const handleGoogleLogoutFailure = () => {
        console.log('Logout failed');
    };

    console.log("user", customer);

    return (
        <div>
            {user ? (
                <section className="section-content padding-y">
                    <div className="container">
                        <div className="row">
                            <aside className="col-md-3">
                                <nav className="list-group">
                                    {customer && customer.sub ? (
                                        <GoogleLogout
                                            className="btn btn-danger btn-block mb-4 bg-danger"
                                            clientId={ClientId}
                                            buttonText="Đăng xuất"
                                            onLogoutSuccess={handleGoogleLogoutSuccess}
                                            onFailure={handleGoogleLogoutFailure}
                                        />
                                    ) : (
                                        <button className="list-group-item" onClick={handleLogout}>Log Out</button>
                                    )}
                                </nav>
                            </aside> {/* col.// */}
                            <main className="col-md-9">
                                <article className="card mb-3">
                                    <div className="card-body">
                                        <figure className="icontext">
                                            <div className="icon">
                                                {customer&& customer.picture ? (
                                                     <img className="rounded-circle img-sm border" src={customer.picture} alt="avatar" />
                                                     ):( 
                                                        <img className="rounded-circle img-sm border" src="images/avatars/avatar3.jpg" alt="avatar" />
                                                     )}
                                               
                                            </div>
                                            <div className="text mx-4">
                                                <h4>{user.lastName} {user.firstName}</h4>
                                                <h6 className="mb-2">Email: {user.email}</h6>
                                                <h6 className="mb-2">Số điện thoại: {user.phoneNumber}</h6>
                                                <h6 className="mb-2">Giới tính: {user.gender}</h6>
                                            </div>
                                        </figure>
                                        <hr />
                                        <p>
                                            <i className="fa fa-map-marker text-muted"></i> &nbsp; Địa chỉ của tôi:
                                            <br />
                                            {user.city}, {user.address}
                                        </p>
                                        <article className="card-group card-stat">
                                            <figure className="card bg">
                                                <div className="p-3">
                                                    <h4 className="title">38</h4>
                                                    <span>Đơn hàng</span>
                                                </div>
                                            </figure>
                                            <figure className="card bg">
                                                <div className="p-3">
                                                    <h4 className="title">5</h4>
                                                    <span>Yêu thích</span>
                                                </div>
                                            </figure>
                                            <figure className="card bg">
                                                <div className="p-3">
                                                    <h4 className="title">12</h4>
                                                    <span>Chờ thanh toán</span>
                                                </div>
                                            </figure>
                                            <figure className="card bg">
                                                <div className="p-3">
                                                    <h4 className="title">50</h4>
                                                    <span>Đã đặt</span>
                                                </div>
                                            </figure>
                                        </article>
                                    </div> {/* card-body .// */}
                                </article> {/* card.// */}
                            </main>
                        </div>
                    </div> {/* container .//  */}
                </section>
            ) : (
                <aside className="col-md-3">
                    <nav className="list-group">
                        <button className="list-group-item" onClick={handleLogout}>Log Out</button>
                    </nav>
                </aside>
            )}
        </div>
    );
};

export default MyProfile;
