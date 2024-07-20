import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    
    const [FirstName, idchange] = useState("");
    const [LastName, namechange] = useState("");
    const [Password, passwordchange] = useState("");
    const [confirmpassword, confirmpasswordchange] = useState("");

    const [Email, emailchange] = useState("");
    // const [Facebook, faceChange] = useState("");
    // const [Youtube, ytbChange] = useState("");

    const [Address, addresschange] = useState("");
    const [Gender, genderchange] = useState("");
    const [City, cityChange] = useState("");
    const [PhoneNumber, phoneChange] = useState("");
   
      
    const navigate = useNavigate();
    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Vui lòng nhập ';
        let errors = [];
        const passwordPolicy = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
        if (!FirstName) {
            isproceed = false;
            errors.push('Họ');
        }
        if (!LastName) {
            isproceed = false;
            errors.push('Tên');
        }
        if (!Password) {
            isproceed = false;
            errors.push('Mật khẩu');
        }else if (!passwordPolicy.test(Password)) {
            isproceed = false;
            errors.push('Mật khẩu chưa đúng định dạng (Ít nhất 7 ký tự gồm ít nhất 1 kí tự đặc biệt,1 chữ số, 1 kí tự in hoa)');
        }
        if (!Email) {
            isproceed = false;
            errors.push('Email');
        }
        if (!Address) {
            isproceed = false;
            errors.push('Địa chỉ');
        }
        if (!City) {
            isproceed = false;
            errors.push('Thành phố');
        }
        if (!PhoneNumber) {
            isproceed = false;
            errors.push('Số điện thoại');
        }
        if (Password !== confirmpassword) {
            isproceed = false;
            errors.push('Kiểm tra xác nhận mật khẩu, mật khẩu chưa khớp');
        }
    
        if (errors.length > 0) {
            errormessage += errors.join(', ');
            toast.warning(errormessage);
        } else {
            if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(Email)) {
                return isproceed;
            } else {
                isproceed = false;
                toast.warning('Vui lòng nhập email chính xác');
            }
        }
        return isproceed;
    }



    const handlesubmit = (e) => {
        e.preventDefault();
        toast.loading("Vui lòng chờ!");
        let regobj = { FirstName, LastName, Password, Email, Address, Gender, City, PhoneNumber };
        if (IsValidate()) {
            console.log(regobj);
            fetch("https://localhost:44389/api/Account/SignUp", {
                
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                if(res.status===200)
                {
                    sessionStorage.setItem('username', JSON.stringify(Email));
                    navigate('/confirmemail');

                }
                if (res.status === 400) {
                    toast.error('Email đã được sử dụng. Vui lòng nhập email khác!');
                }

                return;
                // console.log(res)
              
                // toast.success('Đăng kí thành công.')
                
            }).catch((err) => {
                toast.error('Thất bại :' + err.message);
            });
        }
    }
    return (
        <div>
            <>
            <ToastContainer />
                <section class="section-content padding-y">

                    {/* ============================ COMPONENT REGISTER   ================================= */}
                    <div class="card mx-auto" style={{ maxWidth: "520px", marginTop: "40px" }}>
                        <article class="card-body">
                            <header class="mb-4"><h4 class="card-title">Đăng Ký</h4></header>
                            <form onSubmit={handlesubmit}>
                                <div class="form-row">
                                    <div class="col form-group">
                                        <label>Họ</label>
                                        <input type="text" class="form-control" placeholder="" value={FirstName} onChange={e => idchange(e.target.value)} />
                                    </div> {/* form-group end.// */}
                                    <div class="col form-group">
                                        <label>Tên</label>
                                        <input type="text" name="lastName" class="form-control" placeholder="" value={LastName} onChange={e => namechange(e.target.value)} />
                                    </div> {/* form-group end.// */}
                                </div> {/* form-row end.// */}
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" class="form-control" placeholder="" value={Email} onChange={e => emailchange(e.target.value)} />
                                    <small class="form-text text-muted">Chúng tôi sẽ không chia sẻ Email của bạn cho bất kỳ ai khác</small>
                                </div> {/* form-group end.// */}
                                <div class="form-group">
                                    <label class="custom-control custom-radio custom-control-inline">
                                        <input class="custom-control-input" checked="" type="radio" name="Gender" value="Male" onChange={e => genderchange(e.target.value)} />
                                        <span class="custom-control-label"> Nam </span>
                                    </label>
                                    <label class="custom-control custom-radio custom-control-inline">
                                        <input class="custom-control-input" type="radio" name="Gender" value="Female" onChange={e => genderchange(e.target.value)} />
                                        <span class="custom-control-label"> Nữ </span>
                                    </label>
                                    
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-12">
                                        <label>Địa chỉ</label>
                                        <input type="text" class="form-control" value={Address} onChange={e => addresschange(e.target.value)} />
                                    </div> {/* form-group end.// */}

                                </div> {/* form-row.// */}
                                <div class="form-row">
                                    <div class="form-group col-md-12">
                                        <label>Thành phố</label>
                                        <input type="text" class="form-control" value={City} onChange={e => cityChange(e.target.value)} />
                                    </div> {/* form-group end.// */}

                                </div> {/* form-row.// */}
                                <div class="form-row">
                                    <div class="form-group col-md-12">
                                        <label>Số điện thoại</label>
                                        <input type="number" class="form-control" value={PhoneNumber} onChange={e => phoneChange(e.target.value)} />
                                    </div> {/* form-group end.// */}

                                </div> {/* form-row.// */}
                                <div class="form-row">
                                   
                                    <div class="form-group col-md-6">
                                        <label>Nhập mật khẩu</label>
                                        <input class="form-control" type="password" value={Password} onChange={e => passwordchange(e.target.value)} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label>Nhập mật khẩu</label>
                                        <input class="form-control" type="password" value={confirmpassword} onChange={e => confirmpasswordchange(e.target.value)} />
                                    </div>
                                    {/* <div class="form-group col-md-6">
                                        <label>Nhập lại mật khẩu</label>
                                        <input class="form-control" type="password" value={ConfirmPassword} onChange={handleConfirmPasswordChange} />
                                        <div id="PasswordMatchError" style={{color: "red"}}></div>
                                    </div>
                                    {PasswordMatchError && <div style={{ color: 'red' }}>{PasswordMatchError}</div>} */}
                                    
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-info btn-block"> Đăng Ký  </button>
                                </div> {/* form-group// */}

                            </form>
                        </article>{/* card-body.// */}
                    </div> {/* card .// */}
                    <p class="text-center mt-4">Bạn đã có tài khoản? <a href="/signin">Đăng nhập</a></p>
                    <br></br>
                    {/* ============================ COMPONENT REGISTER  END.// ================================= */}


                </section>
            </>
        </div>
    )
}

export default SignUp
