import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const zonal = [
  {
    title: "1st Prize",
    amount: "₹5,000",
    accent: "from-yellow-400 to-orange-500",
    ring: "ring-yellow-400/40",
    items: [
      "Cash Prize ₹5,000",
      "Rank 1 Trophy",
      "Certificate",
      "Gold Medal",
    ],
  },
  {
    title: "2nd Prize",
    amount: "₹2,000",
    accent: "from-gray-300 to-gray-500",
    ring: "ring-gray-400/40",
    items: [
      "Cash Prize ₹2,000",
      "Rank 2 Trophy",
      "Certificate",
      "Silver Medal",
    ],
  },
  {
    title: "3rd Prize",
    amount: "₹1,000",
    accent: "from-orange-300 to-orange-600",
    ring: "ring-orange-400/40",
    items: [
      "Cash Prize ₹1,000",
      "Rank 3 Trophy",
      "Certificate",
      "Bronze Medal",
    ],
  },
];

const national = [
  {
    title: "1st Prize",
    amount: "₹1 Lakh",
    accent: "from-indigo-500 to-purple-600",
    ring: "ring-indigo-400/40",
    items: [
      "Cash Prize ₹1,00,000",
      "National Scientist Trophy",
      "Rank 1 Certificate",
      "Gold Medal",
    ],
  },
  {
    title: "2nd Prize",
    amount: "₹50,000",
    accent: "from-blue-400 to-indigo-500",
    ring: "ring-blue-400/40",
    items: [
      "Cash Prize ₹50,000",
      "Scientist Trophy",
      "Rank 2 Certificate",
      "Silver Medal",
    ],
  },
  {
    title: "3rd Prize",
    amount: "₹25,000",
    accent: "from-purple-400 to-pink-500",
    ring: "ring-purple-400/40",
    items: [
      "Cash Prize ₹25,000",
      "Scientist Trophy",
      "Rank 3 Certificate",
      "Bronze Medal",
    ],
  },
];

function PrizeCard({ data }) {
  return (
    <div className="group relative">
      {/* Glow */}
      <div
        className={`absolute -inset-0.5 rounded-2xl 
        bg-gradient-to-r ${data.accent}
        opacity-0 blur-lg transition`}
      />

      <div
        className={`
        relative h-full rounded-2xl bg-white p-7
        transition-all duration-500
        group-hover:-translate-y-3
        ring-1 ring-gray-200
        group-hover:${data.ring}
      `}
      >
        {/* Header */}
        <div className="flex items-center gap-4">
          <div
            className={`h-12 w-12 flex items-center justify-center rounded-full
            bg-gradient-to-br ${data.accent}
            text-white shadow-md
            transition-transform duration-500
            group-hover:rotate-6`}
          >
            <FontAwesomeIcon icon={faTrophy} />
          </div>

          <div>
            <h3 className="text-lg font-semibold">{data.title}</h3>
            <p className="text-xl font-bold text-gray-800">
              {data.amount}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Details */}
        <ul className="space-y-3 text-sm text-gray-600">
          {data.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 opacity-80
              transition-all duration-300
              group-hover:opacity-100"
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-indigo-500 mt-1"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function RewardsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">

      {/* Zonal */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-gray-900">
          Zonal Level Rewards
        </h2>
        <p className="text-gray-500 mt-2">
          Top students from each zone
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {zonal.map((z, i) => (
          <PrizeCard key={i} data={z} />
        ))}
      </div>

      {/* National */}
      <div className="text-center mt-24 mb-14">
        <h2 className="text-4xl font-bold text-gray-900">
          National Level Rewards
        </h2>
        <p className="text-gray-500 mt-2">
          Finalists selected after interview
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {national.map((n, i) => (
          <PrizeCard key={i} data={n} />
        ))}
      </div>
    </section>
  );
}
