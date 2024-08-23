import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { NavLink } from "react-router-dom";
import styles from '../assets/styles/Home.module.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Movie_Popular = () => {

    const [listaPeliculas, setListaPeliculas] = useState([])
    useEffect(() => {
        const consultarPeliculas = async () => {
            const url = "https://api.themoviedb.org/3/movie/popular"
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDEzNjFjN2U4MzQzYmU5NTdiNGE1MGU1OWIxNzNiZiIsIm5iZiI6MTcyMzE3MzgxOC4wMzYxMDUsInN1YiI6IjY2YjQzNTFmYjJkMWM1NWM3OTZmMjNmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L24aOuGVERuuekN14gSCAXJMte02hky1GALzw9O1w4o'
                }
            };
            try {
                const response = await fetch(url, options)
                const json = await response.json()
                console.log(json)
                setListaPeliculas(json.results);
            }
            catch (e) {
                console.log(e)
            }
        }
        consultarPeliculas();


    }, []);




    return (
        <>
            <main>
                <section>
                    <div className={styles.welcome_wrapper}>
                        <h1>Bienvenido</h1>
                        <h2>Peliculas populares</h2>
                        <Row style={{gap: '20px'}}>
                            {
                                listaPeliculas.map((pelicula, index) => {
                                    const imageURL = `https://media.themoviedb.org/t/p/w440_and_h660_face/${pelicula.backdrop_path}`
                                    return (
                                        <Col key={index}>
                                        <Card style={{ width: '200px', height: '450px'}} >
                                        <Card.Img variant="top" src={imageURL} />
                                        <Card.Body>
                                            <Card.Title>{pelicula.title.charAt(0).toUpperCase() + pelicula.title.slice(1)}</Card.Title>
                                            <Button variant="primary">Go somewhere</Button>
                                        </Card.Body>
                                    </Card>
                                    </Col>
                                    )
                                })
                            }


                        </Row>
                    </div>
                    
                </section>
            </main>
        </>
    )
}

export default Movie_Popular;