import StudentForm from "../forms/studentForm";

function MathsCompReg() {
  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4">

      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700">
          Hawking’s National Maths Competition
        </h1>
        <p className="text-gray-600 mt-3 text-sm md:text-base">
          A prestigious platform for young minds to explore logic, reasoning, and excellence
        </p>
      </div>

      {/* Form */}
      <StudentForm />

      {/* Submit */}
      <div className="text-center mt-8">
        <button
          type="button"
          className="px-12 py-3 text-lg font-semibold text-white rounded-lg
                     bg-indigo-600 hover:bg-indigo-700
                     transition shadow-md active:scale-95"
        >
          Submit Registration
        </button>
      </div>
    </div>
  );
}

export default MathsCompReg;
