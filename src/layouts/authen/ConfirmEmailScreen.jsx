import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Thay đổi cách import
import { Link } from 'react-router-dom';

const ConfirmEmailScreen = () => {
    const [customer, setCustomer] = useState(null);
    const [user, setUser] = useState("");
    const username =  sessionStorage.getItem('username');
    const emailWithoutQuotes = username.replace(/"/g, '');
    useEffect(() => {
        const intervalId = setInterval(() => {
            window.location.reload();
        }, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);
    useEffect(() => {
        const fetchCustomerProfile = async () => {
            try {
                const response = await axios.get(`https://localhost:44389/api/Account/${emailWithoutQuotes}`);
                    setUser(response.data);
                    console.log(response.data);
            } catch (error) {
                console.error('Error fetching customer profile:', error);
            }
        };

        fetchCustomerProfile();
    }, []);
    console.log("user",user);

    console.log("useremail",user.emailConfirmed);
    console.log("username",emailWithoutQuotes);

    return (
        <div>
            {user.emailConfirmed == true ? (
                <section class="section-content padding-y" className="mt-5 ">
                    <div class="container" style={{maxWidth: '800px',height:'500px' }}>
                        <div className="alert alert-success ">Đã xác thực thành công !</div>
                        <Link to={"/signin"} className="btn btn-info float-md-right mt-5"> <i className="fa fa-chevron-right"></i>Đăng nhập</Link>

                    </div>
                </section>
            ) : (
                <section class="section-content padding-y" className="mt-5 ">

                    <div class="container" style={{ maxWidth: '800px',height:'500px' }}>
                        <div className="alert alert-warning">Vui lòng nhấn vào đường link được gửi trong email bạn vừa sử dụng để tiến hành xác nhận!</div>
                        <Link to={"/signup"} className="btn btn-info float-md-right mt-5"> <i className="fa fa-chevron-right"></i>Đăng ký</Link>
                    </div>
                </section>
            )}
        </div>
    );
};

export default ConfirmEmailScreen;
