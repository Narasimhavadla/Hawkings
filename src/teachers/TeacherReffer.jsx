import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faUsers, faGift } from "@fortawesome/free-solid-svg-icons";

export default function TeacherRefer() {
  const [data, setData] = useState(null);

   const authUser = JSON.parse(localStorage.getItem("authUser"));
  const teacherId = authUser?.teacherId;

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/v1/referrals/teacher/${teacherId}`
    );
    setData(res.data.data);
  };

  if (!data) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Refer & Earn</h1>

      <div className="bg-indigo-600 text-white p-6 rounded mb-6">
        <p>Your Referral Code</p>
        <div className="flex gap-3 items-center mt-2">
          <span className="text-2xl font-bold">{data.referralCode}</span>
          <button
            onClick={() =>
              navigator.clipboard.writeText(data.referralCode)
            }
            className="bg-white text-indigo-600 px-3 py-1 rounded"
          >
            <FontAwesomeIcon icon={faCopy} /> Copy
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card
          icon={faUsers}
          title="Total Referrals"
          value={data.totalReferrals}
        />
        <Card
          icon={faGift}
          title="Cashback Earned"
          value={`₹ ${data.totalCashback}`}
        />
      </div>
    </div>
  );
}

function Card({ icon, title, value }) {
  return (
    <div className="bg-white p-5 rounded shadow flex gap-3 items-center">
      <FontAwesomeIcon icon={icon} className="text-indigo-600 text-xl" />
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
