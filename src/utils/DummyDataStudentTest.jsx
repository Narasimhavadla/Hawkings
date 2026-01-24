import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
export default function DummyDataStudentTest(){
    return(
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

  {/* Testimonial 1 */}
  <div className="bg-white rounded-2xl shadow-md p-6 
                  hover:shadow-xl hover:-translate-y-1 
                  transition-all duration-300">
    <FontAwesomeIcon
      icon={faQuoteLeft}
      className="text-purple-500 text-3xl mb-4"
    />
    <p className="text-gray-600 text-sm leading-relaxed mb-5">
      "Hawkings Maths Olympiad made learning math exciting. The questions were challenging but fun, and I feel more confident in solving problems now."
    </p>
    <div className="flex gap-1 mb-4">
      <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
      <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
      <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
      <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
      <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
    </div>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 
                      flex items-center justify-center text-white font-bold">
        A
      </div>
      <div>
        <h4 className="font-semibold">Aarav</h4>
        <p className="text-xs text-gray-500">Student</p>
      </div>
    </div>
  </div>

  {/* Testimonial 2 */}
  <div className="bg-white rounded-2xl shadow-md p-6 
                  hover:shadow-xl hover:-translate-y-1 
                  transition-all duration-300">
    <FontAwesomeIcon
      icon={faQuoteLeft}
      className="text-purple-500 text-3xl mb-4"
    />
    <p className="text-gray-600 text-sm leading-relaxed mb-5">
      "I loved the logic and reasoning questions. They made me think in new ways and improved my problem-solving skills."
    </p>
    <div className="flex gap-1 mb-4">
      <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
      <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
      <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
      <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
      <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
    </div>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 
                      flex items-center justify-center text-white font-bold">
        A
      </div>
      <div>
        <h4 className="font-semibold">Ananya</h4>
        <p className="text-xs text-gray-500">Student</p>
      </div>
    </div>
  </div>

  {/* Testimonial 3 */}
  <div className="bg-white rounded-2xl shadow-md p-6 
                  hover:shadow-xl hover:-translate-y-1 
                  transition-all duration-300">
    <FontAwesomeIcon
      icon={faQuoteLeft}
      className="text-purple-500 text-3xl mb-4"
    />
    <p className="text-gray-600 text-sm leading-relaxed mb-5">
      "The competition was engaging and well-organized. It helped me practice faster and sharpened my math skills."
    </p>
    <div className="flex gap-1 mb-4">
      <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
      <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
      <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
      <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
    </div>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 
                      flex items-center justify-center text-white font-bold">
        R
      </div>
      <div>
        <h4 className="font-semibold">Rohit</h4>
        <p className="text-xs text-gray-500">Student</p>
      </div>
    </div>
  </div>

</div>

        </div>
    )
}