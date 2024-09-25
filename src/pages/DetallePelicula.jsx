import { useEffect, useState} from "react";
import { NavLink, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from "../components/Spinner";
import styles from "../assets/styles/DetallePelicula.module.css";
import { useLoading } from "../contexts/LoadingContext";

function DetallePelicula() {
    const [loading, setLoading] = useState(true);
    const [detalleItem, setDetalleItem] = useState();
    const [imageLoaded, setImageLoaded] = useState(false);
    const { typeDetail, id } = useParams();
    const { handleRoutesLoadComplete, handleRoutesLoading } = useLoading();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDEzNjFjN2U4MzQzYmU5NTdiNGE1MGU1OWIxNzNiZiIsIm5iZiI6MTcyMzE3MzgxOC4wMzYxMDUsInN1YiI6IjY2YjQzNTFmYjJkMWM1NWM3OTZmMjNmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L24aOuGVERuuekN14gSCAXJMte02hky1GALzw9O1w4o'
        }
    };
    useEffect(() => {
        setLoading(true); // Inicia la carga
        const consultarDetalleItem = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/${typeDetail}/${id}`, options)
                
                const json = await response.json();
                const imageURL = `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${json.backdrop_path}`
                const detalles = {...json, imageURL};
                // console.log(detalles)
                setDetalleItem(detalles);
            }
            catch (e) {
                console.log(e)
            }finally {
                setLoading(false);
                handleRoutesLoadComplete();
            }
        }
        consultarDetalleItem();
        
    }, []);
    function handleImageLoad(){
        setImageLoaded(true);
    };
    function redondearVotos(value){
        return value.toFixed(1);
    };

    return (
        <>
        <main className={styles.main_detalle}>
        {loading ? (
              <Spinner />
            ) : (
              detalleItem && (
                <section>
                <Card>
                <Card.Img variant="top" src={detalleItem.imageURL} onLoad={handleImageLoad}/>
                <Card.Header>
                    {redondearVotos(detalleItem.vote_average)}</Card.Header>
                {imageLoaded && (
                <ListGroup variant="bottom" className="list-group-flush">
                    <ListGroup.Item>
                    {detalleItem.hasOwnProperty("title") ? detalleItem.title : detalleItem.name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                    {detalleItem.overview}
                    </ListGroup.Item>
                    <ListGroup.Item>
                    Sitio Web: <a href={detalleItem.homepage}>{detalleItem.homepage}</a>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    País: {detalleItem.origin_country}
                    </ListGroup.Item>
                    <ListGroup.Item>
                    Fecha de estreno: {detalleItem.release_date}
                    </ListGroup.Item>
                </ListGroup>
                )}
                </Card>
            </section>
              )
            )}
        </main>
        </>
    );
}

export default DetallePelicula;
