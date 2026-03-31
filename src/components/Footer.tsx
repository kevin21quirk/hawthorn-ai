const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">The Hawthorn</h3>
            <p className="text-gray-300 text-sm md:text-base lg:text-lg">
              Experience fine dining at its best. Exceptional cuisine, elegant atmosphere, and impeccable service.
            </p>
          </div>
          
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4 text-sm md:text-base lg:text-lg">Contact Us</h4>
            <p className="text-gray-300 text-sm md:text-base lg:text-lg">123 Gourmet Street</p>
            <p className="text-gray-300 text-sm md:text-base lg:text-lg">Culinary District, City 12345</p>
            <p className="text-gray-300 text-sm md:text-base lg:text-lg">(555) 123-4567</p>
            <p className="text-gray-300 text-sm md:text-base lg:text-lg">info@hawthorn.com</p>
          </div>
          
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4 text-sm md:text-base lg:text-lg">Hours</h4>
            <p className="text-gray-300 text-sm md:text-base lg:text-lg">Monday - Thursday: 5:00 PM - 10:00 PM</p>
            <p className="text-gray-300 text-sm md:text-base lg:text-lg">Friday - Saturday: 5:00 PM - 11:00 PM</p>
            <p className="text-gray-300 text-sm md:text-base lg:text-lg">Sunday: 12:00 PM - 9:00 PM</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm md:text-base lg:text-lg">&copy; 2026 The Hawthorn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
