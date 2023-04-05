const ItemsSkeleton = () => {
  return (
    <div className="flex flex-col gap-1">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex gap-4 md:p-1">
            <div className="avatar min-w-[76px] md:w-1/5">
              <div className="w-full animate-pulse rounded-lg bg-grey"></div>
            </div>
            <div className="relative flex w-full flex-col justify-between gap-1 py-0.5 pr-4 text-xs">
              <div className="h-4 w-4/5 animate-pulse bg-grey"></div>
              <div className="h-4 w-full animate-pulse bg-grey"></div>
              <div className="h-4 w-full animate-pulse bg-grey"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ItemsSkeleton;
