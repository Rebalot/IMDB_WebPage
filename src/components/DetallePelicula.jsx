import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function DetallePelicula () {

    const [detallePelicula, setDetallePelicula] = useState("");

    const { id } = useParams();
    useEffect(() => {
        const consultarDetallePelicula = async () => {

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDEzNjFjN2U4MzQzYmU5NTdiNGE1MGU1OWIxNzNiZiIsIm5iZiI6MTcyMzE3MzgxOC4wMzYxMDUsInN1YiI6IjY2YjQzNTFmYjJkMWM1NWM3OTZmMjNmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L24aOuGVERuuekN14gSCAXJMte02hky1GALzw9O1w4o'
                }
            };
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
                const json = await response.json()
                console.log(json)
                setDetallePelicula(json);
            }
            catch (e) {
                console.log(e)
            }
        }
        consultarDetallePelicula();
        
    }, []);

    console.log(detallePelicula)

return(
    <>
    <h1>{detallePelicula.title}</h1>
    </>
)
}

export default DetallePelicula;
