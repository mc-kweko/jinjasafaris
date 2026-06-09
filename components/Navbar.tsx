'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-safari-dark shadow-lg fixed w-full z-50 border-b-4 border-safari-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group min-w-0">
            <Image
              src="/images/logo.png"
              alt="Jinja Safaris Logo"
              width={80}
              height={80}
              className="h-12 sm:h-16 w-auto flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
            />
            <div className="hidden sm:block min-w-0">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-safari-brown to-safari-orange bg-clip-text text-transparent truncate block">Jinja Safaris</span>
              <p className="text-xs text-safari-brown dark:text-safari-sand">Hub of the Nile Tourism</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="px-3 py-2 text-sm text-safari-brown dark:text-safari-sand hover:bg-safari-cream dark:hover:bg-safari-brown/20 rounded-lg transition font-medium">Home</Link>
            <Link href="/activities" className="px-3 py-2 text-sm text-safari-brown dark:text-safari-sand hover:bg-safari-cream dark:hover:bg-safari-brown/20 rounded-lg transition font-medium">Activities</Link>
            <Link href="/hotels" className="px-3 py-2 text-sm text-safari-brown dark:text-safari-sand hover:bg-safari-cream dark:hover:bg-safari-brown/20 rounded-lg transition font-medium">Hotels</Link>
            <Link href="/gallery" className="px-3 py-2 text-sm text-safari-brown dark:text-safari-sand hover:bg-safari-cream dark:hover:bg-safari-brown/20 rounded-lg transition font-medium">Gallery</Link>
            <Link href="/blog" className="px-3 py-2 text-sm text-safari-brown dark:text-safari-sand hover:bg-safari-cream dark:hover:bg-safari-brown/20 rounded-lg transition font-medium">Blog</Link>
            <Link href="/contact" className="px-3 py-2 text-sm text-safari-brown dark:text-safari-sand hover:bg-safari-cream dark:hover:bg-safari-brown/20 rounded-lg transition font-medium">Contact</Link>
            <Link href="/booking" className="ml-2 safari-btn !px-5 !py-2 text-sm">Book Now</Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-safari-brown dark:text-safari-sand">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-safari-dark border-t border-safari-sand/30">
          <div className="px-3 pt-2 pb-4 space-y-1">
            {[
              { href: '/', label: 'Home' },
              { href: '/activities', label: 'Activities' },
              { href: '/hotels', label: 'Hotels' },
              { href: '/gallery', label: 'Gallery' },
              { href: '/blog', label: 'Blog' },
              { href: '/contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-safari-brown dark:text-safari-sand hover:bg-safari-cream dark:hover:bg-safari-brown/20 rounded-lg font-medium"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="block mx-2 mt-2 px-4 py-3 safari-btn text-center"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
