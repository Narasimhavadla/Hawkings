import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSchool,
  faPhone,
  faEnvelope,
  faLocationDot,
  faIdCard,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

export default function StudentForm({ onSubmit, loading, successMessage }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-4 md:p-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {successMessage && (
        <div className="col-span-full text-green-600 font-semibold text-center">
          {successMessage}
        </div>
      )}

      <InputSelect
        icon={faIdCard}
        name="Class"
        label="Class"
        required
        onChange={handleChange}
        options={["Class 1","Class 2","Class 3","Class 4","Class 5","Class 6","Class 7","Class 8","Class 9"]}
      />

      <InputField icon={faUser} name="name" label="Student Name" required onChange={handleChange} />
      <InputField icon={faSchool} name="institute" label="Institute Name" required onChange={handleChange} />
      <InputField icon={faUser} name="fathername" label="Father Name" required onChange={handleChange} />
      <InputField icon={faEnvelope} type="email" name="email" label="Email" required onChange={handleChange} />
      <InputField icon={faPhone} name="phone" label="Phone Number" required onChange={handleChange} />
      <InputField icon={faPhone} name="altPhone" label="Alternate Phone" onChange={handleChange} />
      <InputField icon={faCalendarDays} type="date" name="dob" label="Date of Birth" onChange={handleChange} />
      <InputSelect icon={faLocationDot} name="state" label="State" required onChange={handleChange} options={["Telangana","Andhra Pradesh","Karnataka","Tamil Nadu"]} />
      <InputField icon={faLocationDot} name="city" label="City" required onChange={handleChange} />
      <InputField name="pincode" label="Pin Code" required onChange={handleChange} />

      <button
        type="submit"
        disabled={loading}
        className="col-span-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-green-700 transition-all disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Register Student"}
      </button>
    </form>
  );
}

/* ---------- Reusable Inputs ---------- */
function InputField({ label, icon, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600">{label} {required && <span className="text-red-500">*</span>}</label>
      <div className="relative">
        {icon && <FontAwesomeIcon icon={icon} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />}
        <input {...props} className={`w-full h-10 border rounded-lg px-3 ${icon ? "pl-9" : ""} focus:outline-none`} />
      </div>
    </div>
  );
}

function InputSelect({ label, icon, options, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600">{label} {required && <span className="text-red-500">*</span>}</label>
      <div className="relative">
        {icon && <FontAwesomeIcon icon={icon} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />}
        <select {...props} className={`w-full h-10 border rounded-lg px-3 bg-white ${icon ? "pl-9" : ""} focus:outline-none`}>
          <option value="">Select</option>
          {options.map((op) => (<option key={op} value={op}>{op}</option>))}
        </select>
      </div>
    </div>
  );
}
