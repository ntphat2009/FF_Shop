// import logo from "./logo.svg";
// // import "./";
// import Main from "./layout/Main";
// import HeaderB from "./components/HeaderB";
// import FooterB from "./components/FooterB";
// import { BrowserRouter } from "react-router-dom";
// import MenuB from "./components/MenuB";
// import {jwtDecode} from 'jwt-decode'; // Không cần destructure jwtDecode
// import { useNavigate } from 'react-router-dom';
// // import "";
// // import "./"
// function App() {
//   // const token = sessionStorage.getItem('token'); 
//   // const decodedToken = jwtDecode(token);
//   // console.log(decodedToken);
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <div>
//             <HeaderB />
//             <MenuB />
//             <Main />
//            <FooterB />
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Main from './layout/Main';
import HeaderB from './components/HeaderB';
import FooterB from './components/FooterB';
import MenuB from './components/MenuB';
import LoginPage from './components/LoginPage';

const ProtectedApp = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <HeaderB />
      <MenuB />
      <Main />
      <FooterB />
    </>
  );
};

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ProtectedApp />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
