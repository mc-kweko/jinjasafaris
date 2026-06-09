'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Slide {
  id: string;
  image_url: string;
  title: string;
  subtitle: string;
}

interface HeroSlideshowProps {
  slides: Slide[];
}

export default function HeroSlideshow({ slides }: HeroSlideshowProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const next = () => setCurrent((current + 1) % slides.length);
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);

  const CTAButtons = () => (
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
      <Link href="/booking" className="w-full sm:w-auto bg-primary hover:bg-secondary text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold transition text-center">
        Book Now
      </Link>
      <a href="https://wa.me/256700607221" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold transition text-center">
        WhatsApp Us
      </a>
    </div>
  );

  if (!slides.length) {
    return (
      <div className="relative h-[55vh] sm:h-[65vh] md:h-[600px] bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
        <div className="text-center text-white px-4 w-full max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-3 sm:mb-4">Jinja Safaris</h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8">Hub of the Nile Tourism</p>
          <CTAButtons />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[55vh] sm:h-[65vh] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="w-full h-full relative">
            <Image
              src={slide.image_url}
              alt={slide.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority={index === current}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white px-4 w-full max-w-3xl mx-auto animate-fade-in">
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-3 sm:mb-4 leading-tight">{slide.title}</h1>
                <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8">{slide.subtitle}</p>
                <CTAButtons />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button onClick={prev} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-2 sm:p-3 rounded-full transition">
        <FaChevronLeft size={18} className="sm:w-6 sm:h-6" />
      </button>
      <button onClick={next} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-2 sm:p-3 rounded-full transition">
        <FaChevronRight size={18} className="sm:w-6 sm:h-6" />
      </button>

      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition ${index === current ? 'bg-white' : 'bg-white bg-opacity-50'}`}
          />
        ))}
      </div>
    </div>
  );
}
