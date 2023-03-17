import Image from 'next/image';

const Thumbnail = () => {
  return (
    <div className="hero overflow-hidden pt-28 pb-24">
      <div className="hero-overlay absolute left-0 right-0 h-56">
        <Image
          className="w-full object-cover"
          src="/images/thumbnail.jpeg"
          alt="썸네일 이미지"
          fill
        />
      </div>
    </div>
  );
};

export default Thumbnail;
