import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home';
import MoviePopular from '../pages/Movie_Popular';
import DetallePelicula from '../components/DetallePelicula.jsx';


const RoutesIndex = () => {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movie/popular' element={<MoviePopular />} />
            <Route path='/movieDetail/:id' element={<DetallePelicula />} />
        </Routes>
    )
}

export default RoutesIndex;