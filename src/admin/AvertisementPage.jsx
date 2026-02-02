import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPlay,
  faPause,
  faLayerGroup,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const AD_TYPES = [
  { key: "scrolling", label: "Scrolling", color: "from-indigo-500 to-indigo-600" },
  { key: "slider", label: "Slider", color: "from-emerald-500 to-emerald-600" },
  { key: "banner", label: "Banner", color: "from-orange-500 to-orange-600" },
  { key: "modal", label: "Popup", color: "from-pink-500 to-pink-600" },
];

const ADS = [
  { id: 1, type: "scrolling", title: "Latest Updates", status: true },
  { id: 2, type: "scrolling", title: "Offers Strip", status: false },
  { id: 3, type: "slider", title: "Hero Slider", status: true },
  { id: 4, type: "banner", title: "Exam Banner", status: true },
  { id: 5, type: "modal", title: "Welcome Popup", status: false },
];

export default function AdvertisementPage() {
  const [activeType, setActiveType] = useState("scrolling");
  const [ads, setAds] = useState(ADS);

  const toggleAd = (id) => {
    setAds((prev) =>
      prev.map((ad) =>
        ad.id === id ? { ...ad, status: !ad.status } : ad
      )
    );
  };

  const deleteAd = (id) => {
    if (window.confirm("Are you sure you want to delete this advertisement?")) {
      setAds((prev) => prev.filter((ad) => ad.id !== id));
    }
  };

  const liveAds = ads.filter((ad) => ad.status);

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Advertisement Control
          </h1>
          <p className="text-sm text-gray-500">
            Manage live and inactive advertisements
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <FontAwesomeIcon icon={faPlus} /> Add Advertisement
        </button>
      </div>

      {/* AD TYPE SELECTOR */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {AD_TYPES.map((type) => (
          <button
            key={type.key}
            onClick={() => setActiveType(type.key)}
            className={`min-w-[150px] rounded-xl px-4 py-3 text-white bg-gradient-to-r ${type.color} ${
              activeType === type.key
                ? "scale-105 shadow-lg"
                : "opacity-80 hover:opacity-100"
            }`}
          >
            <FontAwesomeIcon icon={faLayerGroup} className="mb-2" />
            <p className="font-semibold text-sm">{type.label}</p>
          </button>
        ))}
      </div>

      {/* AD CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads
          .filter((ad) => ad.type === activeType)
          .map((ad) => (
            <div
              key={ad.id}
              className="bg-white rounded-xl shadow-sm border p-5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">{ad.title}</h3>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    ad.status
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {ad.status ? "LIVE" : "INACTIVE"}
                </span>
              </div>

              <button
                onClick={() => toggleAd(ad.id)}
                className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 text-sm hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={ad.status ? faPause : faPlay} />
                {ad.status ? "Unpublish" : "Publish"}
              </button>
            </div>
          ))}
      </div>

      {/* LIVE ADS TABLE */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Live Advertisements
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3">Type</th>
                <th className="text-center px-4 py-3">Status</th>
                <th className="text-center px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {liveAds.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No live advertisements
                  </td>
                </tr>
              )}

              {liveAds.map((ad) => (
                <tr key={ad.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{ad.title}</td>
                  <td className="px-4 py-3 capitalize">{ad.type}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      LIVE
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => toggleAd(ad.id)}
                        className="text-yellow-600 hover:text-yellow-700"
                        title="Unpublish"
                      >
                        <FontAwesomeIcon icon={faPause} />
                      </button>
                      <button
                        onClick={() => deleteAd(ad.id)}
                        className="text-red-600 hover:text-red-700"
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
