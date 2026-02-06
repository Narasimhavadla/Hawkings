import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import WelcomeModal from './forms/advertisementModals/WelcomeModal.jsx'
import OfferModal from './forms/advertisementModals/OfferModal.jsx'
import OngoingStatus from './forms/advertisementModals/OngoingStatusModal.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    {/* <OngoingStatus /> */}
    <WelcomeModal />
    {/* <OfferModal /> */}
      
      <App />
    </BrowserRouter>
  </StrictMode>,
)
