import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home';
import MoviePopular from '../pages/Movie_Popular';


const RoutesIndex = () => {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movie/popular' element={<MoviePopular />} />
        </Routes>
    )
}

export default RoutesIndex;