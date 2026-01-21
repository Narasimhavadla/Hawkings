import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faPhone,

} from "@fortawesome/free-solid-svg-icons";


export default function WhatsAppFloating() {
  const phoneNumber = "916300157188"; 

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-5 z-50
                 bg-green-500 hover:bg-green-600
                 text-white rounded-full
                 w-14 h-14 flex items-center justify-center
                 shadow-xl transition-transform
                 hover:scale-110 active:scale-95"
      aria-label="Chat on WhatsApp"
    >
        <FontAwesomeIcon icon={faPhone}  className="text-2xl"/> 
           </a>
  );
}
