import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPlus,
  faBullhorn,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WallPostManager from "../forms/advertisementModals/WallPostManager";

const MODALS = [
  { key: "welcome", title: "Welcome Modal", desc: "Shown to new users" },
  { key: "offer", title: "Offer Modal", desc: "Displays latest offers" },
  { key: "ongoing", title: "Ongoing Status Modal", desc: "Shows live updates" },
];

export default function AdvertisementPage() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("publishedModal");
    if (stored) setActive(stored);
  }, []);

  const publishModal = (key) => {
    localStorage.setItem("publishedModal", key);
    setActive(key);

    toast.success(`${key.toUpperCase()} modal published `, {
      position: "top-right",
      autoClose: 2000,
      theme: "light",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Toast Container */}
      <ToastContainer />

      {/* Header */}
      <div className="w-full p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg flex items-center gap-4">
        <div className="bg-white/20 p-4 rounded-xl">
          <FontAwesomeIcon icon={faBullhorn} size="2x" />
        </div>

        <div>
          <h1 className="text-2xl font-bold">Advertisement Panel</h1>
          <p className="opacity-80 text-sm">
            Control and publish all your modals from here
          </p>
        </div>
      </div>

      <p className="mt-4 text-xl opacity-60"><span className="mr-2 "><FontAwesomeIcon icon={faCircleExclamation}/></span>Only one Modal is allowed to publish !</p>
      <div className="mt-3 grid md:grid-cols-3 gap-6">
        {MODALS.map((modal) => {
          const isActive = active === modal.key;

          return (
            <div
              key={modal.key}
              className={`relative bg-white border rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                isActive
                  ? "border-green-500 ring-2 ring-green-200"
                  : "border-gray-200"
              }`}
            >
              {/* Status Badge */}
              {isActive && (
                <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow">
                  LIVE
                </span>
              )}

              {/* Title */}
              <h3 className="font-semibold text-lg mb-1">
                {modal.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 mb-6">
                {modal.desc}
              </p>

              {/* Publish Button */}
              <button
                onClick={() => publishModal(modal.key)}
                className={`w-full py-2.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-green-600 text-white shadow-md"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
              >
                <FontAwesomeIcon
                  icon={isActive ? faCircleCheck : faPlus}
                />

                {isActive ? "Published" : "Publish"}
              </button>
            </div>
          );
        })}
      </div>
            <WallPostManager />

    </div>
  );
}
