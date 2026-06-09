'use client';

import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/256700607221"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-green-500 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 z-50"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={24} className="sm:hidden" />
      <FaWhatsapp size={32} className="hidden sm:block" />
    </a>
  );
}
