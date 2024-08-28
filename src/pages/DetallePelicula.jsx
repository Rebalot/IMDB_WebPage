import { useEffect, useState} from "react";
import { NavLink, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function DetallePelicula() {

    const [detalleItem, setDetalleItem] = useState();
    const [imageLoaded, setImageLoaded] = useState(false);
    const { typeDetail, id } = useParams();
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDEzNjFjN2U4MzQzYmU5NTdiNGE1MGU1OWIxNzNiZiIsIm5iZiI6MTcyMzE3MzgxOC4wMzYxMDUsInN1YiI6IjY2YjQzNTFmYjJkMWM1NWM3OTZmMjNmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L24aOuGVERuuekN14gSCAXJMte02hky1GALzw9O1w4o'
        }
    };
    const handleImageLoad = () => {
        setImageLoaded(true);
    };
    useEffect(() => {
        
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
            }
        }
        consultarDetalleItem();
        
    }, []);
    console.log(detalleItem)

    return (
        <>
        <div style={{height:'90vh'}}>
        {detalleItem && (
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Card style={{ width: '80vw'}}>
                <Card.Img variant="top" src={detalleItem.imageURL} style={{ position: 'relative', border: 'none' }} onLoad={handleImageLoad}/>
                <Card.Header style={{zIndex:'10', border:'5px solid purple', 
                    borderRadius:"200px", height:'100px', 
                    position: 'absolute', right:"30px", top:'30px', backgroundColor:"#6e779c", 
                    color:"white", display:'flex', alignItems: 'center', textAlign:"center", fontSize:'40px'}}>
                    {detalleItem.vote_average.toFixed(1)}</Card.Header>
                {imageLoaded && (
                <ListGroup variant="bottom" className="list-group-flush" style={{ position: 'absolute', bottom: "-188px", width: '100%'}}>
                    <ListGroup.Item style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', fontSize: '30px' }}>
                    {detalleItem.hasOwnProperty("original_title") ? detalleItem.original_title : detalleItem.name}
                    </ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                    {detalleItem.overview}
                    </ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                    Sitio Web: <a href={detalleItem.homepage}>{detalleItem.homepage}</a>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                    País: {detalleItem.origin_country}
                    </ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                    Fecha de estreno: {detalleItem.release_date}
                    </ListGroup.Item>
                </ListGroup>
                )}
                </Card>
            </div>
        )}
        </div>
        </>
    );
}

export default DetallePelicula;
