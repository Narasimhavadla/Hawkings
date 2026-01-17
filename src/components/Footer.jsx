function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#0f172a] to-[#020617] text-white h-48">
      
      {/* Top Links */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-sm md:text-base">
          
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-purple-400 transition">
              Maths competition details
            </a>
            <a href="/aboutus" className="hover:text-purple-400 transition">
              About us
            </a>
            <a href="/maths-competetion-registration" className="hover:text-purple-400 transition">
              Registration
            </a>
            <a href="/contact" className="hover:text-purple-400 transition">
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-600 opacity-40" />

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs md:text-sm text-gray-300">

          <p className="text-center md:text-left">
            © 2024 Hawkings, Inc. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="hover:text-white transition">
              Terms & Conditions
            </a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-white transition">
              Refund Policy
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
