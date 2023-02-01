import Image from 'next/image';

const Thumbnail = () => {
  return (
    <div className="pb-48">
      <Image
        className="absolute left-0 right-0 object-fill w-full h-48"
        src="/images/thumbnail.jpeg"
        alt="썸네일 이미지"
        width="100"
        height="100"
      />
    </div>
  );
};

export default Thumbnail;
