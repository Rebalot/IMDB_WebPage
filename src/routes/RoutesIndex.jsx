import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home';
import Popular from '../pages/Popular';


const RoutesIndex = () => {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Popular' element={<Popular />} />
        </Routes>
    )
}

export default RoutesIndex;