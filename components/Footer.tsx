'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaInstagram, FaTwitter, FaTiktok, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-safari-dark to-black text-white border-t-4 border-safari-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4 group">
              <Image
                src="/images/logo.png"
                alt="Jinja Safaris Logo"
                width={80}
                height={80}
                className="h-16 w-auto group-hover:scale-110 transition-transform duration-300"
              />
            </Link>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-safari-sand to-safari-orange bg-clip-text text-transparent mb-2">Jinja Safaris</h3>
            <p className="text-safari-sand mb-1 text-base">Hub of the Nile Tourism</p>
            <p className="text-sm text-gray-400">Trusted since 2014</p>
          </div>

          <div>
            <h4 className="text-base font-bold mb-4 text-safari-sand">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/activities" className="text-sm text-gray-300 hover:text-safari-orange transition">Activities</Link></li>
              <li><Link href="/hotels" className="text-sm text-gray-300 hover:text-safari-orange transition">Hotels</Link></li>
              <li><Link href="/gallery" className="text-sm text-gray-300 hover:text-safari-orange transition">Gallery</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-300 hover:text-safari-orange transition">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-300 hover:text-safari-orange transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-bold mb-4 text-safari-sand">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-safari-orange mt-1 flex-shrink-0 text-sm" />
                <span className="text-xs">Rubaga Hill, Jinja City, Eastern Uganda</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-safari-orange flex-shrink-0 text-sm" />
                <span className="text-xs">+256 700 607221</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-safari-orange flex-shrink-0 text-sm" />
                <span className="text-xs break-all">jinjasafaris@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-bold mb-4 text-safari-sand">Follow Us</h4>
            <div className="flex flex-wrap gap-3">
              <a href="https://wa.me/256700607221" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-safari-orange transition transform hover:scale-110">
                <FaWhatsapp />
              </a>
              <a href="https://instagram.com/jinjasafaris" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-safari-orange transition transform hover:scale-110">
                <FaInstagram />
              </a>
              <a href="https://twitter.com/jinjasafaris" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-safari-orange transition transform hover:scale-110">
                <FaTwitter />
              </a>
              <a href="https://tiktok.com/@jinjasafaris" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-safari-orange transition transform hover:scale-110">
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-safari-sand/30 mt-8 pt-6 text-center text-gray-400 text-sm space-y-1">
          <p>&copy; {new Date().getFullYear()} Jinja Safaris. All rights reserved.</p>
          <p>Built by{' '}<a href="https://altra.ltd" target="_blank" rel="noopener noreferrer" className="text-safari-orange hover:text-safari-sand transition-colors duration-200 font-medium">Altra</a></p>
        </div>
      </div>
    </footer>
  );
}
