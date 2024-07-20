import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const UserCreate = () => {
    const navigate = useNavigate();
    const currentDate = new Date().toISOString();
    const [FirstName, idchange] = useState("");
    const [LastName, namechange] = useState("");
    const [Password, passwordchange] = useState("");
    const [Email, emailchange] = useState("");


    const [Address, addresschange] = useState("");
    const [Gender, genderchange] = useState("");
    const [City, cityChange] = useState("");
    const [PhoneNumber, phoneChange] = useState("");

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (FirstName === null || FirstName === '') {
            isproceed = false;
            errormessage += ' firstName';
        }
        if (LastName === null || LastName === '') {
            isproceed = false;
            errormessage += ' lastName';
        }
        if (Password === null || Password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (Email === null || Email === '') {
            isproceed = false;
            errormessage += ' Email';
        }

        if (!isproceed) {
            toast.warning(errormessage)
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(Email)) {

            } else {
                isproceed = false;
                toast.warning('Please enter the valid email')
            }
        }
        return isproceed;
    }


    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { FirstName, LastName, Password, Email, Address, Gender, City, PhoneNumber };
        if (IsValidate()) {
            console.log(regobj);
            fetch("https://localhost:44389/api/Account/SignUp", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                alert('Đăng ký thành công!');
                console.log(res)
                toast.success('Registered successfully.')
                navigate('/user');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }

    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Khởi tạo tài khoản người dùng</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <a href="#">Người dùng</a>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                {/* /.container-fluid */}
            </section>
            {/* Main content */}
            <section className="content">
                {/* Default box */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Tạo mới Tài khoản</h3>
                        <div className="card-tools">
                            <Link to={`../admin/user`} type="button" className="btn btn-success">
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
                    <form className="ml-3" onSubmit={handlesubmit}>
                        <div className="form-group">
                            <label >Tên</label>

                            <input
                                type="text"
                                className="form-control col-sm-5"

                                value={FirstName} onChange={e => idchange(e.target.value)}
                                aria-describedby=""
                                placeholder="Nhập tên tài khoản"
                            />


                        </div>
                        <div className="form-group">
                            <label>Họ</label>

                            <input
                                type="text"
                                className="form-control col-sm-5"

                                value={LastName} onChange={e => namechange(e.target.value)}
                                aria-describedby=""
                                placeholder="Nhập tên tài khoản"
                            />


                        </div>

                        <div className="form-group">
                            <label >Email</label>

                            <input
                                type="text"
                                className="form-control col-sm-5"

                                value={Email} onChange={e => emailchange(e.target.value)}
                                aria-describedby=""
                                placeholder="Nhập tên tài khoản"
                            />


                        </div> <div className="form-group">
                            <label >Mật khẩu</label>

                            <input
                                type="text"
                                className="form-control col-sm-5"

                                value={Password} onChange={e => passwordchange(e.target.value)}
                                aria-describedby=""
                                placeholder="Nhập tên tài khoản"
                            />


                        </div> <div className="form-group">
                            <label >Giới tính</label>

                            <input
                                type="text"
                                className="form-control col-sm-5"

                                value={Gender} onChange={e => genderchange(e.target.value)}
                                aria-describedby=""
                                placeholder="Nhập tên tài khoản"
                            />


                        </div> <div className="form-group">
                            <label >Địa chỉ</label>

                            <input
                                type="text"
                                className="form-control col-sm-5"

                                value={Address} onChange={e => addresschange(e.target.value)}
                                aria-describedby=""
                                placeholder="Nhập tên tài khoản"
                            />


                        </div> <div className="form-group">
                            <label >Thành phố</label>

                            <input
                                type="text"
                                className="form-control col-sm-5"

                                value={City} onChange={e => cityChange(e.target.value)}
                                aria-describedby=""
                                placeholder="Nhập tên tài khoản"
                            />


                        </div> <div className="form-group">
                            <label >Số điện thoại</label>

                            <input
                                type="text"
                                className="form-control col-sm-5"

                                value={PhoneNumber} onChange={e => phoneChange(e.target.value)}
                                aria-describedby=""
                                placeholder="Nhập tên tài khoản"
                            />


                        </div>

                        <button className="btn btn-success" type="submit">Tạo mới</button>
                    </form>
                    {/* /.card-body */}
                    {/* /.card-footer*/}
                </div>
                {/* /.card */}
            </section>
            {/* /.content */}

        </div>
    );
};

export default UserCreate;
