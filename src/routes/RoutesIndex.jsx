import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../pages/Home';
import ContentMovies from '../pages/ContentMovies';
import DetallePelicula from '../pages/DetallePelicula';
import NowPlaying from '../pages/Movie_NowPlaying';
import TopRated from '../pages/Movie_TopRated';
import Upcoming from '../pages/Movie_Upcoming';
import { useEffect } from 'react';

const RoutesIndex = ({ onLoadComplete, onLoading }) => {
    const location = useLocation();

    useEffect(() => {
        onLoading();
        const loadData = async () => {
            await new Promise(resolve => setTimeout(resolve, 2200));
            onLoadComplete();
        };
    loadData();
    }, [location]);

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:typeDetail/detail/:id' element={<DetallePelicula />} />
            <Route path='/movie/:section' element={<ContentMovies />} />
            <Route path='/movie/now_playing' element={<NowPlaying />} />
            <Route path='/movie/top_rated' element={<TopRated />} />
            <Route path='/movie/upcoming' element={<Upcoming />} />
            
        </Routes>
    )
};

export default RoutesIndex;