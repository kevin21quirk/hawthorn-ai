'use client';

import { useState, useEffect } from 'react';
import { Sparkles, ChefHat, Wine, Leaf, X, ShoppingCart, Plus, Check } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  dietary?: string[];
  allergens?: string[];
  aiDescription?: string;
  pairingRecommendations?: string[];
}

interface SmartMenuExperienceProps {
  onClose?: () => void;
}

export default function SmartMenuExperience({ onClose }: SmartMenuExperienceProps = {}) {
  const [step, setStep] = useState<'welcome' | 'preferences' | 'menu' | 'ai-recommending'>('welcome');
  const [preferences, setPreferences] = useState({
    dietary: [] as string[],
    allergies: [] as string[],
    occasion: '',
  });
  const [recommendations, setRecommendations] = useState<MenuItem[]>([]);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const dietaryOptions = [
    { value: 'vegetarian', label: 'Vegetarian', icon: '🥗' },
    { value: 'vegan', label: 'Vegan', icon: '🌱' },
    { value: 'gluten-free', label: 'Gluten-Free', icon: '🌾' },
  ];

  const allergenOptions = [
    { value: 'dairy', label: 'Dairy' },
    { value: 'nuts', label: 'Nuts' },
    { value: 'shellfish', label: 'Shellfish' },
    { value: 'eggs', label: 'Eggs' },
    { value: 'fish', label: 'Fish' },
  ];

  const occasionOptions = [
    { value: 'romantic', label: 'Romantic Dinner', icon: '💕' },
    { value: 'celebration', label: 'Celebration', icon: '🎉' },
    { value: 'business', label: 'Business Meal', icon: '💼' },
    { value: 'casual', label: 'Casual Dining', icon: '😊' },
  ];

  const togglePreference = (type: 'dietary' | 'allergies', value: string) => {
    setPreferences(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  };

  const getRecommendations = async () => {
    setStep('ai-recommending');
    
    try {
      const response = await fetch('/api/menu/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });

      const data = await response.json();
      setRecommendations(data.recommendations || []);
      setAiSuggestion(data.aiSuggestions || '');
      
      setTimeout(() => setStep('menu'), 1500);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setStep('menu');
    }
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const categories = ['All', 'Starters', 'Mains', 'Desserts'];

  const filteredRecommendations = selectedCategory === 'All'
    ? recommendations
    : recommendations.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Welcome Step */}
      {step === 'welcome' && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl w-full text-center animate-fadeIn">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <ChefHat className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Welcome to Our Smart Menu
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Let our AI sommelier guide you to the perfect dining experience
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
                  <p className="text-sm text-gray-600">Personalized recommendations based on your preferences</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Wine className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Wine Pairings</h3>
                  <p className="text-sm text-gray-600">Expert wine suggestions for each dish</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Leaf className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Dietary Aware</h3>
                  <p className="text-sm text-gray-600">Filtered for your dietary needs and allergies</p>
                </div>
              </div>

              <button
                onClick={() => setStep('preferences')}
                className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-xl hover:from-orange-700 hover:to-orange-600 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Your Culinary Journey
              </button>
            </div>

            <p className="text-sm text-gray-500">
              Or <button onClick={() => setStep('menu')} className="text-orange-600 hover:underline">skip to full menu</button>
            </p>
          </div>
        </div>
      )}

      {/* Preferences Step */}
      {step === 'preferences' && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-3xl w-full animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Tell us about your preferences</h2>
                <p className="text-gray-600">This helps us recommend the perfect dishes for you</p>
              </div>

              {/* Dietary Preferences */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Dietary Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {dietaryOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => togglePreference('dietary', option.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        preferences.dietary.includes(option.value)
                          ? 'border-orange-600 bg-orange-50 text-orange-900'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="font-semibold">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Allergies */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Any Allergies?</h3>
                <div className="flex flex-wrap gap-3">
                  {allergenOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => togglePreference('allergies', option.value)}
                      className={`px-4 py-2 rounded-full border-2 transition-all ${
                        preferences.allergies.includes(option.value)
                          ? 'border-red-600 bg-red-50 text-red-900'
                          : 'border-gray-200 hover:border-red-300'
                      }`}
                    >
                      {preferences.allergies.includes(option.value) && <Check className="w-4 h-4 inline mr-1" />}
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasion */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What's the occasion?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {occasionOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setPreferences(prev => ({ ...prev, occasion: option.value }))}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        preferences.occasion === option.value
                          ? 'border-orange-600 bg-orange-50 text-orange-900'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{option.icon}</div>
                      <div className="text-sm font-semibold">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep('welcome')}
                  className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={getRecommendations}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-3 rounded-xl hover:from-orange-700 hover:to-orange-600 transition-all font-semibold shadow-lg"
                >
                  Get My Recommendations
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Recommending */}
      {step === 'ai-recommending' && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Crafting Your Perfect Menu...</h2>
            <p className="text-gray-600">Our AI sommelier is selecting the finest dishes for you</p>
          </div>
        </div>
      )}

      {/* Menu Display */}
      {step === 'menu' && (
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Personalized Menu</h1>
              {aiSuggestion && (
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 max-w-3xl mx-auto">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <p className="text-orange-900 text-sm text-left">{aiSuggestion}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex justify-center gap-3 mb-8 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    selectedCategory === category
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecommendations.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                      <span className="text-orange-600 font-bold text-lg">£{item.price}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                    {item.dietary && item.dietary.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.dietary.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.pairingRecommendations && item.pairingRecommendations.length > 0 && (
                      <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Wine className="w-4 h-4 text-purple-600" />
                          <span className="text-xs font-semibold text-purple-900">Wine Pairing</span>
                        </div>
                        <p className="text-xs text-purple-800">{item.pairingRecommendations[0]}</p>
                      </div>
                    )}

                    <button
                      onClick={() => addToCart(item)}
                      className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add to Order
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredRecommendations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No items match your current filters.</p>
                <button
                  onClick={() => setStep('preferences')}
                  className="text-orange-600 hover:underline"
                >
                  Update your preferences
                </button>
              </div>
            )}
          </div>

          {/* Floating Cart Button */}
          {cart.length > 0 && (
            <button
              onClick={() => setShowCart(true)}
              className="fixed bottom-6 right-6 bg-orange-600 text-white px-6 py-4 rounded-full shadow-2xl hover:bg-orange-700 transition-all flex items-center gap-3 z-40"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-semibold">View Order ({cart.length})</span>
            </button>
          )}

          {/* Cart Modal */}
          {showCart && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Your Order</h2>
                  <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-6">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.category}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-orange-600">£{item.price}</span>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xl font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-orange-600">
                        £{cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2)}
                      </span>
                    </div>
                    <button className="w-full bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
