import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Main from './layouts/Main';
import Footer from './components/Footer';

function App() {
  
  return (
    <BrowserRouter>
      <div>
        <Header  />
        <Main />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
