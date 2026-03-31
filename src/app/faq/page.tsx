export default function FAQPage() {
  const faqCategories = [
    {
      title: "Reservations & Booking",
      items: [
        {
          question: "How far in advance should I make a reservation?",
          answer: "We recommend making reservations 1-2 weeks in advance for weekends and 3-4 days for weekdays. For special occasions or large groups (6+ people), please book at least 2 weeks ahead."
        },
        {
          question: "Do you accept walk-ins?",
          answer: "Yes, we welcome walk-ins based on availability. However, we strongly recommend making a reservation, especially for weekend dining, to ensure we can accommodate you."
        },
        {
          question: "What is your cancellation policy?",
          answer: "Cancellations must be made at least 24 hours in advance. For parties of 6 or more, 48 hours notice is required. Late cancellations or no-shows may incur a fee of £40 per person."
        },
        {
          question: "Can I modify my reservation?",
          answer: "Yes, you can modify your reservation up to 24 hours before your scheduled time. Please call us at (555) 123-4568 or use our online reservation system."
        }
      ]
    },
    {
      title: "Menu & Dining",
      items: [
        {
          question: "Do you accommodate dietary restrictions?",
          answer: "Absolutely! We can accommodate most dietary restrictions including vegetarian, vegan, gluten-free, and food allergies. Please inform us when making your reservation so our chefs can prepare accordingly."
        },
        {
          question: "How often does your menu change?",
          answer: "Our menu changes seasonally (4 times per year) to showcase the freshest local ingredients. We also feature monthly specials and chef's creations."
        },
        {
          question: "Do you have a children's menu?",
          answer: "While we don't have a separate children's menu, we can prepare simplified versions of our dishes for younger guests. Please let us know about any preferences when ordering."
        },
        {
          question: "Can I bring my own wine?",
          answer: "We have an extensive wine list, but you may bring your own bottle for a corkage fee of £20 per bottle (limit 2 bottles per table)."
        }
      ]
    },
    {
      title: "Payment & Pricing",
      items: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), debit cards, and cash. We do not accept personal checks."
        },
        {
          question: "What is the average price per person?",
          answer: "Dinner entrées range from £22-52, with appetizers £9-14 and desserts £9-11. The average cost per person for a three-course dinner is approximately £48-64, excluding beverages and gratuity."
        },
        {
          question: "Do you include gratuity in the bill?",
          answer: "Gratuity is not included. For parties of 8 or more, an 18% service charge is automatically added to the bill."
        },
        {
          question: "Do you offer gift cards?",
          answer: "Yes! We offer gift vouchers in various denominations from £40 to £400. You can purchase them online or at the restaurant."
        }
      ]
    },
    {
      title: "Facilities & Services",
      items: [
        {
          question: "Do you have parking available?",
          answer: "Yes, we offer complimentary parking in our private lot. Valet parking is also available on weekend evenings for £8."
        },
        {
          question: "Is the restaurant wheelchair accessible?",
          answer: "Yes, our entire restaurant is wheelchair accessible, including the main dining area, restrooms, and private dining rooms."
        },
        {
          question: "Do you have private dining facilities?",
          answer: "Yes, we have two private dining rooms that can accommodate 12-20 guests each, and a semi-private area for up to 40 guests. Please contact our events coordinator for details."
        },
        {
          question: "What is your dress code?",
          answer: "We maintain a smart casual dress code. We recommend avoiding athletic wear, beachwear, and flip-flops. For dinner service, business casual attire is preferred."
        }
      ]
    },
    {
      title: "Special Occasions & Events",
      items: [
        {
          question: "Can you accommodate special celebrations?",
          answer: "Yes! We love hosting birthdays, anniversaries, and other special occasions. We can arrange special desserts, personalized menus, and decorations with advance notice."
        },
        {
          question: "Do you offer catering services?",
          answer: "We offer off-site catering for events of 20+ people. Please contact our events team at events@hawthorn.com for menus and pricing."
        },
        {
          question: "Can I propose at your restaurant?",
          answer: "Absolutely! We've helped many couples with their proposals. We can assist with timing, special seating, and even hiding the ring in dessert with advance coordination."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-50"
          style={{
            backgroundImage: `url(/homepage-slider/slide-01.jpg)`
          }}
        />
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl">Everything you need to know about Hawthorn</p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      {faqCategories.map((category, categoryIndex) => (
        <section key={categoryIndex} className={`py-16 ${categoryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{category.title}</h2>
            <div className="space-y-6">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Contact Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl mb-8">If you couldn't find the answer you're looking for, please don't hesitate to contact us:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div>
              <p className="font-semibold mb-1">Phone</p>
              <p>(555) 123-4567</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Email</p>
              <p>info@hawthorn.com</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Hours</p>
              <p>Daily 10:00 AM - 9:00 PM</p>
            </div>
          </div>
          <div className="mt-8">
            <a
              href="/contact"
              className="inline-block bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
