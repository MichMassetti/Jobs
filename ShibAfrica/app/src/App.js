import logo from './logo.svg';
import './App.css';
import React, { useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'

export function App(props) {
  return (
    <div className="App bg-[url('./public/wallpaper.jpeg')] bg-cover bg-center">     
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

