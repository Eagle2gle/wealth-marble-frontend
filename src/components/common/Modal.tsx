import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const [modalRoot, setModalRoot] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setModalRoot(document.querySelector<HTMLDivElement>('#modal-root'));
  }, []);

  if (!modalRoot) return <></>;

  return (
    <>
      {createPortal(
        <>
          <input type="checkbox" id="modal" className="modal-toggle" />
          <label htmlFor="modal" className="modal cursor-pointer">
            <label htmlFor="" className="modal-box relative">
              {children}
            </label>
          </label>
        </>,
        modalRoot
      )}
    </>
  );
};

export default Modal;
