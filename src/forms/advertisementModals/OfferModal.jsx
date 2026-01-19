// // components/modals/OfferModal.jsx
// import BaseModal from "./BaseModal";

// export default function OfferModal({ open, onClose }) {
//   return (
//     <div open={open} onClose={onClose}>
//       <div className="p-6 text-center">
//         <h2 className="text-2xl font-extrabold text-green-600 mb-2">
//           🎉 Limited Time Offer
//         </h2>
//         <p className="text-gray-600 mb-4">
//           Get <span className="font-semibold">30% OFF</span> on Olympiad Registration
//         </p>
//         <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
//           Claim Offer
//         </button>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrophy, faStar } from "@fortawesome/free-solid-svg-icons";

export default function OfferModal() {
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

        <div className="p-6 text-center">
       <h2 className="text-2xl font-extrabold text-green-600 mb-2">
           🎉 Limited Time Offer
         </h2>
         <p className="text-gray-600 mb-4">
           Get <span className="font-semibold">30% OFF</span> on Olympiad Registration
         </p>
         <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
           Claim Offer
         </button>
       </div>


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
