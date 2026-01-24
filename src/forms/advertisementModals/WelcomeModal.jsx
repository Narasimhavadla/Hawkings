import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrophy, faStar } from "@fortawesome/free-solid-svg-icons";

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("hawkings-olympiad-modal");
    if (!hasSeen) {
      setTimeout(() => setOpen(true), 800);
    }
  }, []);

  const closeModal = () => {
    sessionStorage.setItem("hawkings-olympiad-modal", "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 text-xl"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        {/* Content */}
        <div className="p-6 sm:p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full">
              <FontAwesomeIcon icon={faTrophy} className="text-4xl text-yellow-300" />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Hawkings Maths Olympiad 
          </h2>

          <p className="text-sm sm:text-base  mb-5">
            Unlock your child’s mathematical brilliance!  
            Participate in the most exciting maths competition of the year.
          </p>

          <div className="flex justify-center gap-3 mb-6">
            <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
              <FontAwesomeIcon icon={faStar} className="mr-1 text-yellow-300" />
              Grades 4 – 9
            </span>
            <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
              National Level
            </span>
          </div>

          <a href="/maths-competetion-registration"  onClick={closeModal}
            className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-full transition-transform hover:scale-105"
          >
            Register Now
          </a>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
