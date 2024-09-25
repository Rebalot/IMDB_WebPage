import { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";

const useMedia = (initialSection, mediaType) => {
  const [mediaList, setMediaList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState(initialSection);
  const [filter, setFilter] = useState(false);
  const { handleRoutesLoadComplete, handleRoutesLoading } = useLoading();
  
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDEzNjFjN2U4MzQzYmU5NTdiNGE1MGU1OWIxNzNiZiIsIm5iZiI6MTcyMzE3MzgxOC4wMzYxMDUsInN1YiI6IjY2YjQzNTFmYjJkMWM1NWM3OTZmMjNmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L24aOuGVERuuekN14gSCAXJMte02hky1GALzw9O1w4o",
    },
  };

  const consultarMediaSection = async (pageNum, filterValue = false) => {
    let newURL;
    if (!filterValue) {
      newURL = `https://api.themoviedb.org/3/${mediaType}/${section}?language=en-US&page=${pageNum}&region=MX`;
    } else {
      newURL = `https://api.themoviedb.org/3/discover/${mediaType}?include_adult=false&include_video=false&language=en-US&page=${pageNum}&sort_by=${filterValue.sort}&with_genres=${filterValue.genres}&region=MX`;
    }
    console.log('URL: ', newURL);
    try {
      const response = await fetch(newURL, options);
      const data = await response.json();
      console.log('Content fetch: ', data)
      setMediaList((prevMedia) =>
        pageNum === 1 ? data.results : [...prevMedia, ...data.results]
      );
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
      handleRoutesLoadComplete();
    }
  };

  useEffect(() => {
    const fetchMedia = async () => {
      setMediaList([]);
      setPage(1);
      setLoading(true);
      handleRoutesLoading();

      if (filter && section === "popular") {
        consultarMediaSection(1, filter);
      } else {
        consultarMediaSection(1);
      }
    };

    fetchMedia();
  }, [filter, section]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      if (filter) {
        consultarMediaSection(page, filter);
      } else {
        consultarMediaSection(page);
      }
    }
  }, [page]);

  const handleFormSubmit = (filterValues) => {
    setFilter(filterValues);
    console.log('Filtros seleccionados: ', filterValues)
    setSection("popular");
  };

  const handleDropdown = (sectionValue) => {
    setFilter(false);
    setSection(sectionValue);
  };

  return {
    mediaList,
    loading,
    section,
    handleFormSubmit,
    handleDropdown,
    handleLoadMore,
  };
};

export default useMedia;
