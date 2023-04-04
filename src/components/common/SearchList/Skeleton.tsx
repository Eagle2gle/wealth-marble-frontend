import classNames from '@/utils/classnames';

interface SkeletonProps {
  type: 'market' | 'cahoot';
}

const ItemSkeleton: React.FC<SkeletonProps> = ({ type }) => {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={classNames(
              type === 'cahoot' ? 'gap-6' : 'gap-2 md:gap-4',
              'flex rounded-lg border border-grey shadow-md md:p-2'
            )}
          >
            <div className="avatar">
              <div
                className={classNames(
                  type === 'cahoot' ? 'w-32' : 'w-24',
                  'animate-pulse rounded-l-lg bg-grey md:rounded-lg'
                )}
              ></div>
            </div>
            <div
              className={classNames(
                type === 'cahoot' ? 'pr-4' : 'pr-2 md:pr-4',
                'flex w-full flex-col justify-center gap-1 overflow-hidden py-2'
              )}
            >
              <div
                className={classNames(
                  type === 'cahoot' && 'mb-2.5',
                  'h-10 w-full animate-pulse rounded bg-grey md:h-6'
                )}
              ></div>
              {type === 'cahoot' && (
                <>
                  <div className="mb-1.5 h-5 w-full animate-pulse rounded bg-grey md:h-6"></div>
                  <div className="mb-1.5 h-5 w-full animate-pulse rounded bg-grey md:hidden"></div>
                  <div className="h-5 w-full animate-pulse rounded bg-grey md:h-6"></div>
                </>
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default ItemSkeleton;
