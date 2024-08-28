import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home';
import MoviePopular from '../pages/Movie_Popular';
import DetallePelicula from '../pages/DetallePelicula';
import NowPlaying from '../pages/NowPlaying';



const RoutesIndex = () => {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movie/popular' element={<MoviePopular />} />
            <Route path='/movie/now-playing' element={<NowPlaying />} />
            <Route path='/:typeDetail/:id' element={<DetallePelicula />} />
        </Routes>
    )
}

export default RoutesIndex;