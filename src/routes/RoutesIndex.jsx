import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../pages/Home';
import ContentMovies from '../pages/ContentMovies';
import DetallePelicula from '../pages/DetallePelicula';
import { useEffect } from 'react';

const RoutesIndex = ({ onLoadComplete, onLoading }) => {
    const location = useLocation();

    useEffect(() => {
        onLoading();
        const loadData = async () => {
            await new Promise(resolve => setTimeout(resolve, 4000));
            onLoadComplete();
        };
    loadData();
    }, [location]);

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:typeDetail/detail/:id' element={<DetallePelicula />} />
            <Route path='/movie' element={<ContentMovies />} />
        </Routes>
    )
};

export default RoutesIndex;