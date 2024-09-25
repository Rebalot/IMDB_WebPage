import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../pages/Home';
import ContentMovies from '../pages/ContentPage_Movies';
import ContentTvShows from '../pages/ContentPage_TvShows';
import DetallePelicula from '../pages/DetallePelicula';
import { useEffect } from 'react';
import { useLoading } from '../contexts/LoadingContext';

const RoutesIndex = () => {
    const location = useLocation();
    const { handleRoutesLoading } = useLoading();

    useEffect(() => {
      handleRoutesLoading();
    }, [location]);
  
    return (
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/:typeDetail/detail/:id' element={<DetallePelicula/>} />
        <Route path='/movie' element={<ContentMovies/>} />
        <Route path='/tv' element={<ContentTvShows/>} />
      </Routes>
    );
  };

export default RoutesIndex;