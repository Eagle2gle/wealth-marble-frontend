import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onDismiss: React.MouseEventHandler<HTMLDivElement>;
}

const Modal = ({ children, open, onDismiss }: ModalProps) => {
  const onInnerClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {open &&
        createPortal(
          <>
            <div
              className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/30"
              onClick={onDismiss}
            >
              <div
                className="mx-3 w-96 rounded-lg border border-grey bg-white p-6"
                onClick={onInnerClick}
              >
                {children}
              </div>
            </div>
          </>,
          document.querySelector('#modal-root') as HTMLDivElement
        )}
    </>
  );
};

export default Modal;
