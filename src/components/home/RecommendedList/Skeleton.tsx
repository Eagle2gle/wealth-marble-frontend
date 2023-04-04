const RecommendedListSkeleton = () => {
  return (
    <div className="grid w-full grid-cols-6 gap-4 gap-y-4 max-md:carousel md:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="flex w-32 flex-col gap-1 rounded border border-grey shadow-md"
          >
            <div className="avatar">
              <div className="w-full animate-pulse rounded-t bg-grey"></div>
            </div>
            <div className="flex w-full flex-col justify-center py-1 px-2">
              <div className="h-[15px] w-full animate-pulse rounded bg-grey"></div>
              <div className="ml-auto mt-[3.5px] h-[11.5px] w-16 animate-pulse rounded bg-grey"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RecommendedListSkeleton;
