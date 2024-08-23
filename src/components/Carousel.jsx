import { Carousel} from "flowbite-react";
import Modal from "../components/Modal";
import { useState } from "react";
import classNames from "classnames";
import styles from '../assets/styles/Carousel.module.css'

export function CarouselComponent({ items }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState({ title: null, url: null });

  const openModalWithTrailer = (trailerTitle, trailerUrl) => {
    setCurrentTrailer({ title: trailerTitle, url: trailerUrl });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTrailer({ title: null, url: null });
  };
  function handlePlayButtonClick(event) {
    console.log('click en play')
    event.stopPropagation();
    const activeSlide = document.querySelector('[data-active="true"][data-testid="carousel-item"]');
    
    if (activeSlide) {
      const actualImg = activeSlide.querySelector('img')
      actualImg.click();
    }
  }
  return (
    <>
      <div className={`${styles.carousel_container} h-56 sm:h-64 xl:h-80 2xl:h-96 relative`}>
          <button className={classNames(styles.playBtn, 'absolute', 'sm:h-10 sm:w-10', 'rounded-full', 'inline-flex', 'justify-center', 'items-center')} onClick={(e) => handlePlayButtonClick(e)}>
            <span className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60  sm:h-10 sm:w-10'>
              <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" fill="currentColor" className="text-whh-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6ite dark:text-gray-800 sm:h-6 sm:w-6" viewBox="0 0 16 16">
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
              </svg>
            </span>
          </button>
        <Carousel pauseOnHover className={classNames(styles.carousel)}>
          
          {items.map((item, index) => (
            <div key={index} onClick={() => openModalWithTrailer(item.title, item.trailerUrl)} className={classNames(styles.backdrop_container)}>
              <img src={item.image} alt={`${item.title}`} />
              <div className={classNames(styles.trailerName_container)}>
                <h4 className={classNames(styles.trailerName)}>{item.title}</h4>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Modal para mostrar el tráiler cuando se hace clic en un thumbnail */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        trailerData={currentTrailer}
      />
    </>
  );
}
export default CarouselComponent;