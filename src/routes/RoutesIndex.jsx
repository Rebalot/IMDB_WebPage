import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../pages/Home';
import ContentMovies from '../pages/ContentMovies';
import DetallePelicula from '../pages/DetallePelicula';
import { useEffect } from 'react';

const RoutesIndex = ({ onLoadComplete, onLoading }) => {
    const location = useLocation();

    useEffect(() => {
        onLoading();
    }, [location]);

    return (
        <Routes>
            <Route path='/' element={<Home onLoadComplete={onLoadComplete}/>} />
            <Route path='/:typeDetail/detail/:id' element={<DetallePelicula onLoadComplete={onLoadComplete}/>} />
            <Route path='/movie' element={<ContentMovies onLoadComplete={onLoadComplete} onLoading={onLoading}/>} />
        </Routes>
    )
};

export default RoutesIndex;