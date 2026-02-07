import WelcomeModal from "../advertisementModals/WelcomeModal";
import OfferModal from "../advertisementModals/OfferModal";
import OngoingStatus from "./OngoingStatusModal";

export default function PublishedModalLoader() {
  const modalType = localStorage.getItem("publishedModal");

  switch (modalType) {
    case "welcome":
      return <WelcomeModal />;

    case "offer":
      return <OfferModal />;

    case "ongoing":
      return <OngoingStatus />;

    default:
      return null;
  }
}
