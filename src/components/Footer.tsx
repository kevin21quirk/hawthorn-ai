'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="text-white py-12" style={{backgroundColor: '#222222'}}>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="text-center mb-6">
          <Link href="/" className="text-white leading-none inline-block">
            <div className="text-5xl font-bold">The Hawthorn</div>
            <div className="text-2xl font-light -mt-2 pl-1">bar and bistro</div>
          </Link>
        </div>

        {/* About Section */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="text-gray-300 leading-relaxed lg:text-[18px] md:text-[16px]">
            The Hawthorn, nestled in Greeba, is a family-run bar & bistro owned by John Howard. Since May 2000, it has been firmly established as a food destination. The Hawthorn serves delicious food in welcoming and comfortable surroundings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Opening Hours Section */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Normal Kitchen Opening Hours</h4>
            <div className="space-y-2 text-gray-300 lg:text-[18px] md:text-[16px]">
              <div className="flex justify-between">
                <span>Monday</span>
                <span>12.00 to 07.00 pm</span>
              </div>
              <div className="flex justify-between">
                <span>Tuesday – Thursday</span>
                <span>12.00 to 08.00 pm</span>
              </div>
              <div className="flex justify-between">
                <span>Friday – Saturday</span>
                <span>12.00 to 09.00 pm</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>12.00 to 07.00 pm</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs mt-4 italic lg:text-[14px] md:text-[12px]">
              Please note that we operate flexible closing times. During quiet evenings we may close early, so we recommend calling us beforehand.
            </p>
          </div>
          
          {/* Contact Information Section */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3 text-gray-300 lg:text-[18px] md:text-[16px]">
              <div>
                <span className="font-semibold">Call</span>
                <p>+44 1624 801268</p>
              </div>
              <div>
                <span className="font-semibold">Email</span>
                <p>info@thehawthorn.im</p>
              </div>
              <div>
                <span className="font-semibold">Address</span>
                <p>The Hawthorn, Main Road, Greeba,</p>
                <p>IM4 3LF, Isle of Man</p>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-gray-300 lg:text-[18px] md:text-[16px]">
              <Link href="/" className="block hover:text-white transition-colors">Home</Link>
              <Link href="/about" className="block hover:text-white transition-colors">About Us</Link>
              <Link href="/menu" className="block hover:text-white transition-colors">Our Menus</Link>
              <Link href="/gallery" className="block hover:text-white transition-colors">Gallery</Link>
              <Link href="/reviews" className="block hover:text-white transition-colors">Reviews</Link>
              <Link href="/reservations" className="block hover:text-white transition-colors">Book a Table</Link>
            </div>
          </div>

          {/* Our Location Section */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Our Location</h4>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24184.123456789!2d-4.567890!3d54.234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMTAnMDguNCJTIDQwrzE0JzA4LjQiVg!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
                title="The Hawthorn Location Map"
              />
            </div>
            <p className="text-gray-400 text-xs mt-2 lg:text-[14px] md:text-[12px]">
              Find us in the heart of Greeba, Isle of Man
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-400 lg:text-[18px] md:text-[16px]">&copy; 2026 The Hawthorn. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors lg:text-[18px] md:text-[16px]">
                Terms and Conditions
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors lg:text-[18px] md:text-[16px]">
                Privacy Policy
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors lg:text-[18px] md:text-[16px]">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
