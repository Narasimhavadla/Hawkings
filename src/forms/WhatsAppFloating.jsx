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
<svg
        viewBox="0 0 32 32"
        fill="white"
        className="w-7 h-7"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16 2.9c-7.3 0-13.1 5.8-13.1 13.1 0 2.3.6 4.5 1.7 6.5L2 30l7.8-2.4c1.9 1 4.1 1.6 6.2 1.6 7.3 0 13.1-5.8 13.1-13.1S23.3 2.9 16 2.9zm0 23.8c-1.9 0-3.7-.5-5.4-1.4l-.4-.2-4.6 1.4 1.5-4.4-.3-.5c-1-1.7-1.6-3.7-1.6-5.8 0-6.1 5-11.1 11.1-11.1s11.1 5 11.1 11.1-5 11.1-11.1 11.1zm6.1-8.3c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.3-.7.1c-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.9-1.8-2.2s0-.5.2-.7c.2-.2.3-.4.5-.6.2-.2.3-.3.4-.5.1-.2.1-.4 0-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.6-.5-.8-.5h-.7c-.2 0-.6.1-.9.4s-1.2 1.1-1.2 2.7 1.2 3.2 1.4 3.4c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .8.8.2 1.6.2 2.2.1.7-.1 2.1-.9 2.4-1.7.3-.8.3-1.5.2-1.7-.1-.2-.3-.3-.6-.5z"/>
      </svg>         
        </a>
  );
}
