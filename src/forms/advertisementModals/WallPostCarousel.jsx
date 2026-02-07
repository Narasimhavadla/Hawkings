import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";


export default function WallPostCarousel({ posts }) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto slide
  useEffect(() => {
    if (!posts.length || isHovered) return;

    const interval = setInterval(() => {
      setIndex((prev) =>
        prev === posts.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [posts, isHovered]);

  const nextSlide = () => {
    setIndex((prev) =>
      prev === posts.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? posts.length - 1 : prev - 1
    );
  };

  if (!posts.length) return null;

  const post = posts[index];

  return (
    <div
      className="relative w-full h-[220px] overflow-hidden rounded-2xl group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      {post.image && (
        <img
          key={post.id}
          src={post.image}
          alt=""
          className="w-full h-full object-cover transition-all duration-700"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4 text-white ">
        <h2 className="font-bold text-lg">
          {post.title}
        </h2>
        <p className="text-sm opacity-90 line-clamp-2">
          {post.content}
        </p>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-1 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-1 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {posts.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all ${
              i === index
                ? "bg-white w-4"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
