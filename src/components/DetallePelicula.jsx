import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function DetallePelicula() {

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
    const imageURL = `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${detallePelicula.poster_path}`
    return (
        <>
            {
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Card style={{ width: '80vw'}}>
            
                <Card.Img variant="bottom" src={imageURL} style={{ position: 'relative', border:'none'}}/>
                <ListGroup variant="bottom" className="list-group-flush" style={{position: 'absolute',top: '50vh'}}>
                    <ListGroup.Item style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize:"30px"}}>{detallePelicula.title}</ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>{detallePelicula.overview}</ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>Calificacion: {detallePelicula.vote_average}</ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>Pais: {detallePelicula.origin_country}</ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>Fecha de estreno: {detallePelicula.release_date}</ListGroup.Item>
                </ListGroup>
            
            </Card>
            </div>
            }
        </>

    );
}

export default DetallePelicula;
