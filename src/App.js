import logo from './logo.svg';
import './App.css';
import api from './api/axiosConfig';
import { useEffect, useState } from 'react';
import Layout  from './components/Layout';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './components/home/Home'
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  const getMovies = async() => {
    try{
      const response = await api.get("/api/v1/movies");  
      setMovies(response.data);
    }catch(err) {
      console.log(err);
    }
  }

  const getMovieData = async(movieId) => {
    try{
      const response = await api.get(`/api/v1/movies/${movieId}`);  
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviewIds);
    }catch(err) {
      console.log(err);
    }
  }

  useEffect(()=> {
    getMovies()
  },[]);

  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home movies={movies}/>}></Route>
            <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
            <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} setReviews={setReviews} reviews={reviews}/>}></Route>
          </Route>
        </Routes>
      
    </div>
  );
}

export default App;
