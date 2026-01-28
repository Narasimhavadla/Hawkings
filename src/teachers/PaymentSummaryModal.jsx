import { useEffect, useState } from "react";

export default function PaymentSummaryModal({
  open,
  onClose,
  exam,
  studentCount,
  onProceed,
}) {
  if (!open || !exam) return null;

  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
    setDiscountApplied(false);
  }, [open]);

  const baseAmount = exam.amount * studentCount;
  const discountValue = Math.round(baseAmount * 0.1);
  const finalAmount = discountApplied
    ? baseAmount - discountValue
    : baseAmount;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl">
        <div className="flex justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Payment Summary</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <InfoRow label="Exam" value={exam.name} />
          <InfoRow label="Students" value={studentCount} />
          <InfoRow label="Fee / Student" value={`₹${exam.amount}`} />
          <InfoRow label="Subtotal" value={`₹${baseAmount}`} />

          {discountApplied && (
            <InfoRow
              label="Discount (10%)"
              value={`- ₹${discountValue}`}
              highlight
            />
          )}

          <div className="bg-indigo-50 p-4 rounded-xl flex justify-between">
            <span className="font-semibold">Grand Total</span>
            <span className="font-bold text-indigo-700">
              ₹{finalAmount}
            </span>
          </div>

          <button
            disabled={discountApplied}
            onClick={() => setDiscountApplied(true)}
            className={`w-full py-3 rounded-xl font-semibold ${
              discountApplied
                ? "bg-green-500 text-white"
                : "bg-indigo-600 text-white"
            }`}
          >
            {discountApplied
              ? "Discount Applied ✓"
              : "Apply 10% Discount"}
          </button>
        </div>

        <div className="border-t px-6 py-4 flex gap-3">
          <button onClick={onClose} className="w-1/2 border rounded-xl py-3">
            Cancel
          </button>
          <button
            onClick={() =>
              onProceed({
                amount: finalAmount,
                discountApplied,
              })
            }
            className="w-1/2 bg-indigo-600 text-white rounded-xl py-3"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight }) {
  return (
    <div
      className={`flex justify-between ${
        highlight ? "text-green-600 font-medium" : ""
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
