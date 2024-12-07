import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import Home from './pages/Home'; 
import Test from './pages/Test'; 
import Wishlist from './pages/Wishlist';
import Lists from './pages/Lists';
import Articles from './pages/Articles'; 
import LogIn from './pages/LogIn'; 
import SignUp from './pages/SignUp'; 
import ShowResults from "./pages/ShowResults"
import LandingPage from './pages/LandingPage';

import ProductSearchBox from './componentsDBOFF/ProductSearchBox';
import ProductSearch from './componentsDBOFF/ProductSearch';
import ProductDetail from './componentsDBOFF/ProductDetail';
import ProductDetailForUser from './componentsDBOFF/ProductDetailForUser';
import ProductDetailsOPF from './componentsDBOFF/ProductDetailsOPF';
import { ProductProvider } from './ProductContext';


const App = () => {
  return (
    <ProductProvider>
      <Router>    
        <div className='appContainer'>
          <Routes>  {/*to set the default or home page in your routing use the "/" path */}
            <Route path="/home" element={<Home />} /> 
            <Route path="/test" element={<Test />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/productsearchbox" element={<ProductSearchBox />} />
            <Route path="/productsearch" element={<ProductSearch />} />
            <Route path="/product" element={<ProductDetail />} />
            <Route path="/showresults" element={<ShowResults />} />
            <Route path="/ProductDetailForUser" element={<ProductDetailForUser />} />
            <Route path="/ProductDetailsOPF" element={<ProductDetailsOPF />} />
            <Route path="/" element={<LandingPage />} />


            
          </Routes>
        </div>
      </Router>     
    </ProductProvider>
  );
};

export default App;
