import { Carousel} from "flowbite-react";
import Modal from "../components/Modal";
import { useState } from "react";

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

  return (
    <>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel pauseOnHover>
          {items.map((item, index) => (
            <div key={index} onClick={() => openModalWithTrailer(item.title, item.trailerUrl)}>
              <img src={item.image} alt={`${item.title}`} />
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