'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaInstagram, FaTwitter, FaTiktok, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-safari-dark to-black text-white border-t-4 border-safari-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <Image
                src="/images/logo.png"
                alt="Jinja Safaris Logo"
                width={100}
                height={100}
                className="h-24 w-auto group-hover:scale-110 transition-transform duration-300"
              />
            </Link>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-safari-sand to-safari-orange bg-clip-text text-transparent mb-4">Jinja Safaris</h3>
            <p className="text-safari-sand mb-4 text-lg">Hub of the Nile Tourism</p>
            <p className="text-sm text-gray-400">Trusted since 2014</p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-safari-sand">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/activities" className="text-gray-300 hover:text-safari-orange transition">Activities</Link></li>
              <li><Link href="/hotels" className="text-gray-300 hover:text-safari-orange transition">Hotels</Link></li>
              <li><Link href="/gallery" className="text-gray-300 hover:text-safari-orange transition">Gallery</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-safari-orange transition">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-safari-orange transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-safari-sand">Contact</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-safari-orange mt-1 flex-shrink-0" />
                <span className="text-sm">Rubaga Hill, Jinja City, Eastern Uganda</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-safari-orange flex-shrink-0" />
                <span className="text-sm">+256 123 456 789</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-safari-orange flex-shrink-0" />
                <span className="text-sm">info@jinjasafaris.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-safari-sand">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://wa.me/256123456789" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-safari-orange transition transform hover:scale-110">
                <FaWhatsapp />
              </a>
              <a href="https://instagram.com/jinjasafaris" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-safari-orange transition transform hover:scale-110">
                <FaInstagram />
              </a>
              <a href="https://twitter.com/jinjasafaris" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-safari-orange transition transform hover:scale-110">
                <FaTwitter />
              </a>
              <a href="https://tiktok.com/@jinjasafaris" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-safari-orange transition transform hover:scale-110">
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-safari-sand/30 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Jinja Safaris. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
