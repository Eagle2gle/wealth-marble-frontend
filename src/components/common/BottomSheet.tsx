import Icon from './Icons';

interface BottomSheetProps {
  children: React.ReactNode;
  open: boolean;
  onDismiss?: () => void;
}

const BottomSheet = ({ children, open, onDismiss }: BottomSheetProps) => {
  return (
    <div className="fixed left-0 bottom-16 flex w-full flex-col items-center rounded-t-2xl bg-white p-4 drop-shadow-[0_2px_20px_rgba(0,0,0,0.2)] transition-all">
      {open && (
        <button className="-mt-2 mb-2 text-grey-middle" onClick={onDismiss}>
          <Icon.Down />
        </button>
      )}
      {children}
    </div>
  );
};

export default BottomSheet;
