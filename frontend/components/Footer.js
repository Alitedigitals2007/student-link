import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Student Link</h3>
            <p className="text-gray-400">Connecting Nigerian students across universities for learning, collaboration, and growth.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/timeline" className="hover:text-white">Timeline</a></li>
              <li><a href="/resources" className="hover:text-white">Resources</a></li>
              <li><a href="/marketplace" className="hover:text-white">Marketplace</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="text-gray-400 space-y-2">
              <li>Email: support@studentlink.ng</li>
              <li>WhatsApp: +234 XXX XXXX XXX</li>
              <li>Twitter: @studentlinkg</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Student Link. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
