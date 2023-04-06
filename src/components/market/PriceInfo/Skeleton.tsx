const Skeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex w-full gap-2">
            <div className="avatar -z-10">
              <div className="w-16 rounded bg-grey"></div>
            </div>
            <div className="flex w-[calc(100%-72px)] flex-col justify-between text-xs">
              <div className="h-4 w-full animate-pulse rounded bg-grey"></div>
              <div className="flex justify-between">
                <span className="h-4 w-full animate-pulse bg-grey"></span>
              </div>
              <div className="flex justify-between text-black/50">
                <span className="h-4 w-full animate-pulse bg-grey"></span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Skeleton;
