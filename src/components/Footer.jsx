import { useLocation } from "react-router-dom";
import face from "../assets/Facebook.png";
import youtu from "../assets/youtube.png";
import tik from "../assets/tiktok.png";
import momo from "../assets/MoMo.png";

export default function Footer() {
  const location = useLocation();
  if (["/login", "/register"].includes(location.pathname)) return null;

  return (
    <footer className="bg-black text-white pt-12 pb-4">
      <div className="max-w-7xl mx-auto px-6">
        {/* Newsletter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Sign Up To Our Newsletter.</h2>
            <p className="text-gray-300">Be the first to hear about the latest offers.</p>
          </div>
          <form className="flex gap-2 w-full md:w-auto">
            <input type="email" placeholder="Your Email" className="px-4 py-2 rounded border border-gray-400 bg-black text-white w-full md:w-64" />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded">Subscribe</button>
          </form>
        </div>
        {/* Footer columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm mb-8">
          <div>
            <h3 className="font-semibold mb-3">Information</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">About Zip</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Search</a></li>
              <li><a href="#" className="hover:underline">Terms</a></li>
              <li><a href="#" className="hover:underline">Orders and Returns</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">Advanced Search</a></li>
              <li><a href="#" className="hover:underline">Newsletter Subscription</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">PC Parts</h3>
            <ul className="space-y-1">
              <li>CPUS</li>
              <li>Add On Cards</li>
              <li>Hard Drives (Internal)</li>
              <li>Graphic Cards</li>
              <li>Keyboards / Mice</li>
              <li>Cases / Power Supplies / Cooling</li>
              <li>RAM (Memory)</li>
              <li>Software</li>
              <li>Speakers / Headsets</li>
              <li>Motherboards</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Desktop PCs</h3>
            <ul className="space-y-1">
              <li>Custom PCs</li>
              <li>Servers</li>
              <li>MSI All-in-One PCs</li>
              <li>HP/Compaq PCs</li>
              <li>ASUS PCs</li>
              <li>Tecs PCs</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Laptops</h3>
            <ul className="space-y-1">
              <li>Everyday Use Notebooks</li>
              <li>MSI Workstation Series</li>
              <li>MSI Prestige Series</li>
              <li>Tablets and Pads</li>
              <li>Notebooks</li>
              <li>Infinity Gaming Notebooks</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Address</h3>
            <div className="text-xs text-gray-300 mb-1">Address: 1234 Street Adress City Address, 1234</div>
            <div className="text-xs text-gray-300 mb-1">Phones: <a href="#" className="text-blue-400 hover:underline">(02) 1234 5678</a></div>
            <div className="text-xs text-gray-300 mb-1">We are open Monday–Thursday: 8:00 AM – 5.30 PM</div>
            <div className="text-xs text-gray-300 mb-1">Friday: 9:00 AM – 6:00 PM</div>
            <div className="text-xs text-gray-300 mb-1">Saturday: 11:00 AM – 5:00 PM</div>
            <div className="text-xs text-gray-300 mb-1">E-mail: <a href="#" className="text-blue-400 hover:underline">shop@email.com</a></div>
          </div>
        </div>
        {/* Social icons and payment */}
        <div className="flex items-center justify-between border-t border-gray-800 pt-4">
          <div className="flex gap-3">
            <a href="#" className="text-white hover:text-gray-300"><i className="fab fa-facebook text-xl"></i></a>
            <a href="#" className="text-white hover:text-gray-300"><i className="fab fa-instagram text-xl"></i></a>
          </div>
          <div className="flex gap-2">
            <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="Paypal" className="h-6" />
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6" />
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-6" />
            <img src="https://img.icons8.com/color/48/000000/amex.png" alt="Amex" className="h-6" />
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-gray-400">
          Copyright © 2020 Shop Pty. Ltd.
        </div>
      </div>
    </footer>
  );
}
