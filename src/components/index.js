
import { Outlet } from "react-router-dom";
import HeaderB from "./HeaderB";
import FooterB from "./FooterB";
import MenuB from "./MenuB";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Không cần destructure jwtDecode
import { useNavigate } from 'react-router-dom';
const BackendLayout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Sử dụng sessionStorage
        if (token) {
          const decodedToken = jwtDecode(token);
          const response = await axios.get(`https://localhost:44389/api/Account/${decodedToken.userName}`);
          setUser(response.data);
          console.log(token);
        } else {
          console.log('Không tìm thấy token');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching customer profile:', error);
      }
    };

    fetchCustomerProfile();
  }, [navigate]);
  return (
    <>
      {/* <HeaderB /> */}
      <MenuB />
      <Outlet />
      {/* <FooterB /> */}
    </>
  );
};

export default BackendLayout;
