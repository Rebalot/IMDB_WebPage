import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../pages/Home';
import MoviePopular from '../pages/Movie_Popular';
import DetallePelicula from '../pages/DetallePelicula';
import NowPlaying from '../pages/NowPlaying';
import TopRated from '../pages/TopRated';
import Upcoming from '../pages/Upcoming';
import { useEffect } from 'react';

const RoutesIndex = ({ onLoadComplete, onLoading }) => {
    const location = useLocation();

    useEffect(() => {
        onLoading();
        const loadData = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            onLoadComplete();
        };
    loadData();
    }, [location]);

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movie/popular' element={<MoviePopular />} />
            <Route path='/movie/now-playing' element={<NowPlaying />} />
            <Route path='/movie/top-rated' element={<TopRated />} />
            <Route path='/movie/upcoming' element={<Upcoming />} />
            <Route path='/:typeDetail/:id' element={<DetallePelicula />} />
        </Routes>
    )
};

export default RoutesIndex;