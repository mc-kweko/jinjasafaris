export const dynamic = 'force-dynamic';

import { supabase } from '@/lib/supabase';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';

async function getContactInfo() {
  const { data } = await supabase.from('contact_info').select('*').limit(1).single();
  return data;
}

export const metadata = {
  title: 'Contact Us - Jinja Safaris',
  description: 'Get in touch with Jinja Safaris',
};

export default async function ContactPage() {
  const contact = await getContactInfo();

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            We&apos;re here to help plan your adventure
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-3 rounded-full">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Address</h3>
                  <p className="text-gray-600 dark:text-gray-300">{contact?.address || 'Rubaga Hill, Jinja City, Eastern Uganda'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-3 rounded-full">
                  <FaPhone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-300">{contact?.phone || '+256 123 456 789'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-3 rounded-full">
                  <FaEnvelope size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">{contact?.email || 'info@jinjasafaris.com'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white p-3 rounded-full">
                  <FaWhatsapp size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
                  <a 
                    href={`https://wa.me/${contact?.whatsapp || '256123456789'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Chat with us
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href={contact?.instagram} target="_blank" rel="noopener noreferrer" className="bg-primary text-white p-3 rounded-full hover:bg-secondary transition">
                  <FaInstagram size={24} />
                </a>
                <a href={contact?.twitter} target="_blank" rel="noopener noreferrer" className="bg-primary text-white p-3 rounded-full hover:bg-secondary transition">
                  <FaTwitter size={24} />
                </a>
                <a href={contact?.tiktok} target="_blank" rel="noopener noreferrer" className="bg-primary text-white p-3 rounded-full hover:bg-secondary transition">
                  <FaTiktok size={24} />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Our Location</h2>
            <div className="rounded-lg overflow-hidden shadow-lg h-96">
              <iframe
                src={contact?.map_embed || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.757!2d33.204!3d0.424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMjUnMjYuNCJOIDMzwrAxMicxNC40IkU!5e0!3m2!1sen!2sug!4v1234567890"}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
