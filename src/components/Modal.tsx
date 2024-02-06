import { AiOutlineClose } from "react-icons/ai";
import React, { RefObject, useEffect } from "react";
import styles from "../sass/layouts/modal.module.scss";
import UpdatePost from "./UpdatePost";
import { ModalProps } from "@/utils/type";

const Modal = ({ data, isOpen, onClose }: ModalProps) => {
  const modalRef: RefObject<HTMLDivElement> = React.createRef();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, modalRef]);

  return (
    <div className={styles.modal}>
      <div className={styles.modal__content} ref={modalRef}>
        <AiOutlineClose
          className={styles.modal__close}
          onClick={() => {
            onClose();
          }}
        />
        <UpdatePost res={data} />
      </div>
    </div>
  );
};

export default Modal;
