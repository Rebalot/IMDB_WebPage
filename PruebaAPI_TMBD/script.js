const urlMovieInfo = 'https://api.themoviedb.org/3/movie';

generarMovies();
async function generarMovies(){
    let moviesData = [];
    for (let index = 10000; index < 10010; index++) {

        const movieData = await obtenerMovieInfoTMDB(index);
        moviesData.push(movieData);
        mostrarMoviesEnGrid(movieData);
    }
    console.log(moviesData)
}


async function obtenerMovieInfoTMDB(movieID) {
    const newUrl = `${urlMovieInfo}/${movieID}?language=en-US`; //en es-MX no están todas las sinopsis disponibles
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDEzNjFjN2U4MzQzYmU5NTdiNGE1MGU1OWIxNzNiZiIsIm5iZiI6MTcyMzE3MzgxOC4wMzYxMDUsInN1YiI6IjY2YjQzNTFmYjJkMWM1NWM3OTZmMjNmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L24aOuGVERuuekN14gSCAXJMte02hky1GALzw9O1w4o'
        }
    };
    try {
        const response = await fetch(newUrl, options);
        if (!response.ok) {
            throw new Error('Error al obtener data');
        }
        const dataObtenida = await response.json();
        console.log('Data obtenida correctamente');
        return dataObtenida;
    } catch (error) {
        console.error('Error al obtener data', error);
    }
}

function mostrarMoviesEnGrid(movieData) {
    const contenedor = document.querySelector('#movies');
    const urlImg = `https://image.tmdb.org/t/p/original/${movieData.poster_path}`

    
        contenedor.insertAdjacentHTML('beforeend', `
            <div class="movie_contenedor">
                <div class="img_movie">
                    <img src="${urlImg}" alt="${movieData.original_title}_img">
                </div>
                <div class="title_movie">
                    <h3>${movieData.original_title}</h3>
                </div>
                
            </div>
        `);
        // <div class="sinopsis_movie">
        //     <p>${movieData.overview}</p>
        // </div>
}