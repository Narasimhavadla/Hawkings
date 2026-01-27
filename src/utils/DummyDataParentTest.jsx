import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
export default function DummyDataParentTest(){
    return(
        <div className="flex gap-5 grid grid-cols-1 md:grid-cols-3">
                 <div>
              <div
                  className="bg-gradient-to-br from-gray-100 to-gray-50 
                      rounded-2xl border border-gray-200 p-6
                      hover:shadow-lg transition-all">
            {/* Header with label and stars */}
            <div className="flex items-center justify-between mb-4">
              <span
                className="px-3 py-1 text-xs font-semibold rounded-full 
                          bg-indigo-100 text-indigo-700"
              >
                Parent Review
              </span>

              <div className="flex gap-1">
                <i className="fas fa-star text-yellow-400 text-sm"></i>
                <i className="fas fa-star text-yellow-400 text-sm"></i>
                <i className="fas fa-star text-yellow-400 text-sm"></i>
                <i className="fas fa-star text-yellow-400 text-sm"></i>
                <i className="fas fa-star text-yellow-400 text-sm"></i>
              </div>
            </div>

              {/* Testimonial message */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                “Hawkings Maths Olympiad helped my child develop logical thinking. The platform is very well designed.”
              </p>

  {/* Parent info */}
      <div className="flex items-center gap-3 border-t pt-4">
        <div
          className="w-11 h-11 rounded-full bg-indigo-600
                    flex items-center justify-center 
                    text-white font-bold"
        >
          S
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">Suresh Kumar</h4>
          <p className="text-xs text-gray-500">Parent</p>
        </div>
      </div>
            </div>

          </div>
          <div>
              <div
                  className="bg-gradient-to-br from-gray-100 to-gray-50 
                      rounded-2xl border border-gray-200 p-6
                      hover:shadow-lg transition-all">
            {/* Header with label and stars */}
            <div className="flex items-center justify-between mb-4">
              <span
                className="px-3 py-1 text-xs font-semibold rounded-full 
                          bg-indigo-100 text-indigo-700"
              >
                Parent Review
              </span>

              <div className="flex gap-1">
                <i className="fas fa-star text-yellow-400 text-sm"></i>
                <i className="fas fa-star text-yellow-400 text-sm"></i>
                <i className="fas fa-star text-yellow-400 text-sm"></i>
                <i className="fas fa-star text-yellow-400 text-sm"></i>
                <i className="fas fa-star text-yellow-400 text-sm"></i>
              </div>
            </div>

              {/* Testimonial message */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                "I’ve noticed a big improvement in my child’s problem-solving skills and exam confidence. The challenges are age-appropriate and fun."  </p>

  {/* Parent info */}
      <div className="flex items-center gap-3 border-t pt-4">
        <div
          className="w-11 h-11 rounded-full bg-indigo-600
                    flex items-center justify-center 
                    text-white font-bold"
        >
          S
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">Govind</h4>
          <p className="text-xs text-gray-500">Parent</p>
        </div>
      </div>
            </div>

          </div>
          <div>
              <div
                  className="bg-gradient-to-br from-gray-100 to-gray-50 
                      rounded-2xl border border-gray-200 p-6
                      hover:shadow-lg transition-all">
            {/* Header with label and stars */}
            <div className="flex items-center justify-between mb-4">
              <span
                className="px-3 py-1 text-xs font-semibold rounded-full 
                          bg-indigo-100 text-indigo-700"
              >
                Parent Review
              </span>

              <div className="flex gap-1">
                <i className="fas fa-star text-yellow-400 text-sm"></i>
                <i className="fas fa-star text-yellow-400 text-sm"></i>
                <i className="fas fa-star text-yellow-400 text-sm"></i>
                <i className="fas fa-star text-yellow-400 text-sm"></i>
                <i className="fas fa-star text-yellow-400 text-sm"></i>
              </div>
            </div>

              {/* Testimonial message */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                  "My child looks forward to participating every week. Hawkings Maths Olympiad makes learning math interesting and boosts confidence."              </p>

  {/* Parent info */}
      <div className="flex items-center gap-3 border-t pt-4">
        <div
          className="w-11 h-11 rounded-full bg-indigo-600
                    flex items-center justify-center 
                    text-white font-bold"
        >
          S
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">Kiran</h4>
          <p className="text-xs text-gray-500">Parent</p>
        </div>
      </div>
            </div>

          </div>
        </div>
    )
}