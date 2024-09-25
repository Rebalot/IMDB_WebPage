import { useEffect, useState } from "react";
import styles from "../assets/styles/Home.module.css";
import Carousel from "../components/CarouselTrailers";
import PosterGallery from "../components/PosterGallery";
import Spinner from "../components/Spinner";
import { fetchTrailersData } from '../services/trailersService';
import { fetchTrendingData } from '../services/carouselTrendingService';
import { fetchByPlatformData } from '../services/carouselByPlatformService';
import { useLoading } from "../contexts/LoadingContext";

const Home = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDEzNjFjN2U4MzQzYmU5NTdiNGE1MGU1OWIxNzNiZiIsIm5iZiI6MTcyMzE3MzgxOC4wMzYxMDUsInN1YiI6IjY2YjQzNTFmYjJkMWM1NWM3OTZmMjNmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L24aOuGVERuuekN14gSCAXJMte02hky1GALzw9O1w4o",
    },
  };
  
  const [loading, setLoading] = useState(true);
  const [trailersData, setTrailersData] = useState({})
  const [trendingData, setTrendingData] = useState({});
  const [byPlatformData, setByPlatformData] = useState({});
  const { handleRoutesLoadComplete, handleRoutesLoading } = useLoading();

  //////////////////////////
  useEffect(() => {
    setLoading(true); // Inicia la carga
    async function loadAllData() {
      try {
        const [trailers, trending, platforms] = await Promise.all([
          fetchTrailersData(options),
          fetchTrendingData(options),
          fetchByPlatformData(options)
        ]);
  
        if (trailers) setTrailersData(trailers);
        if (trending) setTrendingData(trending);
        if (platforms) setByPlatformData(platforms);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        handleRoutesLoadComplete();
      }
    }
  
    loadAllData();
  }, []);

  return (
    <>
      <main className={styles.main_home}>
        <section>
          <div className={styles.welcome_wrapper}>
            <div className={styles.welcome_text}>
              <h1>Welcome!</h1>
              <h2>
                Millions of movies,TV shows and people to discover. Explore now.
              </h2>
            </div>
            <div className={styles.trailers_container}>
              {loading ? (
                <Spinner />
              ) : (
                trailersData.length > 0 && <Carousel items={trailersData} />
              )}
            </div>
          </div>
        </section>
        <section>
          <div className={styles.trending_container}>
            {loading ? (
              <Spinner />
            ) : (
              trendingData.length > 0 && (
                <PosterGallery title="Trending" tabsData={trendingData} />
              )
            )}
          </div>
        </section>
        <section>
          <div className={styles.byPlatform_container}>
            {loading ? (
              <Spinner />
            ) : (
              byPlatformData.length > 0 && (
                <PosterGallery
                  title="Popular"
                  subtitle="byPlatform"
                  tabsData={byPlatformData}
                />
              )
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
