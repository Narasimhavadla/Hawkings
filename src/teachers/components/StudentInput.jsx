export default function StudentInput({ label, type = "text", ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type={type}
        {...props}
        className="w-full h-11 border rounded-lg px-3 focus:border-indigo-500 outline-none"
      />
    </div>
  );
}
