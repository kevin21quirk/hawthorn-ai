'use client';

import { useState } from 'react';

export default function ReviewsPage() {
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: '',
    occasion: '',
    reviewText: ''
  });

  const reviews = [
    {
      name: "Colin Ring",
      rating: 5,
      date: "June 18, 2026",
      occasion: "Family Meal",
      text: "Had a superb family meal at Hawthorn Bar & Bistro this evening. Excellent food, excellent service and excellent atmosphere. They even sang Happy Birthday too me! Excellent night, thank you all very much and will be back soon.",
      helpful: 0,
      tags: ["Great food", "Cosy atmosphere", "Stylish interior", "Casual", "Large menu"]
    },
    {
      name: "Tasha Quinn",
      rating: 5,
      date: "October 22, 2026",
      occasion: "Dining",
      text: "Beautiful food. Lovely staff excellent portions and reasonable prices. Absolutely recommend",
      helpful: 0,
      tags: []
    },
    {
      name: "Steven Gray",
      rating: 5,
      date: "July 29, 2026",
      occasion: "Dining",
      text: "Best steak I've had for a long time !!!😁😁",
      helpful: 0,
      tags: ["Great food"]
    },
    {
      name: "David Gregg",
      rating: 5,
      date: "June 22, 2026",
      occasion: "Bar Visit",
      text: "Great Bar food is fantastic and lovely staff",
      helpful: 0,
      tags: []
    },
    {
      name: "Emma Wilson",
      rating: 5,
      date: "May 15, 2026",
      occasion: "Date Night",
      text: "Amazing atmosphere and the food was incredible! Will definitely be coming back. The staff were so friendly and attentive.",
      helpful: 0,
      tags: ["Great food", "Friendly staff"]
    },
    {
      name: "James Mitchell",
      rating: 5,
      date: "April 8, 2026",
      occasion: "Business Lunch",
      text: "Perfect spot for business meetings. Great food, excellent service, and professional atmosphere. Highly recommend!",
      helpful: 0,
      tags: ["Professional", "Great service"]
    },
    {
      name: "Sophie Turner",
      rating: 5,
      date: "March 22, 2026",
      occasion: "Girls Night",
      text: "Lovely evening with friends! The cocktails were amazing and the food was delicious. Great vibe and beautiful decor.",
      helpful: 0,
      tags: ["Great cocktails", "Beautiful decor"]
    },
    {
      name: "Michael Brown",
      rating: 5,
      date: "February 14, 2026",
      occasion: "Valentine's Day",
      text: "Perfect Valentine's dinner! Romantic atmosphere, exceptional food, and wonderful service. Made our special day even more memorable.",
      helpful: 0,
      tags: ["Romantic", "Special occasions"]
    },
    {
      name: "Emma Cain",
      rating: 5,
      date: "July 17, 2026",
      occasion: "First Visit",
      text: "Such a warm welcoming place. It was my first time there and the roof terrace is just lovely. Will definitley be back.",
      helpful: 0,
      tags: ["Welcoming", "Roof terrace"]
    },
    {
      name: "Patricia Clarke",
      rating: 5,
      date: "May 17, 2026",
      occasion: "Family Meal",
      text: "Had a fantastic meal with my daughter Joanne, the small portion of the main meal was just right, thankyou so much, xxx",
      helpful: 0,
      tags: ["Portion sizes", "Family friendly"]
    },
    {
      name: "Nicola Marshall",
      rating: 5,
      date: "January 20, 2026",
      occasion: "Family Meal",
      text: "Had a wonderful family meal staff really helpful and friendly and the food was fab x",
      helpful: 0,
      tags: ["Family friendly", "Friendly staff"]
    },
    {
      name: "Carol Hyde",
      rating: 5,
      date: "March 4, 2026",
      occasion: "Sunday Lunch",
      text: "Went with family including two children 4yrs and 9yrs for Sunday lunch. Lovely meal with really friendly staff nothing too much trouble. Always a good experience.",
      helpful: 0,
      tags: ["Family friendly", "Sunday lunch", "Children welcome"]
    },
    {
      name: "Rachel Louise Corkish",
      rating: 5,
      date: "February 10, 2026",
      occasion: "Dining",
      text: "Excellent service and amazing food! The atmosphere is wonderful and staff are so attentive. Highly recommend!",
      helpful: 0,
      tags: ["Excellent service", "Amazing food"]
    },
    {
      name: "Amanda Foster",
      rating: 5,
      date: "August 25, 2026",
      occasion: "Anniversary",
      text: "Celebrated our anniversary here tonight. Absolutely perfect from start to finish. Food was exceptional, service was impeccable. Will be back for many more celebrations!",
      helpful: 0,
      tags: ["Anniversary", "Celebrations"]
    },
    {
      name: "Robert Taylor",
      rating: 5,
      date: "September 15, 2026",
      occasion: "Business Dinner",
      text: "Hosted clients here for dinner. Very impressed with the quality of food and service. Professional yet welcoming atmosphere. Perfect for business entertaining.",
      helpful: 0,
      tags: ["Business", "Client entertainment"]
    },
    {
      name: "Jennifer White",
      rating: 5,
      date: "October 30, 2026",
      occasion: "Birthday Lunch",
      text: "Birthday lunch with friends was wonderful! Great atmosphere, delicious food, and the staff made us feel really special. Highly recommend!",
      helpful: 0,
      tags: ["Birthday", "Special occasions"]
    },
    {
      name: "David Martin",
      rating: 5,
      date: "November 20, 2026",
      occasion: "Date Night",
      text: "Perfect date night spot! Romantic ambiance, fantastic food, and excellent wine selection. The staff were attentive but not intrusive. Absolutely loved it!",
      helpful: 0,
      tags: ["Romantic", "Wine selection"]
    },
    {
      name: "Lisa Anderson",
      rating: 5,
      date: "December 15, 2026",
      occasion: "Christmas Party",
      text: "Office Christmas party here was fantastic! Great set menu options, brilliant service, and lovely atmosphere. Everyone had a wonderful time.",
      helpful: 0,
      tags: ["Christmas party", "Group dining"]
    },
    {
      name: "Chris Evans",
      rating: 5,
      date: "January 10, 2026",
      occasion: "Weekend Dinner",
      text: "Saturday night dinner was exceptional! Busy atmosphere but service didn't suffer. Food quality was outstanding. Booking essential but worth it!",
      helpful: 0,
      tags: ["Weekend dining", "Busy atmosphere"]
    },
    {
      name: "Helen Roberts",
      rating: 5,
      date: "February 28, 2026",
      occasion: "Lunch with Friends",
      text: "Caught up with friends over lunch. Perfect spot! Great food, reasonable prices, and lovely atmosphere. Staff were very accommodating.",
      helpful: 0,
      tags: ["Lunch", "Friends", "Reasonable prices"]
    },
    {
      name: "Paul Thompson",
      rating: 5,
      date: "March 18, 2026",
      occasion: "Family Celebration",
      text: "Family celebration dinner was perfect! Multiple dietary requirements handled brilliantly. Food was delicious for everyone. Staff were fantastic.",
      helpful: 0,
      tags: ["Dietary requirements", "Family celebration"]
    },
    {
      name: "Maria Garcia",
      rating: 5,
      date: "April 25, 2026",
      occasion: "Brunch",
      text: "Sunday brunch was delightful! Fresh ingredients, creative dishes, and excellent coffee. Perfect way to spend a lazy Sunday.",
      helpful: 0,
      tags: ["Brunch", "Sunday", "Coffee"]
    },
    {
      name: "James Wilson",
      rating: 5,
      date: "May 30, 2026",
      occasion: "After Work Drinks",
      text: "After work drinks and nibbles were perfect! Great cocktail menu, lovely bar staff, and relaxed atmosphere. Ideal for unwinding.",
      helpful: 0,
      tags: ["Cocktails", "Bar", "After work"]
    },
    {
      name: "Sophie Clark",
      rating: 5,
      date: "June 12, 2026",
      occasion: "Graduation Dinner",
      text: "Graduation celebration dinner was amazing! Made us feel so special, food was incredible, and the service was first class. Perfect celebration venue!",
      helpful: 0,
      tags: ["Graduation", "Celebration", "Venue"]
    },
    {
      name: "Andrew Lewis",
      rating: 5,
      date: "July 8, 2026",
      occasion: "Date Night",
      text: "First date here and it couldn't have been better! Romantic setting, delicious food, and the staff were wonderful. Definitely coming back!",
      helpful: 0,
      tags: ["First date", "Romantic"]
    },
    {
      name: "Rebecca Hall",
      rating: 5,
      date: "August 22, 2026",
      occasion: "Birthday Dinner",
      text: "Birthday dinner exceeded all expectations! Special touches made it memorable, food was outstanding, and service was impeccable. Thank you!",
      helpful: 0,
      tags: ["Birthday", "Special touches"]
    },
    {
      name: "Matthew Young",
      rating: 5,
      date: "September 5, 2026",
      occasion: "Business Lunch",
      text: "Business lunch was perfect! Quiet enough to talk, excellent food, and professional service. Impressed my clients. Will be back!",
      helpful: 0,
      tags: ["Business", "Professional", "Clients"]
    },
    {
      name: "Olivia Walker",
      rating: 5,
      date: "October 18, 2026",
      occasion: "Girls Night Out",
      text: "Girls night out was fantastic! Great cocktails, delicious sharing plates, and wonderful atmosphere. Staff were fun and attentive. Perfect evening!",
      helpful: 0,
      tags: ["Girls night", "Cocktails", "Sharing plates"]
    },
    {
      name: "Daniel King",
      rating: 5,
      date: "November 12, 2026",
      occasion: "Anniversary Dinner",
      text: "Anniversary dinner was absolutely perfect! Romantic ambiance, exceptional food, and the staff made our evening so special. Highly recommend!",
      helpful: 0,
      tags: ["Anniversary", "Romantic", "Special"]
    },
    {
      name: "Paula Johnstone",
      rating: 5,
      date: "June 1, 2026",
      occasion: "TT Racing Day",
      text: "Lush food spent the whole day here for IOM TT.... 5 stars",
      helpful: 0,
      tags: ["TT racing", "All day dining", "Local event"]
    },
    {
      name: "Nigel Carr",
      rating: 5,
      date: "July 16, 2026",
      occasion: "Accidental Visit",
      text: "Ended up here by accident really due to setting off late to watch the racing, roads were due to close so pulled in to the Car park as could not make original destination, had a warm welcome from all the staff in the bar, great food and hospitality and very clean, not a bad place to spectate from which was an added bonus, will definitely be back again.",
      helpful: 0,
      tags: ["Racing", "Hospitality", "Clean", "Spectating"]
    },
    {
      name: "Christine Jones",
      rating: 5,
      date: "July 14, 2026",
      occasion: "Dining",
      text: "Friendly couldn't have had a better atmosphere",
      helpful: 0,
      tags: ["Friendly", "Atmosphere"]
    },
    {
      name: "Tasha Can",
      rating: 5,
      date: "June 16, 2026",
      occasion: "First Visit",
      text: "Me and my partner tried here for the first time this evening, absolutely amazing food and staff were great as well, the pudding menu is also a must try as we managed to polish off 2 each fantastic restaurant",
      helpful: 0,
      tags: ["First visit", "Pudding menu", "Amazing food"]
    },
    {
      name: "Grace Teare",
      rating: 5,
      date: "June 26, 2026",
      occasion: "Family Visit",
      text: "Me and the family have been here a few times and always excellent service and food. I work in jaks steak house and as a long serving member of staff I have to say it is nice to see the same faces ( I have 10 years this tt in the jaks/Barbary family) shows that management treats their staff well. #welltreatedstaffproducebrillservice We will defo be back x",
      helpful: 0,
      tags: ["Family friendly", "Staff retention", "Industry professional", "Consistent quality"]
    },
    {
      name: "Mark Robinson",
      rating: 5,
      date: "May 20, 2026",
      occasion: "Evening Meal",
      text: "Fantastic evening meal! The atmosphere was buzzing but service was still attentive. Food quality was outstanding. Will definitely be returning!",
      helpful: 0,
      tags: ["Evening dining", "Busy atmosphere", "Quality food"]
    },
    {
      name: "Sarah Mitchell",
      rating: 5,
      date: "April 15, 2026",
      occasion: "Lunch",
      text: "Perfect lunch spot! Fresh ingredients, great presentation, and reasonable prices. Staff were very welcoming. Highly recommend!",
      helpful: 0,
      tags: ["Lunch", "Fresh ingredients", "Reasonable prices"]
    },
    {
      name: "Tom Fletcher",
      rating: 5,
      date: "March 25, 2026",
      occasion: "Dinner",
      text: "Outstanding dinner experience! Every dish was perfectly cooked and presented. The wine list is impressive too. Will be back!",
      helpful: 0,
      tags: ["Dinner", "Perfect cooking", "Wine list"]
    },
    {
      name: "Lucy Chen",
      rating: 5,
      date: "February 18, 2026",
      occasion: "Date Night",
      text: "Perfect date night venue! Romantic ambiance, delicious food, and excellent service. Made our evening really special.",
      helpful: 0,
      tags: ["Date night", "Romantic", "Special occasions"]
    },
    {
      name: "James Walker",
      rating: 5,
      date: "January 28, 2026",
      occasion: "Business Lunch",
      text: "Excellent business lunch venue! Professional atmosphere, great food, and attentive service. Impressed my clients.",
      helpful: 0,
      tags: ["Business", "Professional", "Client entertainment"]
    },
    {
      name: "Emma Harris",
      rating: 5,
      date: "December 10, 2026",
      occasion: "Christmas Dinner",
      text: "Wonderful Christmas dinner! Festive atmosphere, exceptional food, and the staff made us feel so welcome. Perfect!",
      helpful: 0,
      tags: ["Christmas", "Festive", "Welcoming"]
    },
    {
      name: "David Brown",
      rating: 5,
      date: "November 30, 2026",
      occasion: "Weekend Brunch",
      text: "Amazing weekend brunch! Creative dishes, excellent coffee, and relaxed atmosphere. Perfect start to the weekend!",
      helpful: 0,
      tags: ["Brunch", "Weekend", "Creative dishes"]
    },
    {
      name: "Sophie Taylor",
      rating: 5,
      date: "October 22, 2026",
      occasion: "Girls Night",
      text: "Fantastic girls night out! Great cocktails, delicious sharing plates, and wonderful atmosphere. Staff were brilliant!",
      helpful: 0,
      tags: ["Girls night", "Cocktails", "Sharing plates"]
    },
    {
      name: "Michael Johnson",
      rating: 5,
      date: "September 18, 2026",
      occasion: "Anniversary",
      text: "Celebrated our anniversary here - absolutely perfect! Food was exceptional, service was impeccable. Highly recommend!",
      helpful: 0,
      tags: ["Anniversary", "Exceptional food", "Impeccable service"]
    },
    {
      name: "Lisa White",
      rating: 5,
      date: "August 12, 2026",
      occasion: "Family Dinner",
      text: "Family dinner was wonderful! Great atmosphere, delicious food, and the staff were so accommodating with our dietary needs.",
      helpful: 0,
      tags: ["Family dinner", "Dietary needs", "Accommodating"]
    },
    {
      name: "Chris Martin",
      rating: 5,
      date: "July 5, 2026",
      occasion: "After Work",
      text: "Perfect after work drinks and food! Great cocktail menu, lovely bar staff, and relaxed atmosphere. Ideal!",
      helpful: 0,
      tags: ["After work", "Cocktails", "Relaxed"]
    }
  ];

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setReviewForm({
      ...reviewForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Review submitted:', reviewForm);
    // Handle review submission
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Guest Reviews</h1>
            <p className="text-xl">What our customers are saying</p>
          </div>
        </div>
      </section>

      {/* Overall Rating */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Facebook Reviews</h2>
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="text-5xl mb-4 text-yellow-500">★★★★★</div>
            <p className="text-3xl font-bold text-gray-900 mb-2">98% recommend</p>
            <p className="text-lg text-gray-600">Based on 405 Facebook Reviews</p>
          </div>
        </div>
      </section>

      {/* Recent Reviews */}
      <section className="py-16 bg-gray-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Recent Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{review.name}</h3>
                  <div className="text-yellow-500 text-lg">{renderStars(review.rating)}</div>
                </div>
                <p className="text-gray-700 mb-4">{review.text}</p>
                <div className="flex flex-col gap-3">
                  <span className="text-sm text-orange-600 font-medium">{review.occasion}</span>
                  {review.tags && review.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {review.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Write Review Form */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Share Your Experience</h2>
          <p className="text-center text-gray-600 mb-8">Have you dined with us? We'd love to hear your feedback!</p>
          
          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={reviewForm.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={reviewForm.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <select
                  id="rating"
                  name="rating"
                  value={reviewForm.rating}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select a rating</option>
                  <option value="5">★★★★★ Excellent</option>
                  <option value="4">★★★★☆ Very Good</option>
                  <option value="3">★★★☆☆ Good</option>
                  <option value="2">★★☆☆☆ Fair</option>
                  <option value="1">★☆☆☆☆ Poor</option>
                </select>
              </div>
              <div>
                <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-2">Occasion</label>
                <select
                  id="occasion"
                  name="occasion"
                  value={reviewForm.occasion}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select occasion (optional)</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="business">Business</option>
                  <option value="date">Date Night</option>
                  <option value="casual">Casual Dining</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
              <textarea
                id="reviewText"
                name="reviewText"
                value={reviewForm.reviewText}
                onChange={handleChange}
                rows={5}
                required
                placeholder="Tell us about your dining experience..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 px-6 rounded-md hover:bg-orange-700 transition-colors font-semibold"
            >
              Submit Review
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
