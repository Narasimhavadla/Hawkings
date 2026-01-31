import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function ExamCard({ exam, selected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(exam)}
      className={`relative cursor-pointer rounded-2xl border-2 p-5 shadow transition
      ${selected
        ? "border-indigo-600 bg-indigo-50"
        : "border-gray-200 hover:border-indigo-400"}`}
    >
      {selected && (
        <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
          <FontAwesomeIcon icon={faCheck} /> Selected
        </span>
      )}

      <h3 className="text-lg font-bold">{exam.examName}</h3>
      <p className="text-sm text-indigo-600 mt-2">Fee: ₹{exam.amount}</p>
    </div>
  );
}
