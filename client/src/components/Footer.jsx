import { Link } from "react-router-dom";


const Footer = () => {
return (
<footer className="bg-black text-gray-300 py-10 border-t border-gray-700">
<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
<div>
<h2 className="text-2xl font-bold text-yellow-400">FoodieZone</h2>
<p className="mt-3 text-sm">Your favorite meals delivered fast and fresh.</p>
</div>
<div>
<h3 className="text-lg font-semibold text-white mb-3">Explore</h3>
<ul className="space-y-2 text-sm">
<li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
<li><Link to="/restaurants" className="hover:text-yellow-400">Restaurants</Link></li>
<li><Link to="/menu" className="hover:text-yellow-400">Menu</Link></li>
<li><Link to="/cart" className="hover:text-yellow-400">Cart</Link></li>
</ul>
</div>
<div>
<h3 className="text-lg font-semibold text-white mb-3">Support</h3>
<ul className="space-y-2 text-sm">
<li><Link to="/help" className="hover:text-yellow-400">Help Center</Link></li>
<li><Link to="/track" className="hover:text-yellow-400">Order Tracking</Link></li>
<li><Link to="/privacy" className="hover:text-yellow-400">Privacy Policy</Link></li>
<li><Link to="/terms" className="hover:text-yellow-400">Terms</Link></li>
</ul>
</div>
<div>
<h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
<ul className="space-y-2 text-sm">
<li>Email: support@foodiezone.com</li>
<li>Phone: +91 98765 43210</li>
<li><a href="#" className="hover:text-yellow-400">Instagram</a></li>
<li><a href="#" className="hover:text-yellow-400">Facebook</a></li>
</ul>
</div>
</div>
<div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-5">
© {new Date().getFullYear()} FoodieZone — All rights reserved.
</div>
</footer>
);
};


export default Footer;