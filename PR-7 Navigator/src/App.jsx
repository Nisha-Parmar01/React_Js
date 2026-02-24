import './App.css';
import Header from './components/Header';
import AddProductLS from './components/Addproduct';
import Home from './components/Home';
import {Routes, Route } from 'react-router';
import Editproduct from './components/Editproduct';


function App() {
  return (
    <>
    <Header />
      <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/addproduct" element={<AddProductLS />} />   
            <Route path="/Edit-product/:id" element={<Editproduct />} />       
      </Routes>
    </>
  );
}

export default App;
