'use client';

import { useState } from 'react';
import { X, Gift, ArrowRight, Check } from 'lucide-react';
import InlineChatAssistant from './InlineChatAssistant';

interface GiftVoucherFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'welcome' | 'voucher-type' | 'custom-amount' | 'recipient-name' | 'recipient-email' | 'sender-name' | 'message' | 'payment' | 'card-payment' | 'success';

export default function GiftVoucherFlow({ isOpen, onClose }: GiftVoucherFlowProps) {
  const [step, setStep] = useState<Step>('welcome');
  const [voucherData, setVoucherData] = useState({
    voucherType: '',
    voucherTitle: '',
    amount: 0,
    customAmount: '',
    recipientName: '',
    recipientEmail: '',
    senderName: '',
    personalMessage: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardName: '',
  });

  const voucherTypes = [
    { id: 'tasting', title: 'Tasting Menu for Two', price: 140 },
    { id: 'dinner', title: 'Dinner for Two', price: 120 },
    { id: 'chef', title: "Chef's Table Experience", price: 240 },
    { id: 'wine', title: 'Wine Tasting and Dinner', price: 175 },
    { id: 'cooking', title: 'Cooking Class', price: 95 },
    { id: 'custom', title: 'Custom Amount', price: 0 },
  ];

  if (!isOpen) return null;

  const updateData = (field: string, value: any) => {
    setVoucherData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    // Skip custom-amount if not custom voucher
    if (step === 'voucher-type' && voucherData.voucherType !== 'custom') {
      setStep('recipient-name');
      return;
    }
    
    const steps: Step[] = ['welcome', 'voucher-type', 'custom-amount', 'recipient-name', 'recipient-email', 'sender-name', 'message', 'payment', 'card-payment', 'success'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const selectVoucherType = (type: any) => {
    updateData('voucherType', type.id);
    updateData('voucherTitle', type.title);
    updateData('amount', type.price);
  };

  const handlePurchase = () => {
    nextStep();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-3 transition-all z-50"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full max-w-6xl flex gap-6 items-start justify-center">
        <div className="w-full max-w-lg">
        {/* Welcome */}
        {step === 'welcome' && (
          <div className="animate-swooshFromRight">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] transform transition-all border border-gray-100 overflow-hidden max-h-[85vh] flex flex-col">
              <div className="relative bg-gradient-to-br from-slate-50 to-gray-100 p-6 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-200 to-orange-300 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 border-4 border-white">
                    <div className="text-center">
                      <div className="text-4xl mb-1">🎁</div>
                      <div className="text-xs text-amber-800 font-medium">Gift</div>
                    </div>
                  </div>
                  
                  <div className="flex-1 pt-1">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-1">Gift Vouchers</h2>
                    <p className="text-slate-600 text-base leading-relaxed">
                      Give the gift of an exceptional dining experience at The Hawthorn.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                  <p className="text-blue-900 text-sm leading-relaxed">
                    <span className="font-bold">Hi, I'm Chef Jonny!</span> I'm here to help you create the perfect gift voucher for someone special. 
                    I'll walk you through selecting the ideal dining experience and personalizing it with your own message.
                  </p>
                  <p className="text-blue-800 text-xs mt-2">
                    Throughout this process, you can ask me questions about our vouchers, restaurant experiences, or anything else using the chat assistant. 
                    I'm here to ensure your gift is truly memorable!
                  </p>
                </div>

                <p className="text-slate-700 mb-3 font-medium text-base">
                  Let's create your personalized gift voucher:
                </p>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    <span className="text-slate-700 text-sm">Choose your preferred dining experience</span>
                  </li>
                  <li className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    <span className="text-slate-700 text-sm">Add recipient details</span>
                  </li>
                  <li className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    <span className="text-slate-700 text-sm">Personalize with a heartfelt message</span>
                  </li>
                </ul>

                <button
                  onClick={nextStep}
                  className="w-full bg-gradient-to-r from-slate-700 to-slate-600 text-white px-6 py-4 rounded-2xl hover:from-slate-800 hover:to-slate-700 hover:shadow-2xl transition-all font-bold text-lg shadow-xl transform hover:scale-[1.02]"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Voucher Type Selection */}
        {step === 'voucher-type' && (
          <div className="animate-swooshFromRight">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10 transform transition-all border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Gift className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Choose Voucher Type</h2>
                  <p className="text-gray-600 text-sm">Select your preferred experience</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                {voucherTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      selectVoucherType(type);
                      nextStep();
                    }}
                    className={`w-full px-6 py-4 rounded-2xl border-2 transition-all text-left shadow-sm hover:shadow-md ${
                      voucherData.voucherType === type.id
                        ? 'border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 shadow-lg'
                        : 'border-gray-200 hover:border-slate-400 bg-gray-50 hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-lg text-gray-900">{type.title}</div>
                        {type.id === 'custom' && (
                          <div className="text-sm text-gray-600">£40 - £400</div>
                        )}
                      </div>
                      {type.price > 0 && (
                        <div className="font-bold text-2xl text-slate-700">£{type.price}</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Custom Amount */}
        {step === 'custom-amount' && (
          <div className="animate-swooshFromRight">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10 transform transition-all border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Gift className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Enter Amount</h2>
                  <p className="text-gray-600 text-sm">Choose between £40 and £400</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-2xl font-bold">£</span>
                  <input
                    type="number"
                    value={voucherData.customAmount}
                    onChange={(e) => {
                      updateData('customAmount', e.target.value);
                      updateData('amount', parseInt(e.target.value) || 0);
                    }}
                    min="40"
                    max="400"
                    placeholder="Enter amount"
                    className="w-full pl-14 pr-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-slate-100 focus:border-slate-500 text-gray-900 text-2xl font-bold transition-all shadow-sm hover:border-gray-300 bg-gray-50 focus:bg-white"
                    autoFocus
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2 ml-2">Minimum £40, Maximum £400</p>
              </div>

              <button
                onClick={nextStep}
                disabled={!voucherData.customAmount || parseInt(voucherData.customAmount) < 40 || parseInt(voucherData.customAmount) > 400}
                className="w-full mt-8 bg-gradient-to-r from-slate-700 to-slate-600 text-white px-8 py-5 rounded-2xl hover:from-slate-800 hover:to-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Recipient Name */}
        {step === 'recipient-name' && (
          <div className="animate-swooshFromRight">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10 transform transition-all border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Gift className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Who's it for?</h2>
                  <p className="text-gray-600 text-sm">Recipient's name</p>
                </div>
              </div>
              
              <input
                type="text"
                value={voucherData.recipientName}
                onChange={(e) => updateData('recipientName', e.target.value)}
                placeholder="Enter recipient's name"
                className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-slate-100 focus:border-slate-500 text-gray-900 text-xl transition-all shadow-sm hover:border-gray-300 bg-gray-50 focus:bg-white"
                autoFocus
              />

              <button
                onClick={nextStep}
                disabled={!voucherData.recipientName}
                className="w-full mt-8 bg-gradient-to-r from-slate-700 to-slate-600 text-white px-8 py-5 rounded-2xl hover:from-slate-800 hover:to-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Recipient Email */}
        {step === 'recipient-email' && (
          <div className="animate-swooshFromRight">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10 transform transition-all border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Gift className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Recipient's Email</h2>
                  <p className="text-gray-600 text-sm">Where should we send the voucher?</p>
                </div>
              </div>
              
              <input
                type="email"
                value={voucherData.recipientEmail}
                onChange={(e) => updateData('recipientEmail', e.target.value)}
                placeholder="recipient@example.com"
                className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-slate-100 focus:border-slate-500 text-gray-900 text-xl transition-all shadow-sm hover:border-gray-300 bg-gray-50 focus:bg-white"
                autoFocus
              />

              <button
                onClick={nextStep}
                disabled={!voucherData.recipientEmail}
                className="w-full mt-8 bg-gradient-to-r from-slate-700 to-slate-600 text-white px-8 py-5 rounded-2xl hover:from-slate-800 hover:to-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Sender Name */}
        {step === 'sender-name' && (
          <div className="animate-swooshFromRight">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10 transform transition-all border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Gift className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Your Name</h2>
                  <p className="text-gray-600 text-sm">Who is this gift from?</p>
                </div>
              </div>
              
              <input
                type="text"
                value={voucherData.senderName}
                onChange={(e) => updateData('senderName', e.target.value)}
                placeholder="Your name"
                className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-slate-100 focus:border-slate-500 text-gray-900 text-xl transition-all shadow-sm hover:border-gray-300 bg-gray-50 focus:bg-white"
                autoFocus
              />

              <button
                onClick={nextStep}
                disabled={!voucherData.senderName}
                className="w-full mt-8 bg-gradient-to-r from-slate-700 to-slate-600 text-white px-8 py-5 rounded-2xl hover:from-slate-800 hover:to-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Personal Message */}
        {step === 'message' && (
          <div className="animate-swooshFromRight">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10 transform transition-all border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Gift className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Add a Message</h2>
                  <p className="text-gray-600 text-sm">Optional personal message</p>
                </div>
              </div>
              
              <textarea
                value={voucherData.personalMessage}
                onChange={(e) => updateData('personalMessage', e.target.value)}
                placeholder="Happy Birthday! Enjoy a wonderful meal at The Hawthorn..."
                rows={4}
                className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-slate-100 focus:border-slate-500 text-gray-900 text-xl transition-all shadow-sm hover:border-gray-300 bg-gray-50 focus:bg-white resize-none"
                autoFocus
              />

              <button
                onClick={nextStep}
                className="w-full mt-8 bg-gradient-to-r from-slate-700 to-slate-600 text-white px-8 py-5 rounded-2xl hover:from-slate-800 hover:to-slate-700 transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
              >
                Continue to Payment
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Payment Review */}
        {step === 'payment' && (
          <div className="animate-swooshFromRight">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10 transform transition-all border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Gift className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Review Order</h2>
                  <p className="text-gray-600 text-sm">Confirm your gift voucher details</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 mb-6 border border-slate-200">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Voucher:</span>
                    <span className="font-bold text-gray-900">{voucherData.voucherTitle || `£${voucherData.amount} Gift Voucher`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Amount:</span>
                    <span className="font-bold text-gray-900">£{voucherData.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">For:</span>
                    <span className="font-semibold text-gray-900">{voucherData.recipientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">From:</span>
                    <span className="font-semibold text-gray-900">{voucherData.senderName}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-slate-700 to-slate-600 text-white px-8 py-5 rounded-2xl hover:from-slate-800 hover:to-slate-700 transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
              >
                Continue to Payment
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Card Payment (Dummy Gateway) */}
        {step === 'card-payment' && (
          <div className="animate-swooshFromRight">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10 transform transition-all border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Gift className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Payment Details</h2>
                  <p className="text-gray-600 text-sm">Enter your card information</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <p className="text-amber-800 text-sm font-semibold">
                  🔒 Demo Mode - This is a dummy payment gateway for demonstration purposes only
                </p>
              </div>

              <div className="space-y-4 mb-6">
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    value={voucherData.cardNumber}
                    onChange={(e) => updateData('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-slate-100 focus:border-slate-500 text-gray-900 text-lg transition-all shadow-sm hover:border-gray-300 bg-gray-50 focus:bg-white"
                  />
                </div>

                {/* Card Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    value={voucherData.cardName}
                    onChange={(e) => updateData('cardName', e.target.value)}
                    placeholder="John Smith"
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-slate-100 focus:border-slate-500 text-gray-900 text-lg transition-all shadow-sm hover:border-gray-300 bg-gray-50 focus:bg-white"
                  />
                </div>

                {/* Expiry & CVC */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      value={voucherData.cardExpiry}
                      onChange={(e) => updateData('cardExpiry', e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-slate-100 focus:border-slate-500 text-gray-900 text-lg transition-all shadow-sm hover:border-gray-300 bg-gray-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">CVC</label>
                    <input
                      type="text"
                      value={voucherData.cardCVC}
                      onChange={(e) => updateData('cardCVC', e.target.value)}
                      placeholder="123"
                      maxLength={3}
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-slate-100 focus:border-slate-500 text-gray-900 text-lg transition-all shadow-sm hover:border-gray-300 bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Total Amount */}
              <div className="bg-slate-50 rounded-2xl p-6 mb-6 border-2 border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-700">Total Amount:</span>
                  <span className="text-3xl font-bold text-slate-700">£{voucherData.amount}</span>
                </div>
              </div>
              
              <button
                onClick={handlePurchase}
                disabled={!voucherData.cardNumber || !voucherData.cardName || !voucherData.cardExpiry || !voucherData.cardCVC}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-5 rounded-2xl hover:from-green-700 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
              >
                <Check className="w-5 h-5" />
                Complete Purchase
              </button>
            </div>
          </div>
        )}

        {/* Success */}
        {step === 'success' && (
          <div className="animate-swooshFromRight">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] transform transition-all border border-gray-100 overflow-hidden max-w-2xl max-h-[85vh] flex flex-col">
              <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 p-6 border-b border-emerald-100 flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-3 border-2 border-emerald-200">
                    <div className="text-3xl">✓</div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">Purchase Complete!</h2>
                  <p className="text-emerald-700 text-sm font-medium">Here's how your gift voucher will appear:</p>
                </div>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                {/* Email Preview Mockup */}
                <div className="bg-gray-100 rounded-xl p-4 mb-4 border-2 border-gray-300">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Email Header */}
                    <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-4 text-center">
                      <div className="text-white">
                        <div className="text-2xl font-bold mb-0.5">The Hawthorn</div>
                        <div className="text-base font-light">bar and bistro</div>
                      </div>
                    </div>

                    {/* Email Body */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">
                        You've Received a Gift Voucher!
                      </h3>
                      
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-200 rounded-xl p-4 mb-4">
                        <div className="text-center mb-3">
                          <div className="text-3xl mb-1">🎁</div>
                          <div className="text-3xl font-bold text-orange-600 mb-1">£{voucherData.amount}</div>
                          <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Gift Voucher</div>
                        </div>
                        
                        <div className="border-t-2 border-orange-200 pt-3 mt-3">
                          <div className="text-center space-y-1.5">
                            <p className="text-gray-700 text-sm">
                              <span className="font-semibold">To:</span> {voucherData.recipientName}
                            </p>
                            <p className="text-gray-700 text-sm">
                              <span className="font-semibold">From:</span> {voucherData.senderName}
                            </p>
                            {voucherData.personalMessage && (
                              <div className="mt-3 pt-3 border-t border-orange-200">
                                <p className="text-gray-600 italic text-xs">"{voucherData.personalMessage}"</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t-2 border-orange-200 text-center">
                          <p className="text-xs text-gray-500 font-mono bg-white px-2 py-1.5 rounded border border-gray-300 inline-block">
                            VOUCHER CODE: HTH-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                          </p>
                        </div>
                      </div>

                      <div className="text-center text-xs text-gray-600 space-y-1">
                        <p>Valid for 12 months from date of purchase</p>
                        <p className="font-semibold text-orange-600">To redeem, simply present this email when booking or dining</p>
                      </div>
                    </div>

                    {/* Email Footer */}
                    <div className="bg-gray-50 p-3 text-center border-t border-gray-200">
                      <p className="text-xs text-gray-500">The Hawthorn Bar and Bistro</p>
                      <p className="text-xs text-gray-500">Fine Dining Experience</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
                  <p className="text-blue-800 text-sm text-center">
                    📧 This voucher has been sent to <strong>{voucherData.recipientEmail}</strong>
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-slate-700 to-slate-600 text-white px-6 py-3 rounded-2xl hover:from-slate-800 hover:to-slate-700 transition-all font-bold text-base shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes swooshFromRight {
            0% {
              opacity: 0;
              transform: translateX(100vw) scale(0.6);
            }
            60% {
              opacity: 1;
              transform: translateX(-20px) scale(1.1);
            }
            100% {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }

          .animate-swooshFromRight {
            animation: swooshFromRight 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
        `}</style>
        </div>

        {/* Inline Chat Assistant - only show when not on welcome or success */}
        {step !== 'welcome' && step !== 'success' && (
          <div className="w-80 flex-shrink-0">
            <InlineChatAssistant step={step} context="voucher" />
          </div>
        )}
      </div>
    </div>
  );
}
