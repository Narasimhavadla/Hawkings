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

export default function StudentForm() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg px-6 py-8">

      {/* Section Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">
        Student Registration Details
      </h2>

      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Class */}
        <InputSelect
          icon={faIdCard}
          name="class"
          label="Class"
          required
          onChange={handleChange}
          options={[
            "Class 1","Class 2","Class 3","Class 4","Class 5",
            "Class 6","Class 7","Class 8","Class 9"
          ]}
        />

        {/* Student Name */}
        <InputField
          icon={faUser}
          name="name"
          label="Student Name"
          required
          onChange={handleChange}
        />

        {/* Father Name */}
        <InputField
          icon={faUser}
          name="fatherName"
          label="Father Name"
          required
          onChange={handleChange}
        />

        {/* Email */}
        <InputField
          icon={faEnvelope}
          type="email"
          name="email"
          label="Email"
          required
          onChange={handleChange}
        />

        {/* Phone */}
        <InputField
          icon={faPhone}
          name="phone"
          label="Phone Number"
          required
          onChange={handleChange}
        />

        {/* Alternate Phone */}
        <InputField
          icon={faPhone}
          name="altPhone"
          label="Alternate Phone"
          onChange={handleChange}
        />

        {/* DOB */}
        <InputField
          icon={faCalendarDays}
          type="date"
          name="dob"
          label="Date of Birth"
          onChange={handleChange}
        />

        {/* Institute */}
        <InputField
          icon={faSchool}
          name="institute"
          label="Institute Name"
          required
          onChange={handleChange}
        />

        {/* State */}
        <InputSelect
          icon={faLocationDot}
          name="state"
          label="State"
          required
          onChange={handleChange}
          options={[
            "Telangana",
            "Andhra Pradesh",
            "Karnataka",
            "Tamil Nadu"
          ]}
        />

        {/* City */}
        <InputField
          icon={faLocationDot}
          name="city"
          label="City"
          required
          onChange={handleChange}
        />

        {/* Pincode */}
        <InputField
          name="pincode"
          label="Pin Code"
          required
          onChange={handleChange}
        />

      </form>
    </div>
  );
}

/* ---------- REUSABLE INPUT ---------- */
function InputField({ label, icon, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}

        <input
          {...props}
          className={`w-full h-11 border rounded-lg px-3
          ${icon ? "pl-9" : ""}
           focus:outline-none`}
        />
      </div>
    </div>
  );
}

/* ---------- SELECT ---------- */
function InputSelect({ label, icon, options, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}

        <select
          {...props}
          className={`w-full h-11 border rounded-lg px-3 bg-white
          ${icon ? "pl-9" : ""}
           focus:outline-none`}
        >
          <option value="">Select</option>
          {options.map((op) => (
            <option key={op}>{op}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
