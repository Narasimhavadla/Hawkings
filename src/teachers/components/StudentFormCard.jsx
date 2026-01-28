import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import StudentInput from "./StudentInput";

export default function StudentFormCard({
  index,
  data,
  onChange,
  onAdd,
  onRemove,
  canRemove,
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Student {index + 1}</h2>

        <div className="flex gap-2">
          <button
            onClick={onAdd}
            className="bg-green-500 text-white rounded-full px-2 py-1"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>

          {canRemove && (
            <button
              onClick={onRemove}
              className="bg-red-500 text-white rounded-full px-2 py-1"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <StudentInput label="Student Name" name="name" value={data.name} onChange={onChange} />
        <div>
          <label className="text-sm text-gray-600">Class</label>
          <select
            name="Class"
            value={data.Class}
            onChange={onChange}
            className="w-full h-11 border rounded-lg"
          >
            <option value="">Select class</option>
            <option>Class-4</option>
            <option>Class-5</option>
            <option>Class-6</option>
            <option>Class-7</option>
            <option>Class-8</option>
            <option>Class-9</option>
          </select>
        </div>
        <StudentInput label="Father Name" name="fathername" value={data.fathername} onChange={onChange} />
        <StudentInput label="Email" name="email" value={data.email} onChange={onChange} />
        <StudentInput label="Phone" name="phone" value={data.phone} onChange={onChange} />
        <StudentInput label="Alternate Phone" name="altphone" value={data.altphone} onChange={onChange} />
        <StudentInput label="DOB" type="date" name="dob" value={data.dob} onChange={onChange} />
        <StudentInput label="Institute" name="institute" value={data.institute} onChange={onChange} />
        <StudentInput label="State" name="state" value={data.state} onChange={onChange} />
        <StudentInput label="City" name="city" value={data.city} onChange={onChange} />
        <StudentInput label="Pincode" name="pincode" value={data.pincode} onChange={onChange} />

        
      </div>
    </div>
  );
}
