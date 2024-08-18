import classNames from "classnames";
import { Button, Modal } from "flowbite-react";
import YoutubePlayer from "./YoutubePlayer";
import styles from '../assets/styles/Modal.module.css'

export function ModalComponent({ isOpen, onClose, trailerData }) {
    return (
      <Modal className={classNames(styles.modal_container)} dismissible show={isOpen} onClose={onClose}>
        <Modal.Header className={classNames(styles.modal_header, 'p-3')}>{trailerData.title}</Modal.Header>
        <Modal.Body className={classNames(styles.modal_body)}>
          <div className={classNames(styles.ytPlayer_container)}>
            <YoutubePlayer className={classNames(styles.ytPlayer)} trailerUrl={trailerData.url}/>
          </div>
        </Modal.Body>
        </Modal>
  );
}
export default ModalComponent;