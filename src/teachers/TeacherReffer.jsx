import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faFacebook,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";


import {
  faCopy,
  faUsers,
  faEnvelope} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function TeacherRefer() {
  const [data, setData] = useState(null);
  const [copied, setCopied] = useState(false);

  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const teacherId = authUser?.teacherId;
  const api = import.meta.env.VITE_API_BASE_URL

  // 👉 Change domain if needed
  const referralLink = `${window.location.origin}/register?ref=${data?.referralCode}`;

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    const res = await axios.get(
      `${api}/referrals/teacher/${teacherId}`
    );
    setData(res.data.data);
  };

  /* ---------------- COPY ---------------- */
  const handleCopy = () => {
    navigator.clipboard.writeText(data.referralCode);
    // toast.success("Referral code copied 🎉");
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

// 🎟️ REFERRAL CODE: ${data.referralCode}

 /* ---------------- SHARE TEXT ---------------- */
const shareText = `Hello 👋

I invite you to register for the Hawkings Olympiad.

Use my referral code while registering:

🎟️ REFERRAL CODE: ABCD

🎁 Get 10% cashback on your enrollment.

Don’t miss this opportunity to participate and win exciting rewards!

Thank you.`;


/* WhatsApp */
const shareWhatsApp = () => {
  window.open(
    `https://wa.me/?text=${encodeURIComponent(shareText)}`,
    "_blank"
  );
};

/* Telegram */
const shareTelegram = () => {
  window.open(
    `https://t.me/share/url?text=${encodeURIComponent(
      shareText
    )}`,
    "_blank"
  );
};

/* Gmail */
const shareGmail = () => {
  window.open(
    `mailto:?subject=Hawkings Olympiad Referral&body=${encodeURIComponent(
      shareText
    )}`
  );
};

/* Facebook */
const shareFacebook = () => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(
      shareText
    )}`,
    "_blank"
  );

};


  if (!data)
    return (
      <div className="p-6 text-center text-gray-500 animate-pulse">
        Loading referral data...
      </div>
    );

  return (
    <div className="p-6 bg-gray-100 h-[90%]">
      <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Refer & Earn
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-indigo-600  text-white p-6 rounded-2xl mb-6 shadow-lg relative overflow-hidden"
      >
        <p className="opacity-90">Your Referral Code</p>

        <div className="flex flex-wrap gap-3 items-center mt-3">
          <span className="text-3xl font-bold tracking-widest">
            {data.referralCode}
          </span>

          <button
            onClick={handleCopy}
            className="bg-white text-indigo-600 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 hover:scale-105 transition relative"
          >
            <FontAwesomeIcon icon={faCopy} />
            {copied ? "Copied!" : "Copy"}
          </button>

          <div className="flex flex-wrap gap-2 mt-4">

  <button
    onClick={shareWhatsApp}
    className="bg-green-600 text-white px-2 py-1.5 rounded-full text-md"
  >
    <FontAwesomeIcon icon={faWhatsapp}/>
  </button>

  <button
    onClick={shareTelegram}
    className="bg-sky-500 text-white px-2 py-1 rounded-full text-md"
  >
    <FontAwesomeIcon icon={faTelegram}/>
  </button>

  <button
    onClick={shareGmail}
    className="bg-red-500 text-white px-2 py-1 rounded-full text-md"
  >
    <FontAwesomeIcon icon={faEnvelope} />
  </button>

  <button
    onClick={shareFacebook}
    className="bg-blue-600 text-white px-2 text-center py-1 rounded-full text-md"
  >
    <FontAwesomeIcon icon={faFacebook}/>
  </button>

  

  

</div>

        </div>

       
      </motion.div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 gap-4">
        <StatCard
          icon={faUsers}
          title="Total Referrals"
          value={data.totalReferrals}
        />

        {/* Future ready cashback card */}
        {/* 
        <StatCard
          icon={faGift}
          title="Cashback Earned"
          value={`₹ ${data.totalCashback}`}
        /> 
        */}
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      className="bg-white p-5 rounded-2xl shadow flex gap-4 items-center border"
    >
      <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl text-lg">
        <FontAwesomeIcon icon={icon} />
      </div>

      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </motion.div>
  );
}
